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
import { title } from "process";

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

    if (siteImagesValidation.success) {
      await prismaClient.siteImage.createMany({
        data: siteImagesValidation.data.map((img) => ({
          location: img?.location || "", // Provide default value for sender
          title: img?.title || "", // Provide default value for subject
          category: img?.category || "foundation", // Provide default valid value for category
          imageUrl: img?.imageUrl || "", // Provide default value for fileName
          fileName: img?.fileName || "", // Provide default value for priority
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
          take: 1,
          orderBy: {
            date: "desc",
          },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    });

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
    const formattedProject = {
      id: project.id,
      projectName: project.projectName,
      clientName: project.clientName,
      location: project.location,
      startDate: project.startDate.toISOString().split("T")[0],
      endDate: project.endDate.toISOString().split("T")[0],
      budget: project.budget,
      team: project.team,
      milestones: project.milestones,
      checklist: project.checklist,
      documents: project.documents,
      incomingLetters: project.incomingLetters,
      outgoingLetters: project.outgoingLetters,
      reports: project.reports,
      siteImages: project.siteImages,
    };

    // Success response
    res.status(200).json({
      success: true,
      data: formattedProject,
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
// export async function Projects(req: Request, res: Response) {
//   try {
//     if (!req.body) {
//       res.json({
//         msg: "not data found",
//         status: STATUS_CODES,
//       });
//       return;
//     }
//     const validatedProjectData = ProjectSchema.parse(req.body?.project);

//     const { projectName, clientName, location, startDate, dueDate, progress } =
//       validatedProjectData;

//     const project = await prismaClient.project.create({
//       data: {
//         projectName,
//         clientName,
//         location,
//         startDate,
//         dueDate,
//         progress,
//       },
//     });

//     const validatedBudgetData = BudgetSchema.parse(req.body?.budget);
//     const { total, spent } = validatedBudgetData;
//     const budget = await prismaClient.budget.create({
//       data: {
//         total,
//         spent,
//         projectId: project.id,
//       },
//     });

//     const validatedTeamData = TeamSchema.parse(req.body?.team);
//     const {
//       projectManger,
//       siteManger,
//       civilManger,
//       architecturalLoad,
//       totalWorker,
//     } = validatedTeamData;
//     const team = await prismaClient.team.create({
//       data: {
//         projectManger,
//         siteManger,
//         civilManger,
//         architecturalLoad,
//         totalWorker,
//         projectId: project.id,
//       },
//     });
//     const validatedUpcomingMilstoneData = UpcomingMilstoneSchema.parse(
//       req.body.upcomingMilstone
//     );
//     const { title, status, date } = validatedUpcomingMilstoneData;
//     const UpcomingMilstone = await prismaClient.upcomingMilstone.create({
//       data: {
//         title,
//         status,
//         date,
//         projectId: project.id,
//       },
//     });
//     const validatedChecklistUData = CheckListSchema.parse(req.body?.checkList);
//     const { task, assignedTo, dueData, priority, completed } =
//       validatedChecklistUData;
//     const checkList = await prismaClient.checkList.create({
//       data: {
//         task,
//         assignedTo,
//         dueData,
//         priority,
//         completed,
//         projectId: project.id,
//       },
//     });

//     const validationReportData = ReportSchema.safeParse(req.body?.report);
//     if (!validationReportData.success || !validationReportData.data) {
//       throw new Error("Invalid report data");
//     }
//     const {
//       publisher,
//       version,
//       status: reportstatus,
//       reportType,
//       downloadedUrl,
//     } = validationReportData.data;
//     if (!downloadedUrl) {
//       throw new Error("url need");
//     }
//     const report = await prismaClient.report.createMany({
//       data: {
//         projectId: project.id,
//         publisher,
//         status: reportstatus || "draft", // Provide a default value for status
//         version,
//         reportType,
//         downloadedUrl,
//       },
//     });

//     const validatedData = z.array(TheOutgoingLetterSchema).safeParse(req.body);
//     if (!validatedData.success) {
//       res.json({
//         msg: validatedData.error.flatten().fieldErrors,
//       });
//       return;
//     }

//     const outgoingletter = await prismaClient.theOutgoingLetter.createMany({
//       data: validatedData.data.map((letter: letterProps) => ({
//         recipent: letter.recipent,
//         projectId: project.id,
//         subject: letter.subject,
//         downloadedUrl: letter.downloadedUrl,
//         status: letter.status,
//         priority: letter.priority,
//       })),
//     });

//     const validatedDocumentData = z
//       .array(DocumentsSchema)
//       .safeParse(req.body?.documents);
//     if (!validatedDocumentData.success) {
//       res.json({ msg: validatedDocumentData.error.flatten().fieldErrors });
//       return;
//     }
//     const document = await prismaClient.documents.createMany({
//       data: validatedDocumentData.data.map((doc: documentProps) => ({
//         name: doc.name,
//         downloadedUrl: doc.downloadedUrl,
//         date: doc.date,
//         projectId: project.id,
//       })),
//     });
//     res.json({
//       success: true,
//       projectId: project.id,
//       project,
//       checkList,
//       UpcomingMilstone,
//       team,
//       budget,
//       outgoingletter,
//       report,
//       document,
//     });
//   } catch (error) {
//     if (error instanceof ZodError) {
//       res.json({
//         msg: error.flatten().fieldErrors,
//         status: STATUS_CODES,
//       });
//       return;
//     }
//     if (error instanceof Error) {
//       res.json({
//         msg: error.message,
//         status: STATUS_CODES,
//       });
//       return;
//     }
//     res.json({
//       msg: "server error",
//       status: 500,
//     });
//   }
// }

// export async function UpdateProject(req: Request, res: Response) {
//   const projectId = req.params.id;

//   if (!projectId) {
//     return res.status(400).json({
//       msg: "Project ID is required",
//       status: 400,
//     });
//   }

//   try {
//     // Verify project exists
//     const existingProject = await prismaClient.project.findUnique({
//       where: { id: projectId },
//     });

//     if (!existingProject) {
//       return res.status(404).json({
//         msg: "Project not found",
//         status: 404,
//       });
//     }

//     // Validate and update main project data if provided
//     if (req.body?.project) {
//       const validatedProjectData = ProjectSchema.safeParse(req.body.project);

//       if (!validatedProjectData.success) {
//         return res.status(400).json({
//           msg: validatedProjectData.error.flatten().fieldErrors,
//           status: 400,
//         });
//       }

//       await prismaClient.project.update({
//         where: { id: projectId },
//         data: validatedProjectData.data,
//       });
//     }

//     // Update budget if provided
//     if (req.body?.budget) {
//       const validatedBudgetData = BudgetSchema.safeParse(req.body.budget);

//       if (validatedBudgetData.success) {
//         await prismaClient.budget.upsert({
//           where: { projectId },
//           update: validatedBudgetData.data,
//           create: {
//             total: validatedBudgetData.data.total ?? 0,
//             spent: validatedBudgetData.data.spent ?? 0,
//             projectId,
//           },
//         });
//       } else {
//         return res.status(400).json({
//           msg: validatedBudgetData.error.flatten().fieldErrors,
//           status: 400,
//         });
//       }
//     }

//     // Update team if provided
//     if (req.body?.team) {
//       const validatedTeamData = TeamSchema.safeParse(req.body.team);

//       if (validatedTeamData.success) {
//         await prismaClient.team.upsert({
//           where: { projectId },
//           update: validatedTeamData.data,
//           create: {
//             projectManager:
//               validatedTeamData.data.projectManager || "Unknown Manager",
//             siteManager:
//               validatedTeamData.data.siteManager || "Unknown Manager",
//             civilManager:
//               validatedTeamData.data.civilManager || "Unknown Manager",
//             architecturalLead:
//               validatedTeamData.data.architecturalLead || "Unknown",
//             totalWorkers: validatedTeamData.data.totalWorkers || 0,
//             projectId,
//           },
//         });
//       } else {
//         return res.status(400).json({
//           msg: validatedTeamData.error.flatten().fieldErrors,
//           status: 400,
//         });
//       }
//     }

//     // Update upcoming milestone if provided
//     if (req.body?.upcomingMilstone) {
//       const validatedMilestoneData = MilestoneSchema.safeParse(
//         req.body.upcomingMilstone
//       );

//       if (validatedMilestoneData.success) {
//         await prismaClient.milestone.upsert({
//           where: { projectId },
//           update: validatedMilestoneData.data,
//           create: {
//             ...validatedMilestoneData.data,
//             title: validatedMilestoneData.data.title || "Default Title",
//             status: validatedMilestoneData.data.status || "ontrack",
//             projectId,
//           },
//         });
//       } else {
//         return res.status(400).json({
//           msg: validatedMilestoneData.error.flatten().fieldErrors,
//           status: 400,
//         });
//       }
//     }

//     // Update checklist if provided
//     if (req.body?.checklist) {
//       const validatedChecklistData = ChecklistItemSchema.safeParse(
//         req.body.checklist
//       );

//       if (validatedChecklistData.success) {
//         await prismaClient.checklistItem.upsert({
//           where: { projectId },
//           update: validatedChecklistData.data,
//           create: {
//             ...validatedChecklistData.data,
//             task: validatedChecklistData.data.task || "ontrack",
//             assignedTo: validatedChecklistData.data.assignedTo || "Unassigned",
//             priority: validatedChecklistData.data.priority || "low",
//             completed: validatedChecklistData.data.completed ?? false,
//             projectId,
//           },
//         });
//       } else {
//         return res.status(400).json({
//           msg: validatedChecklistData.error.flatten().fieldErrors,
//           status: 400,
//         });
//       }
//     }

//     // Update reports if provided
//     if (req.body?.reports) {
//       const validatedReportData = ReportSchema.safeParse(req.body.reports);

//       if (validatedReportData.success) {
//         const existingReport = await prismaClient.report.findFirst({
//           where: { projectId },
//         });

//         if (existingReport) {
//           await prismaClient.report.update({
//             where: { id: existingReport.id },
//             data: validatedReportData.data,
//           });
//         } else {
//           await prismaClient.report.create({
//             data: {
//               ...validatedReportData.data,
//               publisher:
//                 validatedReportData.data.publisher || "Unknown Publisher",
//               status: validatedReportData.data.status || "approved",
//               version: validatedReportData.data.version || "1.0",
//               downloadedUrl: validatedReportData.data.downloadedUrl || "",
//               reportType: validatedReportData.data.reportType || "daily",
//               projectId,
//             },
//           });
//         }
//       } else {
//         return res.status(400).json({
//           msg: validatedReportData.error.flatten().fieldErrors,
//           status: 400,
//         });
//       }
//     }

//     // Update outgoing letters if provided
//     if (req.body?.outgoingLetters) {
//       const validatedLettersData = TheOutgoingLetterSchema.safeParse(
//         req.body.outgoingLetters
//       );

//       if (validatedLettersData.success) {
//         await prismaClient.outgoingLetter.deleteMany({
//           where: { projectId },
//         });

//         if (validatedLettersData.data.length > 0) {
//           await prismaClient.outgoingLetter.createMany({
//             data: validatedLettersData.data.map((letter) => ({
//               recipient: letter.recipient || "",
//               subject: letter.subject || "",
//               downloadedUrl: letter.downloadedUrl || "",
//               status: letter.status || "draft",
//               priority: letter.priority || "low",
//               projectId,
//             })),
//           });
//         }
//       } else {
//         return res.status(400).json({
//           msg: validatedLettersData.error.flatten().fieldErrors,
//           status: 400,
//         });
//       }
//     }

//     // Update documents if provided
//     if (req.body?.documents) {
//       const validatedDocumentsData = DocumentSchema.safeParse(
//         req.body.documents
//       );

//       if (validatedDocumentsData.success) {
//         await prismaClient.document.deleteMany({
//           where: {
//             id: {
//               in: validatedDocumentsData.data
//                 .map((doc) => doc.id)
//                 .filter((id) => id !== undefined),
//             },
//           },
//         });

//         if (validatedDocumentsData.data.length > 0) {
//           await prismaClient.document.createMany({
//             data: validatedDocumentsData.data
//               .filter(
//                 (doc) =>
//                   doc.name !== undefined && doc.downloadedUrl !== undefined
//               )
//               .map((doc) => ({
//                 ...doc,
//                 name: doc.name || "Unnamed Document",
//                 downloadedUrl: doc.downloadedUrl || "",
//                 projectId,
//               })),
//           });
//         }
//       } else {
//         return res.status(400).json({
//           msg: validatedDocumentsData.error.flatten().fieldErrors,
//           status: 400,
//         });
//       }
//     }

//     // Return the updated project with all relations
//     const updatedProject = await prismaClient.project.findUnique({
//       where: { id: projectId },
//       include: {
//         team: true,
//         budget: true,
//         milestones: true,
//         checklist: true,
//         outgoingLetters: true,
//         documents: true,
//         reports: true,
//       },
//     });

//     return res.json({
//       success: true,
//       project: updatedProject,
//     });
//   } catch (error) {
//     console.error("Update project error:", error);
//     return res.status(500).json({
//       msg: "Internal server error",
//       status: 500,
//     });
//   }
// }
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
