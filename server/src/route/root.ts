import { Router, Request, Response } from "express";
import { login, me, signup } from "../controller/auth";
import authMiddleware from "../middelware/auth";

const authRoute = Router();
authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/me", authMiddleware, me);

export default authRoute;
