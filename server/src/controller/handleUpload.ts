import { Request, Response } from "express";
import getFirebasePublicUrl from "../utils/getFirebasePublicUrl.js";
import generateQRCode from "../utils/generateQrcode.js";
import embedQRCodeInPDF from "../utils/embedQrcodeInPdf.js";
import { createPDF, createQRCodePDF } from "../utils/createQrCodePdf.js";
import { bucket, db } from "../utils/firestore.js";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?:
    | Express.Multer.File[]
    | { [fieldname: string]: Express.Multer.File[] };
}

const uploadFiles = async (
  req: MulterRequest,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  try {
    const file = req.file;
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

    res.json({
      success: true,
      fileURL,
      qrPDFURL,
      fileId: docRef.id,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};

const uploadImage = async (req: MulterRequest, res: Response) => {
  if (
    req.files === undefined ||
    !Array.isArray(req.files) ||
    req.files.length === 0
  ) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const filename = `${Date.now()}-${
    Array.isArray(req.files)
      ? req.files[0]?.fieldname
      : Object.keys(req.files || {})[0]
  }`;

  const fileRef = bucket.file(filename);
  const fileURL = getFirebasePublicUrl(bucket.name, filename);
  const qrcode = await generateQRCode(fileURL);
  const qrpdf = await createPDF(req.files as Express.Multer.File[], qrcode);
  fileRef.save(qrpdf, {
    metadata: { contentType: "application/pdf" },
  });
  const doc = await db.collection("upload").add({
    name: filename,
    url: fileURL,
    createdAt: new Date(),
  });
  console.log(fileURL);
  res.json({ fileURL });
};

export { uploadFiles, uploadImage };
