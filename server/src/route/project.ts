import express from "express";
import {
  Projects,
  GetProject,
  UpdateProject,
  getProjects,
} from "../controller/projects";
import authMiddleware from "../middelware/auth";

const router = express.Router();

router.post("/", authMiddleware, Projects);
router.get("/:id", GetProject);
router.put("/:id", authMiddleware, UpdateProject);
router.delete("/:id");
router.get("/", getProjects);
export default router;
