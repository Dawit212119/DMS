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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase Admin Setup
const serviceAccountPath = path.resolve(
  __dirname,
  "..",
  "src",
  "serviceAccountKey.json" // Fixed typo from "seviceAccountKey.json"
);
// C:\Users\Dave\Desktop\nextjs-auth\server\src\uti
if (!fs.existsSync(serviceAccountPath)) {
  throw new Error("Missing serviceAccountKey.json file");
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

export default app;
