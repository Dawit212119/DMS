import { Router } from "express";
import { login, logOut, me, signup } from "../controller/auth";
import authMiddleware from "../middelware/auth";

const authRoute = Router();
authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/me", authMiddleware, me);
authRoute.post("/logout", authMiddleware, logOut);

export default authRoute;
