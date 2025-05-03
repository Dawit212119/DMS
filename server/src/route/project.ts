import express from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
} from "../controller/projects";
import authMiddleware from "../middelware/auth";

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.put("/:projectId", authMiddleware, updateProject);

// router.get("/:id", GetProject);
// router.put("/:id", authMiddleware, UpdateProject);
// router.delete("/:id");
router.get("/", getProjects);
router.get("/:id", getProjectById);
export default router;
