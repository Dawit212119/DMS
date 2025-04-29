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

import express, { application, Request, Response } from "express";
import multer from "multer";
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path, { dirname } from "path";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import PDFKit, { file } from "pdfkit";
import { fileURLToPath } from "url";
import uploadRouter from "./route/upload.js";
import getRouter from "./route/Filesroute.js";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./exceptions/errorMiddleware";
import project from "./route/project.js";
import authRoute from "./route/root.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// // Firebase Admin Setup
// const serviceAccountPath = path.resolve(
//   __dirname,
//   "..",
//   "src",
//   "serviceAccountKey.json" // Fixed typo from "seviceAccountKey.json"
// );

// if (!fs.existsSync(serviceAccountPath)) {
//   throw new Error("Missing serviceAccountKey.json file");
// }

// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
// initializeApp({
//   credential: cert(serviceAccount),
//   storageBucket: process.env.STORAGE_BUCKET,
// });

// const bucket = getStorage().bucket();
// const db = getFirestore();
app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());
app.use("/api", authRoute);
app.use("/upload", uploadRouter);
app.use("/files", getRouter);
app.use("/project", project);

// Middleware

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// Helper function to generate proper Firebase Storage URLs
// Add this helper function at the top of your file
// const getFirebasePublicUrl = (bucketName: string, fileName: string): string => {
//   const encodedFileName = encodeURIComponent(fileName)
//     .replace(/'/g, "%27")
//     .replace(/;/g, "%3B");
//   return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedFileName}?alt=media`;
// };

// const generateQRCode = async (url: string): Promise<Buffer> => {
//   return await QRCode.toBuffer(url);
// };

// const embedQRCodeInPDF = async (
//   pdfBuffer: Buffer,
//   qrBuffer: Buffer
// ): Promise<Buffer> => {
//   const pdfDoc = await PDFDocument.load(pdfBuffer);
//   const firstPage = pdfDoc.getPages()[0];
//   const { width, height } = firstPage.getSize();

//   const qrImage = await pdfDoc.embedPng(qrBuffer);
//   firstPage.drawImage(qrImage, {
//     x: width - 150,
//     y: height - 150,
//     width: 100,
//     height: 100,
//   });

//   return Buffer.from(await pdfDoc.save());
// };

// const createQRCodePDF = async (
//   qrBuffer: Buffer,
//   fileName: string
// ): Promise<Buffer> => {
//   return new Promise((resolve, reject) => {
//     const pdfDoc = new PDFKit();
//     const chunks: Buffer[] = [];

//     pdfDoc.on("data", (chunk) => chunks.push(chunk));
//     pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
//     pdfDoc.on("error", reject);

//     pdfDoc.image(qrBuffer, 50, 50, { width: 150, height: 150 });
//     pdfDoc.text(`QR Code for: ${fileName}`, 50, 220);
//     pdfDoc.end();
//   });
// };
// app.post(
//   "/upload",
//   upload.single("file"),
//   async (req: Request, res: Response): Promise<void> => {
//     if (!req.file) {
//       res.status(400).json({ error: "No file uploaded" });
//       return;
//     }

//     try {
//       const file = req.file;
//       const fileName = `${Date.now()}-${file.originalname.replace(
//         /[^\w.-]/g,
//         "_"
//       )}`;
//       const fileRef = bucket.file(fileName);

//       // Upload original file
//       await fileRef.save(file.buffer, {
//         metadata: { contentType: file.mimetype || "application/octet-stream" },
//       });
//       await fileRef.makePublic();

//       const fileURL = getFirebasePublicUrl(bucket.name, fileName);
//       let qrPDFURL: string | null = null;

//       // Generate QR code AFTER creating the modified PDF
//       if (file.mimetype === "application/pdf") {
//         // First create the modified PDF with QR code
//         const modifiedFileName = `qr-${fileName}`;
//         const modifiedFileRef = bucket.file(modifiedFileName);

//         // Generate QR code for the modified PDF first
//         qrPDFURL = getFirebasePublicUrl(bucket.name, modifiedFileName);
//         const qrCodeBuffer = await generateQRCode(qrPDFURL);

