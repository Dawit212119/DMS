import { Router, Request, Response } from "express";

const authRoute = Router();
authRoute.get("/", (req: Request, res: Response) => {
  res.json("your route is working ");
});
export default authRoute;
