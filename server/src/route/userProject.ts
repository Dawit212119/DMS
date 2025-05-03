import { NextFunction, Router, Request, Response } from "express";
import authMiddleware from "../middelware/auth";
import { getUserProjects } from "../controller/userProject";

const userProjectRoute = Router();
userProjectRoute.get("/projects", authMiddleware, getUserProjects);
export default userProjectRoute;
