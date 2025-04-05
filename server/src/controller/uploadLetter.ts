import { Request, Response } from "express";
import { uploadFiles, uploadImage } from "../actions/handlefileupload";
import { ZodError } from "zod";
import { prismaClient } from "../prisma";
import { TheIncomingLetterSchema, TheOutgoingLetterSchema } from "../zod";

interface IncomingLetterProps extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}
const OutgoingFileLetter = async (req: IncomingLetterProps, res: Response) => {
  try {
    if (!req.file) {
      throw new Error("File is undefined");
    }
    const projectId = req.params.id;

    const uploadResult = await uploadFiles(req.file);
    if (!uploadResult) {
      throw new Error("error on getting url");
    }

    const { qrPDFURL } = uploadResult;
    const validatedData = TheOutgoingLetterSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.json({
        msg: validatedData.error.flatten().fieldErrors,
      });
    }
    const { recipent, subject, status, priority } = validatedData.data;

    const incomingletter = await prismaClient.theOutgoingLetter.create({
      data: {
        recipent,
        projectId,
        subject,
        downloadedUrl: qrPDFURL,
        status,
        priority,
      },
    });

    return res.json({
      success: true,
      qrPDFURL,
      incomingletter,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: error.message,
      });
    }
    return res.json({
      error: "server error",
      status: 500,
    });
  }
};

const OutgoingImageLetter = async (req: IncomingLetterProps, res: Response) => {
  try {
    if (!req.files) {
      throw new Error("File is undefined");
    }
    const projectId = req.params.id;

    const uploadResult = await uploadImage(req.files);
    if (!uploadResult) {
      throw new Error("error on getting url");
    }

    const { qrpdf } = uploadResult;
    const validatedData = TheOutgoingLetterSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.json({
        msg: validatedData.error.flatten().fieldErrors,
      });
    }
    const { recipent, subject, status, priority } = validatedData.data;

    const incomingletter = await prismaClient.theOutgoingLetter.create({
      data: {
        recipent,
        projectId,
        subject,
        downloadedUrl: qrpdf.toString(),
        status,
        priority,
      },
    });

    return res.json({
      success: true,
      qrpdf,
      incomingletter,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: error.message,
      });
    }
    return res.json({
      error: "server error",
      status: 500,
    });
  }
};
export { OutgoingImageLetter, OutgoingFileLetter };
