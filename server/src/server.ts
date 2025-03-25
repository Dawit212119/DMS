// import express, { Request, Response } from "express";
// import multer from "multer";
// import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
// import { getStorage } from "firebase-admin/storage";
// import { getFirestore, Firestore } from "firebase-admin/firestore";
// import cors from "cors";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";

// import fs from "fs";
// import path, { dirname } from "path";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// // Firebase Admin Setup
// const serviceAccountPath = path.resolve(__dirname, "../seviceAccountKey.json");
// if (!fs.existsSync(serviceAccountPath)) {
//   throw new Error("Missing serviceAccountKey.json file");
// }

// const serviceAccount: ServiceAccount = JSON.parse(
//   fs.readFileSync(serviceAccountPath, "utf-8")
// );

// initializeApp({
//   credential: cert(serviceAccount),
//   storageBucket: process.env.STORAGE_BUCKET, // Set in .env file
// });

// const bucket = getStorage().bucket();
// const db: Firestore = getFirestore();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Multer storage (file upload handling)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Upload Route (Supports PDF, RAR, DWG, and other files)
// app.post(
//   "/upload",
//   upload.single("file"),
//   async (req: Request, res: Response): Promise<void> => {
//     if (!req.file) {
//       res.status(400).json({ error: "No file uploaded" });
//       return;
//     }
//     const file = req.file;
//     const fileName = `${Date.now()}-${file.originalname}`;
//     const fileRef = bucket.file(fileName);

//     try {
//       // Upload file to Firebase Storage
//       await fileRef.save(file.buffer, {
//         metadata: { contentType: file.mimetype },
//       });

//       // Get public URL
//       const fileURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

//       // Store file metadata in Firestore
//       const docRef = await db.collection("uploads").add({
//         name: file.originalname,
//         url: fileURL,
//         createdAt: new Date(),
//       });

//       res.json({ success: true, fileURL, fileId: docRef.id });
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       res.status(500).json({ error: "File upload failed" });
//     }
//   }
// );

// // Get all uploaded files
// app.get("/files", async (req: Request, res: Response) => {
//   try {
//     const snapshot = await db
//       .collection("uploads")
//       .orderBy("createdAt", "desc")
//       .get();
//     const files = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     res.json(files);
//   } catch (error) {
//     console.error("Error fetching files:", error);
//     res.status(500).json({ error: "Failed to fetch files" });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express, { Request, Response } from "express";
import multer from "multer";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import PDFKit from "pdfkit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Firebase Admin Setup
const serviceAccount = JSON.parse(
  fs.readFileSync("../serviceAccountKey.json", "utf-8")
);
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = getStorage().bucket();
const db: Firestore = getFirestore();

// Middleware
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Generate QR code for file URL
const generateQRCode = async (url: string): Promise<Buffer> => {
  return await QRCode.toBuffer(url);
};

// Function to embed QR code inside a PDF
const embedQRCodeInPDF = async (
  pdfBuffer: Buffer,
  qrBuffer: Buffer
): Promise<Buffer> => {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const firstPage = pdfDoc.getPages()[0];

  // Embed QR code
  const qrImage = await pdfDoc.embedPng(qrBuffer);
  const { width, height } = firstPage.getSize();

  firstPage.drawImage(qrImage, {
    x: width - 150,
    y: height - 150,
    width: 100,
    height: 100,
  });
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};

// Function to generate a separate PDF containing the QR code
const createQRCodePDF = async (
  qrBuffer: Buffer,
  fileName: string
): Promise<Buffer> => {
  const pdfDoc = new PDFKit();
  const pdfBuffer: Buffer[] = [];

  pdfDoc.pipe(fs.createWriteStream("temp.pdf"));
  pdfDoc.image(qrBuffer, 50, 50, { width: 150, height: 150 });
  pdfDoc.text(`QR Code for: ${fileName}`, 50, 220);
  pdfDoc.end();

  return Buffer.concat(pdfBuffer);
};

// Upload Route
app.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileRef = bucket.file(fileName);

    try {
      // Upload file to Firebase
      await fileRef.save(file.buffer, {
        metadata: { contentType: file.mimetype || "application/pdf" },
      });
      // Make the file publicly accessible
      await fileRef.makePublic();

      // Get file URL
      const fileURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      // Generate QR code for the file URL
      // Generate signed URL (replaces makePublic)
      // const [fileURL] = await fileRef.getSignedUrl({
      //   action: "read",
      //   expires: "03-17-2026",
      // });

      const qrCodeBuffer = await generateQRCode(fileURL);

      let qrPDFURL = null;

      if (file.mimetype === "application/pdf") {
        // If it's a PDF, embed QR code on first page
        const modifiedPDF = await embedQRCodeInPDF(file.buffer, qrCodeBuffer);

        const modifiedFileName = `qr-${fileName}`;
        const modifiedFileRef = bucket.file(modifiedFileName);
        await modifiedFileRef.save(modifiedPDF, {
          metadata: { contentType: "application/pdf" },
        });
        // [qrPDFURL] = await modifiedFileRef.getSignedUrl({
        //   action: "read",
        //   expires: "03-17-2026",
        // });
        await modifiedFileRef.makePublic();
        qrPDFURL = `https://storage.googleapis.com/${bucket.name}/${modifiedFileName}`;
      } else {
        // Generate a separate PDF with the QR code
        const qrPDFBuffer = await createQRCodePDF(
          qrCodeBuffer,
          file.originalname
        );

        const qrPDFFileName = `qr-code-${fileName}.pdf`;
        const qrPDFFileRef = bucket.file(qrPDFFileName);
        await qrPDFFileRef.save(qrPDFBuffer, {
          metadata: { contentType: "application/pdf" },
        });
        await qrPDFFileRef.makePublic(); // Make QR code PDF publicly accessible

        qrPDFURL = `https://storage.googleapis.com/${bucket.name}/${qrPDFFileName}`;

        // [qrPDFURL] = await qrPDFFileRef.getSignedUrl({
        //   action: "read",
        //   expires: "03-17-2026",
        // });
      }

      // Store in Firestore
      const docRef = await db.collection("uploads").add({
        name: file.originalname,
        url: fileURL,
        qrPDFUrl: qrPDFURL,
        createdAt: new Date(),
      });

      res.json({ success: true, fileURL, qrPDFURL, fileId: docRef.id });
    } catch (error) {
      console.error("Error processing file:", error);
      res.status(500).json({ error: "File upload failed" });
    }
  }
);

app.get("/files", async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection("uploads").get();
    const files = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        url: data.url,
        qrPDFUrl: data.qrPDFUrl, // assuming you store the QR PDF URL
      };
    });
    res.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
