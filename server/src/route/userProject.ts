import { NextFunction, Router, Request, Response } from "express";
import authMiddleware from "../middelware/auth";
import { deleteProject, getUserProjects } from "../controller/userProject";

const userProjectRoute = Router();
userProjectRoute.get("/projects", authMiddleware, getUserProjects);
userProjectRoute.delete("/projects/:projectId", authMiddleware, deleteProject);
export default userProjectRoute;
