import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import { ErrorCodes } from "../exceptions/root";
import { prismaClient } from "../prisma";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    return next(
      new UnauthorizedException("Unauthorized!", ErrorCodes.UnAUTHORIZED)
    );
  }
  try {
    if (!process.env.JWT_SECRET) {
      return next(
        new UnauthorizedException(
          "No JWT secret provided!",
          ErrorCodes.UnAUTHORIZED
        )
      );
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      return next(
        new UnauthorizedException("Unauthorized!", ErrorCodes.UnAUTHORIZED)
      );
    }
    req.user = user;
    next();
  } catch (error) {
    return next(
      new UnauthorizedException("Unauthorized!", ErrorCodes.UnAUTHORIZED, error)
    );
  }
};

export default authMiddleware;
