import { Router } from "express";
import {
  getStatus,
  login,
  logOut,
  me,
  resetPassword,
  resetPasswordRequest,
  signup,
  verifyUser,
} from "../controller/auth";
import authMiddleware from "../middelware/auth";

const authRoute = Router();
authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/me", authMiddleware, me);
authRoute.post("/logout", authMiddleware, logOut);
authRoute.get("/verify/:userId/:uniqueString", verifyUser);
authRoute.get("/verified", getStatus);
authRoute.post("/resetpasswordrequest", resetPasswordRequest);
authRoute.post("/resetpassword", resetPassword);

export default authRoute;
