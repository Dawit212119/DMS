import express from "express";
import GetFiles from "../controller/getFiles.js";

const router = express.Router();

router.get("/", GetFiles);

export default router;
