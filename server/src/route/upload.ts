import express from "express";
import upload from "../middelware/multermiddelware.js";
// import {
//   uploadFileReport,
//   uploadImagesReport,
// } from "../controller/uploadReport.js";
import { uploadFiles, uploadImage } from "../controller/handleUpload.js";
import { uploadCoverImg } from "../controller/uploadController.js";
const router = express.Router();

router.post("/files", upload.array("files"), uploadFiles);
router.post("/images", upload.array("images"), uploadImage);
router.post("/coverimg", upload.single("image"), uploadCoverImg);

export default router;
