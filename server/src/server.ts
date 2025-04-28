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

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/api", authRoute);
app.use("/upload", uploadRouter);
app.use("/files", getRouter);
app.use("/project", project);

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
