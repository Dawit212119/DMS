import express from "express";
import upload from "../middelware/multermiddelware.js";
import { uploadFiles, uploadImage } from "../controller/handleUpload.js";
const router = express.Router();

router.post("/:id", upload.single("file"), uploadFiles);
router.post("/report:id", upload.array("images"), uploadImage);

export default router;
