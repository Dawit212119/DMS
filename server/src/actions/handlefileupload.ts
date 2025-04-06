import { Request, Response } from "express";
import getFirebasePublicUrl from "../utils/getFirebasePublicUrl.js";
import generateQRCode from "../utils/generateQrcode.js";
import embedQRCodeInPDF from "../utils/embedQrcodeInPdf.js";
import { createPDF, createQRCodePDF } from "../utils/createQrCodePdf.js";
import { bucket, db } from "../utils/firestore.js";

const uploadFiles = async (file: Express.Multer.File) => {
  try {
    if (!file) {
      return;
    }
    const fileName = `${Date.now()}-${file.originalname.replace(
      /[^\w.-]/g,
      "_"
    )}`;
    const fileRef = bucket.file(fileName);

    // Upload original file
    await fileRef.save(file.buffer, {
      metadata: { contentType: file.mimetype || "application/octet-stream" },
    });
    await fileRef.makePublic();

    const fileURL = getFirebasePublicUrl(bucket.name, fileName);
    let qrPDFURL: string | null = null;

    // Generate QR code AFTER creating the modified PDF
    if (file.mimetype === "application/pdf") {
      // First create the modified PDF with QR code
      const modifiedFileName = `qr-${fileName}`;
      const modifiedFileRef = bucket.file(modifiedFileName);

      // Generate QR code for the modified PDF first
      qrPDFURL = getFirebasePublicUrl(bucket.name, modifiedFileName);
      const qrCodeBuffer = await generateQRCode(qrPDFURL);

      // Then embed this QR code in the PDF
      const modifiedPDF = await embedQRCodeInPDF(file.buffer, qrCodeBuffer);
      await modifiedFileRef.save(modifiedPDF, {
        metadata: { contentType: "application/pdf" },
      });
      await modifiedFileRef.makePublic();
    } else {
      const qrCodeBuffer = await generateQRCode(fileURL);
      const qrPDFFileName = `qr-code-${fileName}.pdf`;

      const qrPDFBuffer = await createQRCodePDF(
        qrCodeBuffer,
        file.originalname
      );
      const qrPDFFileRef = bucket.file(qrPDFFileName);
      await qrPDFFileRef.save(qrPDFBuffer, {
        metadata: { contentType: "application/pdf" },
      });
      await qrPDFFileRef.makePublic();
      qrPDFURL = getFirebasePublicUrl(bucket.name, qrPDFFileName);
    }

    // Store metadata
    const docRef = await db.collection("uploads").add({
      name: file.originalname,
      url: fileURL,
      qrPDFUrl: qrPDFURL,
      createdAt: new Date(),
    });
    return { qrPDFURL, fileURL };
    // res.json({
    //   success: true,
    //   fileURL,
    //   qrPDFURL,
    //   fileId: docRef.id,
    // });
  } catch (error) {
    console.error("Error processing file:", error);
    // res.status(500).json({ error: "File upload failed" });
  }
};

const uploadImage = async (
  files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] }
) => {
  if (files === undefined || !Array.isArray(files) || files.length === 0) {
    return;
  }

  const filename = `${Date.now()}-${
    Array.isArray(files) ? files[0]?.fieldname : Object.keys(files || {})[0]
  }`;

  const fileRef = bucket.file(filename);
  const fileURL = getFirebasePublicUrl(bucket.name, filename);
  const qrcode = await generateQRCode(fileURL);
  const qrpdf = await createPDF(files as Express.Multer.File[], qrcode);
  fileRef.save(qrpdf, {
    metadata: { contentType: "application/pdf" },
  });
  const doc = await db.collection("upload").add({
    name: filename,
    url: fileURL,
    createdAt: new Date(),
  });
  console.log(fileURL);
  return { qrpdf };
};

export { uploadFiles, uploadImage };
