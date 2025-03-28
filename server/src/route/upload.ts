import express from "express";
import upload from "../middelware/multermiddelware.js";
import { uploadFiles, uploadImage } from "../controller/handleUpload.js";
const router = express.Router();

router.post("/", upload.single("file"), uploadFiles);
router.post("/image", upload.array("images"), uploadImage);

export default router;
