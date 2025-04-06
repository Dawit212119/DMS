import { Response, Request } from "express";
import z, { ZodError } from "zod";
import {
  CheckListSchema,
  Documents,
  DocumentsSchema,
  Project,
  ProjectSchema,
  ReportSchema,
  TeamSchema,
  TheOutgoingLetter,
  TheOutgoingLetterSchema,
  UpcomingMilstoneSchema,
} from "../zod";
import { STATUS_CODES } from "http";
import { prismaClient } from "../prisma";
import { BudgetSchema } from "../zod";
interface letterProps {
  recipent: TheOutgoingLetter["recipent"];
  projectId?: Project["id"]; // Made optional
  subject: TheOutgoingLetter["subject"];
  downloadedUrl: TheOutgoingLetter["downloadedUrl"];
  status: TheOutgoingLetter["status"];
  priority: TheOutgoingLetter["priority"];
}

interface documentProps {
  name: Documents["name"];
  downloadedUrl: Documents["downloadedUrl"];
  projectId?: Project["id"];
  date: Documents["date"];
}
export async function Projects(req: Request, res: Response) {
  try {
    if (!req.body) {
      res.json({
        msg: "not data found",
        status: STATUS_CODES,
      });
      return;
    }
    const validatedProjectData = ProjectSchema.parse(req.body?.project);

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

    const validatedBudgetData = BudgetSchema.parse(req.body?.budget);
    const { total, spent } = validatedBudgetData;
    const budget = await prismaClient.budget.create({
      data: {
        total,
        spent,
        projectId: project.id,
      },
    });

    const validatedTeamData = TeamSchema.parse(req.body?.team);
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
    const validatedChecklistUData = CheckListSchema.parse(req.body?.checkList);
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

    const validationReportData = ReportSchema.safeParse(req.body?.report);
    if (!validationReportData.success || !validationReportData.data) {
      throw new Error("Invalid report data");
    }
    const {
      publisher,
      version,
      status: reportstatus,
      reportType,
      downloadedUrl,
    } = validationReportData.data;
    if (!downloadedUrl) {
      throw new Error("url need");
    }
    const report = await prismaClient.report.createMany({
      data: {
        projectId: project.id,
        publisher,
        status: reportstatus,
        version,
        reportType,
        downloadedUrl,
      },
    });

    const validatedData = z.array(TheOutgoingLetterSchema).safeParse(req.body);
    if (!validatedData.success) {
      res.json({
        msg: validatedData.error.flatten().fieldErrors,
      });
      return;
    }

    const outgoingletter = await prismaClient.theOutgoingLetter.createMany({
      data: validatedData.data.map((letter: letterProps) => ({
        recipent: letter.recipent,
        projectId: project.id,
        subject: letter.subject,
        downloadedUrl: letter.downloadedUrl,
        status: letter.status,
        priority: letter.priority,
      })),
    });

    const validatedDocumentData = z
      .array(DocumentsSchema)
      .safeParse(req.body?.documents);
    if (!validatedDocumentData.success) {
      res.json({ msg: validatedDocumentData.error.flatten().fieldErrors });
      return;
    }
    const document = await prismaClient.documents.createMany({
      data: validatedDocumentData.data.map((doc: documentProps) => ({
        name: doc.name,
        downloadedUrl: doc.downloadedUrl,
        date: doc.date,
        projectId: project.id,
      })),
    });
    res.json({
      success: true,
      projectId: project.id,
      project,
      checkList,
      UpcomingMilstone,
      team,
      budget,
      outgoingletter,
      report,
      document,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.json({
        msg: error.flatten().fieldErrors,
        status: STATUS_CODES,
      });
      return;
    }
    if (error instanceof Error) {
      res.json({
        msg: error.message,
        status: STATUS_CODES,
      });
      return;
    }
    res.json({
      msg: "server error",
      status: 500,
    });
  }
}

export async function GetProject(req: Request, res: Response) {
  const projectId = req.params.id;
  if (!projectId) {
    res.json({
      msg: "project Id cant find",
    });
    return;
  }
  try {
    const project = await prismaClient.project.findUnique({
      where: { id: projectId },
      include: {
        team: true,
        budget: true,
        upcomingMilstone: true,
        checkList: true,
        theIncomingLetter: true,
        theOutgoingLetter: true,
        documents: true,
        report: true,
      },
    });
    res.json({ project });
  } catch (error) {
    res.json({
      msg: "server error",
      status: 500,
    });
  }
}
