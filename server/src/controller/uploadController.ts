import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";

export const uploadCoverImg = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "your_folder_name",
    });

    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Upload failed",
      error,
    });
  }
};
