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

export const getProjects = async (req: Request, res: Response) => {
  try {
    console.log("present");
    // Parse pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 6;
    const skip = (page - 1) * pageSize;

    // Get total count for pagination metadata
    const totalProjects = await prismaClient.project.count();

    // Fetch projects with all relations
    const projects = await prismaClient.project.findMany({
      skip,
      take: pageSize,
      include: {
        budget: true,
        team: true,
        upcomingMilstone: true,
        checkList: true,
        documents: true,
        theIncomingLetter: true,
        theOutgoingLetter: true,
        report: true,
        constructionSiteImage: {
          take: 1, // Only get first image for thumbnail
          orderBy: {
            date: "desc",
          },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    });
    // console.log(projects);
    // Format dates and construct response
    const formattedProjects = projects.map((project) => ({
      id: project.id,
      projectName: project.projectName,
      clientName: project.clientName,
      location: project.location,
      startDate: project.startDate.toISOString().split("T")[0],
      dueDate: project.dueDate.toISOString().split("T")[0],
      progress: project.progress,
      thumbnail:
        project.constructionSiteImage[0]?.imagesrc ||
        "/default-construction.jpg",
      budget: project.budget,
      team: project.team,
    }));
    console.log("formated: ", formattedProjects);
    return res.status(200).json({
      success: true,
      data: {
        projects: formattedProjects,
        pagination: {
          totalItems: totalProjects,
          totalPages: Math.ceil(totalProjects / pageSize),
          currentPage: page,
          pageSize,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  } finally {
    await prismaClient.$disconnect();
  }
};

export async function Projects(req: Request, res: Response) {
  try {
    if (!req.body) {
      res.json({
        msg: "not data found",
        status: STATUS_CODES,
      });
      return;
    }
    console.log("the project data sent to backend>>", req.body);
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
        status: reportstatus || "draft", // Provide a default value for status
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
const UpdateProjectSchema = ProjectSchema.partial();
const UpdateBudgetSchema = BudgetSchema.partial();
const UpdateTeamSchema = TeamSchema.partial();
const UpdateUpcomingMilstoneSchema = UpcomingMilstoneSchema.partial();
const UpdateCheckListSchema = CheckListSchema.partial();
const UpdateReportSchema = ReportSchema.partial();

export async function UpdateProject(req: Request, res: Response) {
  const projectId = req.params.id;

  if (!projectId) {
    return res.status(400).json({
      msg: "Project ID is required",
      status: 400,
    });
  }

  try {
    // Verify project exists
    const existingProject = await prismaClient.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return res.status(404).json({
        msg: "Project not found",
        status: 404,
      });
    }

    // Validate and update main project data if provided
    if (req.body?.project) {
      const validatedProjectData = UpdateProjectSchema.safeParse(
        req.body.project
      );

      if (!validatedProjectData.success) {
        return res.status(400).json({
          msg: validatedProjectData.error.flatten().fieldErrors,
          status: 400,
        });
      }

      await prismaClient.project.update({
        where: { id: projectId },
        data: validatedProjectData.data,
      });
    }

    // Update budget if provided
    if (req.body?.budget) {
      const validatedBudgetData = UpdateBudgetSchema.safeParse(req.body.budget);

      if (validatedBudgetData.success) {
        await prismaClient.budget.upsert({
          where: { id: projectId },
          update: validatedBudgetData.data,
          create: {
            total: validatedBudgetData.data.total ?? 0, // Provide a default value if undefined
            spent: validatedBudgetData.data.spent ?? 0, // Provide a default value if undefined
            projectId,
          },
        });
      } else {
        return res.status(400).json({
          msg: validatedBudgetData.error.flatten().fieldErrors,
          status: 400,
        });
      }
    }

    // Update team if provided
    if (req.body?.team) {
      const validatedTeamData = UpdateTeamSchema.safeParse(req.body.team);

      if (validatedTeamData.success) {
        await prismaClient.team.upsert({
          where: { id: projectId },
          update: validatedTeamData.data,
          create: {
            projectManger:
              validatedTeamData.data.projectManger || "Unknown Manager",
            siteManger: validatedTeamData.data.siteManger || "Unknown Manager",
            civilManger:
              validatedTeamData.data.civilManger || "Unknown Manager",
            architecturalLoad:
              validatedTeamData.data.architecturalLoad || "Unknown",
            totalWorker: validatedTeamData.data.totalWorker || 0,
            projectId,
          },
        });
      } else {
        return res.status(400).json({
          msg: validatedTeamData.error.flatten().fieldErrors,
          status: 400,
        });
      }
    }

    // Update upcoming milestone if provided
    if (req.body?.upcomingMilstone) {
      const validatedMilestoneData = UpdateUpcomingMilstoneSchema.safeParse(
        req.body.upcomingMilstone
      );

      if (validatedMilestoneData.success) {
        await prismaClient.upcomingMilstone.upsert({
          where: { id: projectId },
          update: validatedMilestoneData.data,
          create: {
            ...validatedMilestoneData.data,
            title: validatedMilestoneData.data.title || "Default Title", // Provide a default title if undefined
            status: validatedMilestoneData.data.status || "ontrack", // Provide a default status if undefined
            projectId,
          },
        });
      } else {
        return res.status(400).json({
          msg: validatedMilestoneData.error.flatten().fieldErrors,
          status: 400,
        });
      }
    }

    // Update checklist if provided
    if (req.body?.checkList) {
      const validatedChecklistData = UpdateCheckListSchema.safeParse(
        req.body.checkList
      );

      if (validatedChecklistData.success) {
        await prismaClient.checkList.upsert({
          where: { id: projectId },
          update: validatedChecklistData.data,
          create: {
            ...validatedChecklistData.data,
            task: validatedChecklistData.data.task || "ontrack", // Provide a default value for task
            assignedTo: validatedChecklistData.data.assignedTo || "Unassigned", // Provide a default value for assignedTo
            priority: validatedChecklistData.data.priority || "low", // Provide a default value for priority
            completed: validatedChecklistData.data.completed ?? false, // Ensure completed is a boolean
            projectId,
          },
        });
      } else {
        return res.status(400).json({
          msg: validatedChecklistData.error.flatten().fieldErrors,
          status: 400,
        });
      }
    }

    // Update reports if provided
    if (req.body?.report) {
      const validatedReportData = UpdateReportSchema.safeParse(req.body.report);

      if (validatedReportData.success) {
        // For reports, we'll update the first one or create if none exists
        const existingReport = await prismaClient.report.findFirst({
          where: { projectId },
        });

        if (existingReport) {
          await prismaClient.report.update({
            where: { id: existingReport.id },
            data: validatedReportData.data,
          });
        } else {
          await prismaClient.report.create({
            data: {
              ...validatedReportData.data,
              publisher:
                validatedReportData.data.publisher || "Unknown Publisher", // Provide a default value
              status: validatedReportData.data.status || "approved", // Provide a default value for status
              version: validatedReportData.data.version || "1.0", // Ensure version has a default value
              downloadedUrl: validatedReportData.data.downloadedUrl || "", // Ensure downloadedUrl is a non-undefined string
              reportType: validatedReportData.data.reportType || "daily", // Provide a default value for reportType
              projectId,
            },
          });
        }
      } else {
        return res.status(400).json({
          msg: validatedReportData.error.flatten().fieldErrors,
          status: 400,
        });
      }
    }

    // Update outgoing letters if provided
    if (req.body?.theOutgoingLetter) {
      const validatedLettersData = z
        .array(TheOutgoingLetterSchema.partial())
        .safeParse(req.body.theOutgoingLetter);

      if (validatedLettersData.success) {
        // First delete all existing letters for this project
        await prismaClient.theOutgoingLetter.deleteMany({
          where: { projectId },
        });

        // Then create new ones with updated data
        if (validatedLettersData.data.length > 0) {
          await prismaClient.theOutgoingLetter.createMany({
            data: validatedLettersData.data.map((letter) => ({
              recipent: letter.recipent || "", // Ensure recipent is a non-undefined string
              subject: letter.subject || "",
              downloadedUrl: letter.downloadedUrl || "",
              status: letter.status || "draft",
              priority: letter.priority || "low",
              projectId,
            })),
          });
        }
      } else {
        return res.status(400).json({
          msg: validatedLettersData.error.flatten().fieldErrors,
          status: 400,
        });
      }
    }

    // Update documents if provided
    if (req.body?.documents) {
      const validatedDocumentsData = z
        .array(DocumentsSchema.partial())
        .safeParse(req.body.documents);

      if (validatedDocumentsData.success) {
        // First delete all existing documents for this project
        await prismaClient.documents.deleteMany({
          where: {
            id: {
              in: validatedDocumentsData?.data
                .map((doc) => doc.id)
                .filter((id) => id !== undefined),
            },
          },
        });

        // Then create new ones with updated data
        if (validatedDocumentsData.data.length > 0) {
          await prismaClient.documents.createMany({
            data: validatedDocumentsData.data
              .filter(
                (doc) =>
                  doc.name !== undefined && doc.downloadedUrl !== undefined
              ) // Ensure name and downloadedUrl are defined
              .map((doc) => ({
                ...doc,
                name: doc.name || "Unnamed Document", // Provide a default name if necessary
                downloadedUrl: doc.downloadedUrl || "", // Provide a default value for downloadedUrl
                projectId,
              })),
          });
        }
      } else {
        return res.status(400).json({
          msg: validatedDocumentsData.error.flatten().fieldErrors,
          status: 400,
        });
      }
    }

    // Return the updated project with all relations
    const updatedProject = await prismaClient.project.findUnique({
      where: { id: projectId },
      include: {
        team: true,
        budget: true,
        upcomingMilstone: true,
        checkList: true,
        theOutgoingLetter: true,
        documents: true,
        report: true,
      },
    });

    return res.json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update project error:", error);
    return res.status(500).json({
      msg: "Internal server error",
      status: 500,
    });
  }
}
