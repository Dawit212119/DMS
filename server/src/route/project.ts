import express from "express";
import { Projects, GetProject, UpdateProject } from "../controller/projects";

const router = express.Router();

router.post("/", Projects);
router.get("/:id", GetProject);
router.put("/:id", UpdateProject);
router.delete("/:id");
export default router;
