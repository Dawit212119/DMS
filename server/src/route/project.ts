import express from "express";
import { Projects, GetProject } from "../controller/projects.js";

const router = express.Router();

router.post("/", Projects);
router.get("/:id", GetProject);
router.put("/:id");
router.delete("/:id");
export default router;
