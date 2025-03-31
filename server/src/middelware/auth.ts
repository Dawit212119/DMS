import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import { ErrorCodes } from "../exceptions/root";
import { prismaClient } from "../prisma";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    next(new UnauthorizedException("Unauthorized!", ErrorCodes.UnAUTHORIZED));
    return;
  }
  try {
    if (!process.env.JWT_SECRET) {
      next(
        new UnauthorizedException(
          "no jwt secret provided!",
          ErrorCodes.UnAUTHORIZED
        )
      );
      return;
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      if (!user) {
        next(
          new UnauthorizedException("Unauthorized!", ErrorCodes.UnAUTHORIZED)
        );
        return;
      }
      req.user = user;
    }
  } catch (error) {
    next(
      new UnauthorizedException("Unauthorized!", ErrorCodes.UnAUTHORIZED, error)
    );
    return;
  }
};
export default authMiddleware;
