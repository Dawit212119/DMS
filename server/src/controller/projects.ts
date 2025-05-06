import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import {
  SiteImageSchema,
  ProjectSchema,
  BudgetSchema,
  TeamSchema,
  MilestoneSchema,
  ChecklistItemSchema,
  ReportSchema,
  OutgoingLetterSchema,
  DocumentSchema,
  IncomingLetterSchema,
} from "../zod";
import { prismaClient } from "../prisma";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCodes } from "../exceptions/root";

// Create Project
export async function createProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.body) {
      res.status(400).json({ message: "No data provided" });
      return;
    }
    if (!req.user) {
      return next(
        new BadRequestException("Unauthorized", ErrorCodes.UnAUTHORIZED)
      );
    }
    console.log("the structured format for project>>>>>>>", req.body);
    // Validate Project Data
    const projectData = ProjectSchema.parse(req.body.project);
    console.log("present");
    // Create Project in the database
    const project = await prismaClient.project.create({
      data: {
        ...projectData,
        userId: req.user?.id,
        projectName: projectData?.projectName || "Default Project Name",
        clientName: projectData?.clientName || "Default Client Name",
        location: projectData?.location || "Default Location",
        startDate: projectData?.startDate || new Date(),
        endDate: projectData?.endDate || new Date(),
        coverImage: projectData?.coverImage,
      },
    });

    // Validate and Create Budget
    const budgetData = BudgetSchema.parse(req.body?.budget);
    const budget = await prismaClient.budget.create({
      data: {
        ...budgetData,
        total: budgetData?.total ?? 0, // Provide default value if undefined
        spent: budgetData?.spent ?? 0, // Provide default value if undefined
        projectId: project.id,
      },
    });

    // Validate and Create Team
    const teamData = TeamSchema.parse(req.body?.team);
    const team = await prismaClient.team.create({
      data: {
        ...teamData,
        projectManager: teamData?.projectManager || "Unknown Manager",
        siteManager: teamData?.siteManager || "Unknown Manager",
        civilManager: teamData?.civilManager || "Unknown Manager",
        architecturalLead: teamData?.architecturalLead || "Unknown",
        totalWorkers: teamData?.totalWorkers || 0,
        projectId: project.id,
      },
    });

    const milestonesData = req.body?.milestones?.map((milestone: any) =>
      MilestoneSchema.parse(milestone)
    );

    try {
      if (milestonesData && milestonesData.length > 0) {
        const milestones = await prismaClient.milestone.createMany({
          data: milestonesData.map((milestone: any) => ({
            name: milestone.name,
            date: milestone.date || new Date(),
            status: milestone.status || "ontrack", // Default enum value
            projectId: project.id,
          })),
        });
        console.log("Milestones created successfully:", milestones);
      } else {
        console.log("No milestones to insert.");
      }
    } catch (error) {
      console.error("Error creating milestones:", error);
      res.status(500).json({
        success: false,
        message: "Error creating milestones",
      });
    }
    // Parse and validate checklist data
    const checklistData =
      req.body?.checklist?.map((item: any) =>
        ChecklistItemSchema.parse(item)
      ) || [];

    // Only attempt insert if there's valid data
    if (checklistData.length > 0) {
      const checklist = await prismaClient.checklistItem.createMany({
        data: checklistData.map((item: any) => ({
          task: item.task || "ddd",
          assignedTo: item.assignedTo || "dd",
          dueDate: item.dueDate,
          status: item.status || "ontrack",
          priority: item.priority || "low",
          milestoneId: item.milestoneId,
          projectId: project.id,
        })),
      });
      console.log("Checklist created:", checklist);
    } else {
      console.log("No checklist items to insert.");
    }

    // Validate and Create Reports
    const reportsValidation = ReportSchema.array().safeParse(req.body?.reports);

    if (reportsValidation.success && reportsValidation.data.length > 0) {
      await prismaClient.report.createMany({
        data: reportsValidation.data.map((report) => ({
          projectId: project.id,
          status: report?.status ?? "approved", // default value
          title: report?.title || "",
          publisher: report?.publisher || "",
          version: report?.version || "",
          fileUrl: report?.fileUrl || "",
          fileName: report?.fileName || "",
          uploadedDate: report?.uploadedDate || new Date(),
          reportType: report?.reportType || "daily",
        })),
      });
      console.log("Reports created successfully");
    } else {
      console.log("No reports to insert.");
    }

    // Validate and Create Outgoing Letters
    const outgoingLettersValidation = OutgoingLetterSchema.array().safeParse(
      req.body?.outgoingLetters
    );
    if (
      outgoingLettersValidation.success &&
      outgoingLettersValidation.data.length > 0
    ) {
      await prismaClient.outgoingLetter.createMany({
        data: outgoingLettersValidation.data.map((letter) => ({
          recipient: letter?.recipient ?? "",
          subject: letter?.subject || "",
          fileUrl: letter?.fileUrl || "",
          fileName: letter?.fileName || "",
          priority: letter?.priority || "low",
          status: letter?.status || "draft",
          projectId: project.id,
        })),
      });
    } else {
      console.error("No valid outgoing letters to insert");
    }

    // Validate Incoming Letters
    const incomingLettersValidation = IncomingLetterSchema.array().safeParse(
      req.body?.incomingLetters
    );

    if (
      incomingLettersValidation.success &&
      incomingLettersValidation.data.length > 0
    ) {
      await prismaClient.incomingLetter.createMany({
        data: incomingLettersValidation.data.map((letter) => ({
          sender: letter?.sender ?? "", // Provide default value for sender
          subject: letter?.subject || "", // Provide default value for subject
          fileUrl: letter?.fileUrl || "", // Provide default value for fileUrl
          fileName: letter?.fileName || "", // Provide default value for fileName
          priority: letter?.priority || "low", // Provide default value for priority
          status: letter?.status || "unread", // Provide default value for status
          projectId: project.id,
        })),
      });
    } else {
      console.error("No valid incoming letters to insert");
    }
    // Validate Incoming Letters
    const siteImagesValidation = SiteImageSchema.array().safeParse(
      req.body?.siteImages
    );

    if (siteImagesValidation.success && siteImagesValidation.data.length > 0) {
      await prismaClient.siteImage.createMany({
        data: siteImagesValidation.data.map((img) => ({
          location: img?.location || "",
          title: img?.title || "",
          category: img?.category || "foundation",
          imageUrl: img?.imageUrl || "",
          fileName: img?.fileName || "",
          projectId: project.id,
        })),
      });
    } else {
      console.error("No valid incoming letters to insert");
    }
    // Validate and Create Documents
    const documentsValidation = DocumentSchema.array().safeParse(
      req.body?.documents
    );
    if (documentsValidation.success) {
      await prismaClient.document.createMany({
        data: documentsValidation.data
          .filter((doc) => doc !== undefined)
          .map((doc) => ({
            title: doc.title || " ", // Provide default value for title
            fileUrl: doc.fileUrl || "", // Provide default value for fileUrl
            fileName: doc.fileName || "Unnamed File", // Provide default value for fileName
            projectId: project.id,
          })),
      });
    }
    console.log("PROJECT", project);
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: { projectId: project.id },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Zod Validation Error:", JSON.stringify(error.format()));
      res.status(400).json({
        success: false,
        ur: "yyy",
        errors: error.format(),
      });
      return;
    }
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        yep: "ioo",
        message: error.message,
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: "Unknown server error",
    });
    return;
  } finally {
    await prismaClient.$disconnect();
  }
}
// Get All Projects with Pagination
export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
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
        milestones: true,
        checklist: true,
        documents: true,
        incomingLetters: true,
        outgoingLetters: true,
        reports: true,
        siteImages: {
          orderBy: {
            date: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // projects.forEach((project) => {
    //   console.log("dueDateis:", project?.checklist[0]?.dueDate instanceof Date);
    // });
    // Format dates and construct response
    // const formattedProjects = projects.map((project) => ({
    //   id: project.id,
    //   projectName: project.projectName,
    //   clientName: project.clientName,
    //   location: project.location,
    //   startDate: project.startDate.toISOString().split("T")[0],
    //   endDate: project.endDate.toISOString().split("T")[0], // Changed from dueDate
    //   thumbnail:
    //     project.siteImages[0]?.imageUrl || // Changed from constructionSiteImage
    //     "/default-construction.jpg",
    //   budget: project.budget,
    //   team: project.team,
    //   // Removed progress as it's not in the model
    // }));

    // console.log("formated: ", formattedProjects);
    res.status(200).json({
      success: true,
      data: {
        projects: projects,
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

export const getProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Fetch project with all relations
    const project = await prismaClient.project.findUnique({
      where: { id },
      include: {
        budget: true,
        team: true,
        milestones: true,
        checklist: true,
        documents: true,
        incomingLetters: true,
        outgoingLetters: true,
        reports: true,
        siteImages: true,
      },
    });

    // Return 404 if project not found
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    // Format response (optional)
    // const formattedProject = {
    //   id: project.id,
    //   projectName: project.projectName,
    //   clientName: project.clientName,
    //   location: project.location,
    //   startDate: project.startDate.toISOString().split("T")[0],
    //   endDate: project.endDate.toISOString().split("T")[0],
    //   budget: project.budget,
    //   team: project.team,
    //   milestones: project.milestones,
    //   checklist: project.checklist,
    //   documents: project.documents,
    //   incomingLetters: project.incomingLetters,
    //   outgoingLetters: project.outgoingLetters,
    //   reports: project.reports,
    //   siteImages: project.siteImages,
    // };

    // Success response
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    // Error handling (matches getProjects)
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  } finally {
    await prismaClient.$disconnect();
  }
};
export const getMyProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const myProjects = await prismaClient.project.findMany({
    where: {
      userId: req.user?.id,
    },
  });
};
export async function updateProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    console.log("Here is the update object", req.body);
    const projectId = req.params.projectId;

    if (!req.user) {
      return next(
        new BadRequestException("Unauthorized", ErrorCodes.UnAUTHORIZED)
      );
    }

    const existingProject = await prismaClient.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // Update Project
    const projectData = ProjectSchema.parse(req.body.project);
    await prismaClient.project.update({
      where: { id: projectId },
      data: {
        ...projectData,
        projectName: projectData?.projectName ?? "Default Project Name",
        clientName: projectData?.clientName ?? "Default Client Name",
        location: projectData?.location ?? "Default Location",
        startDate: projectData?.startDate ?? new Date(),
        endDate: projectData?.endDate ?? new Date(),
        coverImage: projectData?.coverImage ?? "",
      },
    });

    // Upsert Budget (delete + insert)
    await prismaClient.budget.deleteMany({ where: { projectId } });
    const budgetData = BudgetSchema.parse(req.body.budget);
    await prismaClient.budget.create({
      data: {
        ...budgetData,
        total: budgetData?.total ?? 0,
        spent: budgetData?.spent ?? 0,
        projectId,
      },
    });

    // Upsert Team (delete + insert)
    await prismaClient.team.deleteMany({ where: { projectId } });
    const teamData = TeamSchema.parse(req.body.team);
    await prismaClient.team.create({
      data: {
        ...teamData,
        projectManager: teamData?.projectManager ?? "Unknown Manager",
        siteManager: teamData?.siteManager ?? "Unknown Manager",
        civilManager: teamData?.civilManager ?? "Unknown Manager",
        architecturalLead: teamData?.architecturalLead ?? "Unknown",
        totalWorkers: teamData?.totalWorkers ?? 0,
        projectId,
      },
    });

    // Upsert Milestones
    await prismaClient.milestone.deleteMany({ where: { projectId } });
    const milestonesData =
      req.body.milestones?.map((m: any) => MilestoneSchema.parse(m)) || [];
    if (milestonesData.length) {
      await prismaClient.milestone.createMany({
        data: milestonesData.map((m: (typeof milestonesData)[0]) => ({
          name: m.name,
          date: m.date || new Date(),
          status: m.status || "ontrack",
          projectId,
        })),
      });
    }

    // Upsert Checklist
    await prismaClient.checklistItem.deleteMany({ where: { projectId } });
    const checklistData =
      req.body?.checklist?.map((item: any) =>
        ChecklistItemSchema.parse(item)
      ) || [];
    if (checklistData.length) {
      await prismaClient.checklistItem.createMany({
        data: checklistData.map((item: (typeof checklistData)[0]) => ({
          task: item.task || "Unnamed Task",
          assignedTo: item.assignedTo || "Unknown",
          dueDate: item.dueDate,
          status: item.status || "ontrack",
          priority: item.priority || "low",
          milestoneId: item.milestoneId,
          projectId,
        })),
      });
    }

    // Upsert Reports
    await prismaClient.report.deleteMany({ where: { projectId } });
    const reportsValidation = ReportSchema.array().safeParse(req.body?.reports);
    if (reportsValidation.success && reportsValidation.data.length > 0) {
      await prismaClient.report.createMany({
        data: reportsValidation.data.map((report) => ({
          projectId,
          status: report?.status ?? "approved",
          title: report?.title || "",
          publisher: report?.publisher || "",
          version: report?.version || "",
          fileUrl: report?.fileUrl || "",
          fileName: report?.fileName || "",
          uploadedDate: report?.uploadedDate || new Date(),
          reportType: report?.reportType || "daily",
        })),
      });
    }

    // Upsert Outgoing Letters
    await prismaClient.outgoingLetter.deleteMany({ where: { projectId } });
    const outgoingLettersValidation = OutgoingLetterSchema.array().safeParse(
      req.body.outgoingLetters
    );
    if (outgoingLettersValidation.success) {
      await prismaClient.outgoingLetter.createMany({
        data: outgoingLettersValidation.data.map((letter) => ({
          recipient: letter?.recipient || "",
          subject: letter?.subject || "",
          fileUrl: letter?.fileUrl || "",
          fileName: letter?.fileName || "",
          priority: letter?.priority || "low",
          status: letter?.status || "draft",
          projectId,
        })),
      });
    }

    // Upsert Incoming Letters
    await prismaClient.incomingLetter.deleteMany({ where: { projectId } });
    const incomingLettersValidation = IncomingLetterSchema.array().safeParse(
      req.body.incomingLetters
    );
    if (incomingLettersValidation.success) {
      await prismaClient.incomingLetter.createMany({
        data: incomingLettersValidation.data.map((letter) => ({
          sender: letter?.sender || "",
          subject: letter?.subject || "",
          fileUrl: letter?.fileUrl || "",
          fileName: letter?.fileName || "",
          priority: letter?.priority || "low",
          status: letter?.status || "unread",
          projectId,
        })),
      });
    }

    // Upsert Site Images
    await prismaClient.siteImage.deleteMany({ where: { projectId } });
    const siteImagesValidation = SiteImageSchema.array().safeParse(
      req.body?.siteImages
    );
    if (siteImagesValidation.success && siteImagesValidation.data.length > 0) {
      await prismaClient.siteImage.createMany({
        data: siteImagesValidation.data.map((img) => ({
          location: img?.location || "",
          title: img?.title || "",
          category: img?.category || "foundation",
          imageUrl: img?.imageUrl || "",
          fileName: img?.fileName || "",
          projectId,
        })),
      });
    }

    // Upsert Documents
    await prismaClient.document.deleteMany({ where: { projectId } });
    const documentsValidation = DocumentSchema.array().safeParse(
      req.body?.documents
    );
    if (documentsValidation.success) {
      await prismaClient.document.createMany({
        data: documentsValidation.data.map((doc) => ({
          title: doc?.title || " ",
          fileUrl: doc?.fileUrl || "",
          fileName: doc?.fileName || "Unnamed File",
          projectId,
        })),
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Update Project Server Error:", error); // ✅ Add this for debugging

    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        errors: error.format(),
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error",
    });
  }
}
