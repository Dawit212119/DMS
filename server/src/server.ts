import express, { Request, Response } from "express";
import multer from "multer";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import fs from "fs";
import path, { dirname } from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Firebase Admin Setup
const serviceAccountPath = path.resolve(__dirname, "../seviceAccountKey.json");
if (!fs.existsSync(serviceAccountPath)) {
  throw new Error("Missing serviceAccountKey.json file");
}

const serviceAccount: ServiceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf-8")
);

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET, // Set in .env file
});

const bucket = getStorage().bucket();
const db: Firestore = getFirestore();

// Middleware
app.use(cors());
app.use(express.json());

// Multer storage (file upload handling)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Route (Supports PDF, RAR, DWG, and other files)
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
      // Upload file to Firebase Storage
      await fileRef.save(file.buffer, {
        metadata: { contentType: file.mimetype },
      });

      // Get public URL
      const fileURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      // Store file metadata in Firestore
      const docRef = await db.collection("uploads").add({
        name: file.originalname,
        url: fileURL,
        createdAt: new Date(),
      });

      res.json({ success: true, fileURL, fileId: docRef.id });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "File upload failed" });
    }
  }
);

// Get all uploaded files
app.get("/files", async (req: Request, res: Response) => {
  try {
    const snapshot = await db
      .collection("uploads")
      .orderBy("createdAt", "desc")
      .get();
    const files = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
