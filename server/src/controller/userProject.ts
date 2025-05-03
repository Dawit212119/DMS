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
export const deleteProject = async (
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
    const { projectId } = req.params;
    console.log(userId, projectId);
    // Delete related entities first (order matters)
    await prismaClient.report.deleteMany({ where: { projectId } });
    await prismaClient.incomingLetter.deleteMany({ where: { projectId } });
    await prismaClient.outgoingLetter.deleteMany({ where: { projectId } });
    await prismaClient.siteImage.deleteMany({ where: { projectId } });
    await prismaClient.document.deleteMany({ where: { projectId } });
    await prismaClient.checklistItem.deleteMany({ where: { projectId } });
    await prismaClient.milestone.deleteMany({ where: { projectId } });
    await prismaClient.team.deleteMany({ where: { projectId } });
    await prismaClient.budget.deleteMany({ where: { projectId } });

    // Finally delete the project
    await prismaClient.project.delete({ where: { id: projectId } });
    res.status(200).json({
      success: true,
      message: "project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
