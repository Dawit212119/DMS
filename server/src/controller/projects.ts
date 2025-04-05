import { Response, Request } from "express";
import z, { ZodError } from "zod";
import {
  CheckListSchema,
  ProjectSchema,
  TeamSchema,
  UpcomingMilstoneSchema,
} from "../zod";
import { STATUS_CODES } from "http";
import { prismaClient } from "../prisma";
import { BudgetSchema } from "../zod";
export default async function Projects(req: Request, res: Response) {
  try {
    if (!req.body) {
      res.json({
        msg: "not data found",
        status: STATUS_CODES,
      });
    }
    const validatedProjectData = ProjectSchema.parse(req.body.project);

    const { projectName, clientName, location, startDate, dueDate, progress } =
      validatedProjectData;

    const project = await prismaClient.project.create({
      data: {
        projectName,
        clientName,
        location,
        startDate,
        dueDate,
        progress,
      },
    });

    const validatedBudgetData = BudgetSchema.parse(req.body.budget);
    const { total, spent } = validatedBudgetData;
    const budget = await prismaClient.budget.create({
      data: {
        total,
        spent,
        projectId: project.id,
      },
    });

    const validatedTeamData = TeamSchema.parse(req.body.team);
    const {
      projectManger,
      siteManger,
      civilManger,
      architecturalLoad,
      totalWorker,
    } = validatedTeamData;
    const team = await prismaClient.team.create({
      data: {
        projectManger,
        siteManger,
        civilManger,
        architecturalLoad,
        totalWorker,
        projectId: project.id,
      },
    });
    const validatedUpcomingMilstoneData = UpcomingMilstoneSchema.parse(
      req.body.upcomingMilstone
    );
    const { title, status, date } = validatedUpcomingMilstoneData;
    const UpcomingMilstone = await prismaClient.upcomingMilstone.create({
      data: {
        title,
        status,
        date,
        projectId: project.id,
      },
    });
    const validatedChecklistUData = CheckListSchema.parse(req.body.checkList);
    const { task, assignedTo, dueData, priority, completed } =
      validatedChecklistUData;
    const checkList = await prismaClient.checkList.create({
      data: {
        task,
        assignedTo,
        dueData,
        priority,
        completed,
        projectId: project.id,
      },
    });
    return res.json({
      success: true,
      projectId: project.id,
      project,
      checkList,
      UpcomingMilstone,
      team,
      budget,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.json({
        msg: error.flatten().fieldErrors,
        status: STATUS_CODES,
      });
    }
    if (error instanceof Error) {
      return res.json({
        msg: error.message,
        status: STATUS_CODES,
      });
    }
    return res.json({
      msg: "server error",
      status: 500,
    });
  }
}
