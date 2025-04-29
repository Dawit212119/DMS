import express from "express";
import {
  //   Projects,
  //   GetProject,
  //   UpdateProject,
  getProjects,
  createProject,
} from "../controller/projects";

const router = express.Router();

router.post("/", createProject); // router.get("/:id", GetProject);
// router.put("/:id", UpdateProject);
router.delete("/:id");
// router.get("/", getProjects);
export default router;
