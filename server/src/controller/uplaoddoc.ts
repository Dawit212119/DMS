import { Request, Response } from "express";

interface uploadFiledocProps {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}
const uploadFiledoc = async (req: uploadFiledocProps, res: Response) => {};