//         // Then embed this QR code in the PDF
//         const modifiedPDF = await embedQRCodeInPDF(file.buffer, qrCodeBuffer);
//         await modifiedFileRef.save(modifiedPDF, {
//           metadata: { contentType: "application/pdf" },
//         });
//         await modifiedFileRef.makePublic();
//       } else {
//         const qrPDFFileName = `qr-code-${fileName}.pdf`;
//         qrPDFURL = getFirebasePublicUrl(bucket.name, qrPDFFileName);
//         const qrCodeBuffer = await generateQRCode(qrPDFURL);

//         const qrPDFBuffer = await createQRCodePDF(
//           qrCodeBuffer,
//           file.originalname
//         );
//         const qrPDFFileRef = bucket.file(qrPDFFileName);
//         await qrPDFFileRef.save(qrPDFBuffer, {
//           metadata: { contentType: "application/pdf" },
//         });
//         await qrPDFFileRef.makePublic();
//       }

//       // Store metadata
//       const docRef = await db.collection("uploads").add({
//         name: file.originalname,
//         url: fileURL,
//         qrPDFUrl: qrPDFURL,
//         createdAt: new Date(),
//       });

//       res.json({
//         success: true,
//         fileURL,
//         qrPDFURL,
//         fileId: docRef.id,
//       });
//     } catch (error) {
//       console.error("Error processing file:", error);
//       res.status(500).json({ error: "File upload failed" });
//     }
//   }
// );
// const createPDF = async (
//   images: Express.Multer.File[],
//   qrcode: Buffer
// ): Promise<Buffer> => {
//   return new Promise(async (resolve, reject) => {
//     const pdfDoc = new PDFKit(); // 1️⃣ Create a new PDF document
//     const chunks: Buffer[] = []; // 2️⃣ Array to store chunks

//     // 3️⃣ Capture emitted PDF data in chunks
//     pdfDoc.on("data", (chunk) => chunks.push(chunk));

//     // 4️⃣ When PDF is done, resolve with the full Buffer
//     pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));

//     pdfDoc.on("error", reject); // Handle errors

//     // 6️⃣ Iterate through images and add them to the PDF
//     images.forEach((image, index) => {
//       if (index > 0) pdfDoc.addPage(); // Add new page for each image

//       // 7️⃣ Add the image
//       pdfDoc.image(image.buffer, { fit: [500, 700], align: "center" });

//       // 8️⃣ Add QR Code ONLY on the FIRST PAGE
//       if (index === 0) {
//         pdfDoc.image(qrcode, 450, 720, { width: 100, height: 100 });
//       }
//     });

//     // 9️⃣ Finalize the PDF
//     pdfDoc.end();
//   });
// };
// app.post(
//   "/upload/image",
//   upload.array("images"),
//   async (req: Request, res: Response) => {
//     if (
//       req.files === undefined ||
//       !Array.isArray(req.files) ||
//       req.files.length === 0
//     ) {
//       res.status(400).json({ error: "No file uploaded" });
//       return;
//     }

//     const filename = `${Date.now()}-${
//       Array.isArray(req.files)
//         ? req.files[0]?.fieldname
//         : Object.keys(req.files || {})[0]
//     }`;

//     const fileRef = bucket.file(filename);
//     const fileURL = getFirebasePublicUrl(bucket.name, filename);
//     const qrcode = await generateQRCode(fileURL);
//     const qrpdf = await createPDF(req.files as Express.Multer.File[], qrcode);
//     fileRef.save(qrpdf, {
//       metadata: { contentType: "application/pdf" },
//     });
//     const doc = await db.collection("upload").add({
//       name: filename,
//       url: fileURL,
//       createdAt: new Date(),
//     });
//     console.log(fileURL);
//     res.json({ fileURL });
//   }
// );

// app.get("/files", async (req: Request, res: Response) => {
//   try {
//     const snapshot = await db.collection("uploads").get();
//     const files = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     res.json(files);
//   } catch (error) {
//     console.error("Error fetching files:", error);
//     res.status(500).json({ error: "Failed to fetch files" });
//   }
// });
app.use(errorMiddleware);
const isProduction = process.env.NODE_ENV === "production";

const startServer = async () => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      if (!isProduction) {
        console.log("🛠️ Running in development mode");
      }
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

startServer();
