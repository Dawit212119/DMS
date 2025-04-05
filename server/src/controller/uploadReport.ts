import { Response, Request } from "express";
import { uploadFiles, uploadImage } from "../actions/handlefileupload";
import { prismaClient } from "../prisma";
import { ReportSchema } from "../zod";

interface uploadReportProps extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}
const uploadFileReport = async (req: uploadReportProps, res: Response) => {
  if (!req.file) {
    return res.json({
      status: 404,
      msg: "no file to upload",
    });
  }
  const projectId = req.params.id;

  const uploadResult = await uploadFiles(req.file);
  if (!uploadResult) {
    return res.json({
      msg: "error when getting url",
      status: 403,
    });
  }
  const { qrPDFURL } = uploadResult;
  const validationReportData = ReportSchema.parse(req.body);
  const { publisher, status, version, reportType } = validationReportData;
  if (!qrPDFURL) {
    return res.json({
      msg: "error when getting url",
      status: 403,
    });
  }
  const report = await prismaClient.report.create({
    data: {
      projectId,
      publisher,
      status,
      version,
      reportType,
      downloadedUrl: qrPDFURL,
    },
  });

  return res.json({
    success: true,
    qrPDFURL,
    report,
  });
};
const uploadImagesReport = async (req: uploadReportProps, res: Response) => {
  if (!req.files) {
    return res.json({
      status: 404,
      msg: "no file to upload",
    });
  }
  const projectId = req.params.id;

  if (req.files) {
    const uploadResult = await uploadImage(req.files);
    if (!uploadResult) {
      return res.json({
        msg: "error in get url ",
      });
    }
    const { qrpdf } = uploadResult;

    const validationReportData = ReportSchema.parse(req.body);
    const { publisher, status, version, reportType } = validationReportData;
    const report = await prismaClient.report.create({
      data: {
        projectId,
        publisher,
        status,
        version,
        reportType,
        downloadedUrl: qrpdf.toString(),
      },
    });

    return res.json({
      success: true,
      qrpdf,
      report,
    });
  }
};
export { uploadFileReport, uploadImagesReport };
