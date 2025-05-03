import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCodes } from "../exceptions/root";
import { prismaClient } from "../prisma";

export const getUserProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(
        new BadRequestException("Unauthorized", ErrorCodes.UnAUTHORIZED)
      );
    }

    const userId = req.user.id;

    const projects = await prismaClient.project.findMany({
      where: { userId },
    });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};
