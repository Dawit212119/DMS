import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "email",
  "password",
  "createdAt",
  "updatedAt",
]);

export const ProjectScalarFieldEnumSchema = z.enum([
  "id",
  "projectName",
  "clientName",
  "location",
  "startDate",
  "endDate",
  "createdAt",
  "updatedAt",
]);

export const BudgetScalarFieldEnumSchema = z.enum([
  "id",
  "total",
  "spent",
  "projectId",
]);

export const TeamScalarFieldEnumSchema = z.enum([
  "id",
  "projectManager",
  "siteManager",
  "civilManager",
  "architecturalLead",
  "totalWorkers",
  "projectId",
]);

export const MilestoneScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "date",
  "status",
  "projectId",
]);

export const ChecklistItemScalarFieldEnumSchema = z.enum([
  "id",
  "task",
  "assignedTo",
  "dueDate",
  "status",
  "priority",
  "milestoneId",
  "projectId",
]);

export const DocumentScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "fileUrl",
  "fileName",
  "date",
  "projectId",
]);

export const SiteImageScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "location",
  "category",
  "imageUrl",
  "fileName",
  "date",
  "projectId",
]);

export const OutgoingLetterScalarFieldEnumSchema = z.enum([
  "id",
  "recipient",
  "subject",
  "priority",
  "status",
  "fileUrl",
  "fileName",
  "createdAt",
  "projectId",
]);

export const IncomingLetterScalarFieldEnumSchema = z.enum([
  "id",
  "sender",
  "subject",
  "priority",
  "status",
  "fileUrl",
  "fileName",
  "createdAt",
  "projectId",
]);

export const ReportScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "publisher",
  "reportType",
  "version",
  "status",
  "fileUrl",
  "fileName",
  "uploadedDate",
  "projectId",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const StatusSchema = z.enum(["ontrack", "atrisk"]);

export type StatusType = `${z.infer<typeof StatusSchema>}`;

export const PrioritySchema = z.enum(["high", "medium", "low"]);

export type PriorityType = `${z.infer<typeof PrioritySchema>}`;

export const CategorySchema = z.enum([
  "foundation",
  "structural",
  "electrical",
  "plumbing",
  "exterior",
  "aerial",
]);

export type CategoryType = `${z.infer<typeof CategorySchema>}`;

export const OutgoingStatusSchema = z.enum(["draft", "sent"]);

export type OutgoingStatusType = `${z.infer<typeof OutgoingStatusSchema>}`;

export const IncomingStatusSchema = z.enum(["read", "unread"]);

export type IncomingStatusType = `${z.infer<typeof IncomingStatusSchema>}`;

export const ReportStatusSchema = z.enum(["approved", "rejected"]);

export type ReportStatusType = `${z.infer<typeof ReportStatusSchema>}`;

export const ReportTypeSchema = z.enum([
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "annually",
]);

export type ReportTypeType = `${z.infer<typeof ReportTypeSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  .optional();

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z
  .object({
    id: z.string().optional().optional(),
    projectName: z.string().optional(),
    clientName: z.string().optional(),
    location: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .optional();

export type Project = z.infer<typeof ProjectSchema>;

/////////////////////////////////////////
// BUDGET SCHEMA
/////////////////////////////////////////

export const BudgetSchema = z
  .object({
    id: z.string().optional(),
    total: z.number().optional(),
    spent: z.number().optional(),
    projectId: z.string().optional(),
  })
  .optional();

export type Budget = z.infer<typeof BudgetSchema>;

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////

export const TeamSchema = z
  .object({
    id: z.string().optional(),
    projectManager: z.string().optional(),
    siteManager: z.string().optional(),
    civilManager: z.string().optional(),
    architecturalLead: z.string().optional(),
    totalWorkers: z.number().int().optional(),
    projectId: z.string().optional(),
  })
  .optional();

export type Team = z.infer<typeof TeamSchema>;

/////////////////////////////////////////
// MILESTONE SCHEMA
/////////////////////////////////////////

export const MilestoneSchema = z
  .object({
    status: StatusSchema,
    id: z.string().optional(),
    name: z.string().optional(),
    date: z.coerce.date().optional(),
    projectId: z.string().optional(),
  })
  .optional();

export type Milestone = z.infer<typeof MilestoneSchema>;

/////////////////////////////////////////
// CHECKLIST ITEM SCHEMA
/////////////////////////////////////////

export const ChecklistItemSchema = z
  .object({
    status: StatusSchema,
    priority: PrioritySchema,
    id: z.string().optional(),
    task: z.string().optional(),
    assignedTo: z.string().optional(),
    dueDate: z.coerce.date().optional(),
    milestoneId: z.string().optional(),
    projectId: z.string().optional(),
  })
  .optional();
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;

/////////////////////////////////////////
// DOCUMENT SCHEMA
/////////////////////////////////////////

export const DocumentSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().optional(),
    fileUrl: z.string().optional(),
    fileName: z.string().optional(),
    date: z.coerce.date().optional(),
    projectId: z.string().optional(),
  })
  .optional();

export type Document = z.infer<typeof DocumentSchema>;

/////////////////////////////////////////
// SITE IMAGE SCHEMA
/////////////////////////////////////////

export const SiteImageSchema = z
  .object({
    category: CategorySchema,
    id: z.string().optional(),
    title: z.string().optional(),
    location: z.string().optional(),
    imageUrl: z.string().optional(),
    fileName: z.string().optional(),
    date: z.coerce.date().optional(),
    projectId: z.string().optional(),
  })
  .optional();

export type SiteImage = z.infer<typeof SiteImageSchema>;

/////////////////////////////////////////
// OUTGOING LETTER SCHEMA
/////////////////////////////////////////

export const OutgoingLetterSchema = z
  .object({
    priority: PrioritySchema,
    status: OutgoingStatusSchema,
    id: z.string().optional(),
    recipient: z.string().optional(),
    subject: z.string().optional(),
    fileUrl: z.string().optional(),
    fileName: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    projectId: z.string().optional(),
  })
  .optional();

export type OutgoingLetter = z.infer<typeof OutgoingLetterSchema>;

/////////////////////////////////////////
// INCOMING LETTER SCHEMA
/////////////////////////////////////////

export const IncomingLetterSchema = z
  .object({
    priority: PrioritySchema,
    status: IncomingStatusSchema,
    id: z.string().optional(),
    sender: z.string().optional(),
    subject: z.string().optional(),
    fileUrl: z.string().optional(),
    fileName: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    projectId: z.string().optional().optional(),
  })
  .optional();

export type IncomingLetter = z.infer<typeof IncomingLetterSchema>;

/////////////////////////////////////////
// REPORT SCHEMA
/////////////////////////////////////////

export const ReportSchema = z
  .object({
    reportType: ReportTypeSchema,
    status: ReportStatusSchema,
    id: z.string().optional(),
    title: z.string().optional(),
    publisher: z.string().optional(),
    version: z.string().optional(),
    fileUrl: z.string().optional(),
    fileName: z.string().optional(),
    uploadedDate: z.coerce.date().optional(),
    projectId: z.string().optional(),
  })
  .optional();

export type Report = z.infer<typeof ReportSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
  })
  .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

// PROJECT
//------------------------------------------------------

export const ProjectIncludeSchema: z.ZodType<Prisma.ProjectInclude> = z
  .object({})
  .strict();

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectDefaultArgs> = z
  .object({
    select: z.lazy(() => ProjectSelectSchema).optional(),
    include: z.lazy(() => ProjectIncludeSchema).optional(),
  })
  .strict();

export const ProjectCountOutputTypeArgsSchema: z.ZodType<Prisma.ProjectCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ProjectCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const ProjectCountOutputTypeSelectSchema: z.ZodType<Prisma.ProjectCountOutputTypeSelect> =
  z
    .object({
      milestones: z.boolean().optional(),
      checklist: z.boolean().optional(),
      documents: z.boolean().optional(),
      outgoingLetters: z.boolean().optional(),
      incomingLetters: z.boolean().optional(),
      reports: z.boolean().optional(),
      siteImages: z.boolean().optional(),
    })
    .strict();

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z
  .object({
    id: z.boolean().optional(),
    projectName: z.boolean().optional(),
    clientName: z.boolean().optional(),
    location: z.boolean().optional(),
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    budget: z.union([z.boolean(), z.lazy(() => BudgetArgsSchema)]).optional(),
    team: z.union([z.boolean(), z.lazy(() => TeamArgsSchema)]).optional(),
    milestones: z
      .union([z.boolean(), z.lazy(() => MilestoneArgsSchema)])
      .optional(),
    checklist: z
      .union([z.boolean(), z.lazy(() => ChecklistItemArgsSchema)])
      .optional(),
    documents: z
      .union([z.boolean(), z.lazy(() => DocumentArgsSchema)])
      .optional(),
    outgoingLetters: z
      .union([z.boolean(), z.lazy(() => OutgoingLetterArgsSchema)])
      .optional(),
    incomingLetters: z
      .union([z.boolean(), z.lazy(() => IncomingLetterArgsSchema)])
      .optional(),
    reports: z.union([z.boolean(), z.lazy(() => ReportArgsSchema)]).optional(),
    siteImages: z
      .union([z.boolean(), z.lazy(() => SiteImageArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ProjectCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// BUDGET
//------------------------------------------------------

export const BudgetIncludeSchema: z.ZodType<Prisma.BudgetInclude> = z
  .object({})
  .strict();

export const BudgetArgsSchema: z.ZodType<Prisma.BudgetDefaultArgs> = z
  .object({
    select: z.lazy(() => BudgetSelectSchema).optional(),
    include: z.lazy(() => BudgetIncludeSchema).optional(),
  })
  .strict();

export const BudgetSelectSchema: z.ZodType<Prisma.BudgetSelect> = z
  .object({
    id: z.boolean().optional(),
    total: z.boolean().optional(),
    spent: z.boolean().optional(),
    projectId: z.boolean().optional(),
    project: z.union([z.boolean(), z.lazy(() => ProjectArgsSchema)]).optional(),
  })
  .strict();

// TEAM
//------------------------------------------------------

export const TeamIncludeSchema: z.ZodType<Prisma.TeamInclude> = z
  .object({})
  .strict();

export const TeamArgsSchema: z.ZodType<Prisma.TeamDefaultArgs> = z
  .object({
    select: z.lazy(() => TeamSelectSchema).optional(),
    include: z.lazy(() => TeamIncludeSchema).optional(),
  })
  .strict();

export const TeamSelectSchema: z.ZodType<Prisma.TeamSelect> = z
  .object({
    id: z.boolean().optional(),
    projectManager: z.boolean().optional(),
    siteManager: z.boolean().optional(),
    civilManager: z.boolean().optional(),
    architecturalLead: z.boolean().optional(),
    totalWorkers: z.boolean().optional(),
    projectId: z.boolean().optional(),
    project: z.union([z.boolean(), z.lazy(() => ProjectArgsSchema)]).optional(),
  })
  .strict();

// MILESTONE
//------------------------------------------------------

export const MilestoneIncludeSchema: z.ZodType<Prisma.MilestoneInclude> = z
  .object({})
  .strict();

export const MilestoneArgsSchema: z.ZodType<Prisma.MilestoneDefaultArgs> = z
  .object({
    select: z.lazy(() => MilestoneSelectSchema).optional(),
    include: z.lazy(() => MilestoneIncludeSchema).optional(),
  })
  .strict();

export const MilestoneSelectSchema: z.ZodType<Prisma.MilestoneSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    date: z.boolean().optional(),
    status: z.boolean().optional(),
    projectId: z.boolean().optional(),
    project: z.union([z.boolean(), z.lazy(() => ProjectArgsSchema)]).optional(),
  })
  .strict();

// CHECKLIST ITEM
//------------------------------------------------------

export const ChecklistItemIncludeSchema: z.ZodType<Prisma.ChecklistItemInclude> =
  z.object({}).strict();

export const ChecklistItemArgsSchema: z.ZodType<Prisma.ChecklistItemDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ChecklistItemSelectSchema).optional(),
      include: z.lazy(() => ChecklistItemIncludeSchema).optional(),
    })
    .strict();

export const ChecklistItemSelectSchema: z.ZodType<Prisma.ChecklistItemSelect> =
  z
    .object({
      id: z.boolean().optional(),
      task: z.boolean().optional(),
      assignedTo: z.boolean().optional(),
      dueDate: z.boolean().optional(),
      status: z.boolean().optional(),
      priority: z.boolean().optional(),
      milestoneId: z.boolean().optional(),
      projectId: z.boolean().optional(),
      project: z
        .union([z.boolean(), z.lazy(() => ProjectArgsSchema)])
        .optional(),
    })
    .strict();

// DOCUMENT
//------------------------------------------------------

export const DocumentIncludeSchema: z.ZodType<Prisma.DocumentInclude> = z
  .object({})
  .strict();

export const DocumentArgsSchema: z.ZodType<Prisma.DocumentDefaultArgs> = z
  .object({
    select: z.lazy(() => DocumentSelectSchema).optional(),
    include: z.lazy(() => DocumentIncludeSchema).optional(),
  })
  .strict();

export const DocumentSelectSchema: z.ZodType<Prisma.DocumentSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    fileUrl: z.boolean().optional(),
    fileName: z.boolean().optional(),
    date: z.boolean().optional(),
    projectId: z.boolean().optional(),
    project: z.union([z.boolean(), z.lazy(() => ProjectArgsSchema)]).optional(),
  })
  .strict();

// SITE IMAGE
//------------------------------------------------------

export const SiteImageIncludeSchema: z.ZodType<Prisma.SiteImageInclude> = z
  .object({})
  .strict();

export const SiteImageArgsSchema: z.ZodType<Prisma.SiteImageDefaultArgs> = z
  .object({
    select: z.lazy(() => SiteImageSelectSchema).optional(),
    include: z.lazy(() => SiteImageIncludeSchema).optional(),
  })
  .strict();

export const SiteImageSelectSchema: z.ZodType<Prisma.SiteImageSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    location: z.boolean().optional(),
    category: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    fileName: z.boolean().optional(),
    date: z.boolean().optional(),
    projectId: z.boolean().optional(),
    project: z.union([z.boolean(), z.lazy(() => ProjectArgsSchema)]).optional(),
  })
  .strict();

// OUTGOING LETTER
//------------------------------------------------------

export const OutgoingLetterIncludeSchema: z.ZodType<Prisma.OutgoingLetterInclude> =
  z.object({}).strict();

export const OutgoingLetterArgsSchema: z.ZodType<Prisma.OutgoingLetterDefaultArgs> =
  z
    .object({
      select: z.lazy(() => OutgoingLetterSelectSchema).optional(),
      include: z.lazy(() => OutgoingLetterIncludeSchema).optional(),
    })
    .strict();

export const OutgoingLetterSelectSchema: z.ZodType<Prisma.OutgoingLetterSelect> =
  z
    .object({
      id: z.boolean().optional(),
      recipient: z.boolean().optional(),
      subject: z.boolean().optional(),
      priority: z.boolean().optional(),
      status: z.boolean().optional(),
      fileUrl: z.boolean().optional(),
      fileName: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      projectId: z.boolean().optional(),
      project: z
        .union([z.boolean(), z.lazy(() => ProjectArgsSchema)])
        .optional(),
    })
    .strict();

// INCOMING LETTER
//------------------------------------------------------

export const IncomingLetterIncludeSchema: z.ZodType<Prisma.IncomingLetterInclude> =
  z.object({}).strict();

export const IncomingLetterArgsSchema: z.ZodType<Prisma.IncomingLetterDefaultArgs> =
  z
    .object({
      select: z.lazy(() => IncomingLetterSelectSchema).optional(),
      include: z.lazy(() => IncomingLetterIncludeSchema).optional(),
    })
    .strict();

export const IncomingLetterSelectSchema: z.ZodType<Prisma.IncomingLetterSelect> =
  z
    .object({
      id: z.boolean().optional(),
      sender: z.boolean().optional(),
      subject: z.boolean().optional(),
      priority: z.boolean().optional(),
      status: z.boolean().optional(),
      fileUrl: z.boolean().optional(),
      fileName: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      projectId: z.boolean().optional(),
      project: z
        .union([z.boolean(), z.lazy(() => ProjectArgsSchema)])
        .optional(),
    })
    .strict();

// REPORT
//------------------------------------------------------

export const ReportIncludeSchema: z.ZodType<Prisma.ReportInclude> = z
  .object({})
  .strict();

export const ReportArgsSchema: z.ZodType<Prisma.ReportDefaultArgs> = z
  .object({
    select: z.lazy(() => ReportSelectSchema).optional(),
    include: z.lazy(() => ReportIncludeSchema).optional(),
  })
  .strict();

export const ReportSelectSchema: z.ZodType<Prisma.ReportSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    publisher: z.boolean().optional(),
    reportType: z.boolean().optional(),
    version: z.boolean().optional(),
    status: z.boolean().optional(),
    fileUrl: z.boolean().optional(),
    fileName: z.boolean().optional(),
    uploadedDate: z.boolean().optional(),
    projectId: z.boolean().optional(),
    project: z.union([z.boolean(), z.lazy(() => ProjectArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    password: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  })
  .strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        email: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        email: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().optional(),
          email: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          password: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        })
        .strict()
    );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      email: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      password: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProjectWhereInputSchema),
        z.lazy(() => ProjectWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProjectWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProjectWhereInputSchema),
        z.lazy(() => ProjectWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    projectName: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    clientName: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    location: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    startDate: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    endDate: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    budget: z
      .union([
        z.lazy(() => BudgetNullableScalarRelationFilterSchema),
        z.lazy(() => BudgetWhereInputSchema),
      ])
      .optional()
      .nullable(),
    team: z
      .union([
        z.lazy(() => TeamNullableScalarRelationFilterSchema),
        z.lazy(() => TeamWhereInputSchema),
      ])
      .optional()
      .nullable(),
    milestones: z.lazy(() => MilestoneListRelationFilterSchema).optional(),
    checklist: z.lazy(() => ChecklistItemListRelationFilterSchema).optional(),
    documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
    outgoingLetters: z
      .lazy(() => OutgoingLetterListRelationFilterSchema)
      .optional(),
    incomingLetters: z
      .lazy(() => IncomingLetterListRelationFilterSchema)
      .optional(),
    reports: z.lazy(() => ReportListRelationFilterSchema).optional(),
    siteImages: z.lazy(() => SiteImageListRelationFilterSchema).optional(),
  })
  .strict();

export const ProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      projectName: z.lazy(() => SortOrderSchema).optional(),
      clientName: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      startDate: z.lazy(() => SortOrderSchema).optional(),
      endDate: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      budget: z.lazy(() => BudgetOrderByWithRelationInputSchema).optional(),
      team: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
      milestones: z
        .lazy(() => MilestoneOrderByRelationAggregateInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemOrderByRelationAggregateInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentOrderByRelationAggregateInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterOrderByRelationAggregateInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterOrderByRelationAggregateInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportOrderByRelationAggregateInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ProjectWhereUniqueInputSchema: z.ZodType<Prisma.ProjectWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => ProjectWhereInputSchema),
              z.lazy(() => ProjectWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ProjectWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ProjectWhereInputSchema),
              z.lazy(() => ProjectWhereInputSchema).array(),
            ])
            .optional(),
          projectName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          clientName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          location: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          startDate: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          endDate: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          budget: z
            .union([
              z.lazy(() => BudgetNullableScalarRelationFilterSchema),
              z.lazy(() => BudgetWhereInputSchema),
            ])
            .optional()
            .nullable(),
          team: z
            .union([
              z.lazy(() => TeamNullableScalarRelationFilterSchema),
              z.lazy(() => TeamWhereInputSchema),
            ])
            .optional()
            .nullable(),
          milestones: z
            .lazy(() => MilestoneListRelationFilterSchema)
            .optional(),
          checklist: z
            .lazy(() => ChecklistItemListRelationFilterSchema)
            .optional(),
          documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
          outgoingLetters: z
            .lazy(() => OutgoingLetterListRelationFilterSchema)
            .optional(),
          incomingLetters: z
            .lazy(() => IncomingLetterListRelationFilterSchema)
            .optional(),
          reports: z.lazy(() => ReportListRelationFilterSchema).optional(),
          siteImages: z
            .lazy(() => SiteImageListRelationFilterSchema)
            .optional(),
        })
        .strict()
    );

export const ProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      projectName: z.lazy(() => SortOrderSchema).optional(),
      clientName: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      startDate: z.lazy(() => SortOrderSchema).optional(),
      endDate: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => ProjectCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ProjectMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ProjectMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const ProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ProjectScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      projectName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      clientName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      location: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      startDate: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      endDate: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const BudgetWhereInputSchema: z.ZodType<Prisma.BudgetWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => BudgetWhereInputSchema),
        z.lazy(() => BudgetWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => BudgetWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => BudgetWhereInputSchema),
        z.lazy(() => BudgetWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    total: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    spent: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    projectId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    project: z
      .union([
        z.lazy(() => ProjectScalarRelationFilterSchema),
        z.lazy(() => ProjectWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const BudgetOrderByWithRelationInputSchema: z.ZodType<Prisma.BudgetOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      total: z.lazy(() => SortOrderSchema).optional(),
      spent: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const BudgetWhereUniqueInputSchema: z.ZodType<Prisma.BudgetWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        projectId: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        projectId: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().optional(),
          projectId: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => BudgetWhereInputSchema),
              z.lazy(() => BudgetWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => BudgetWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => BudgetWhereInputSchema),
              z.lazy(() => BudgetWhereInputSchema).array(),
            ])
            .optional(),
          total: z
            .union([z.lazy(() => FloatFilterSchema), z.number()])
            .optional(),
          spent: z
            .union([z.lazy(() => FloatFilterSchema), z.number()])
            .optional(),
          project: z
            .union([
              z.lazy(() => ProjectScalarRelationFilterSchema),
              z.lazy(() => ProjectWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const BudgetOrderByWithAggregationInputSchema: z.ZodType<Prisma.BudgetOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      total: z.lazy(() => SortOrderSchema).optional(),
      spent: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => BudgetCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => BudgetAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => BudgetMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => BudgetMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => BudgetSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const BudgetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BudgetScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => BudgetScalarWhereWithAggregatesInputSchema),
          z.lazy(() => BudgetScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => BudgetScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => BudgetScalarWhereWithAggregatesInputSchema),
          z.lazy(() => BudgetScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      total: z
        .union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()])
        .optional(),
      spent: z
        .union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const TeamWhereInputSchema: z.ZodType<Prisma.TeamWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TeamWhereInputSchema),
        z.lazy(() => TeamWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TeamWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TeamWhereInputSchema),
        z.lazy(() => TeamWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    projectManager: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    siteManager: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    civilManager: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    architecturalLead: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    totalWorkers: z
      .union([z.lazy(() => IntFilterSchema), z.number()])
      .optional(),
    projectId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    project: z
      .union([
        z.lazy(() => ProjectScalarRelationFilterSchema),
        z.lazy(() => ProjectWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const TeamOrderByWithRelationInputSchema: z.ZodType<Prisma.TeamOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      projectManager: z.lazy(() => SortOrderSchema).optional(),
      siteManager: z.lazy(() => SortOrderSchema).optional(),
      civilManager: z.lazy(() => SortOrderSchema).optional(),
      architecturalLead: z.lazy(() => SortOrderSchema).optional(),
      totalWorkers: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const TeamWhereUniqueInputSchema: z.ZodType<Prisma.TeamWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        projectId: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        projectId: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().optional(),
          projectId: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => TeamWhereInputSchema),
              z.lazy(() => TeamWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TeamWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => TeamWhereInputSchema),
              z.lazy(() => TeamWhereInputSchema).array(),
            ])
            .optional(),
          projectManager: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          siteManager: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          civilManager: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          architecturalLead: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          totalWorkers: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          project: z
            .union([
              z.lazy(() => ProjectScalarRelationFilterSchema),
              z.lazy(() => ProjectWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const TeamOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeamOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      projectManager: z.lazy(() => SortOrderSchema).optional(),
      siteManager: z.lazy(() => SortOrderSchema).optional(),
      civilManager: z.lazy(() => SortOrderSchema).optional(),
      architecturalLead: z.lazy(() => SortOrderSchema).optional(),
      totalWorkers: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => TeamCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => TeamAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TeamMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TeamMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => TeamSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const TeamScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeamScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TeamScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      projectManager: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      siteManager: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      civilManager: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      architecturalLead: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      totalWorkers: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const MilestoneWhereInputSchema: z.ZodType<Prisma.MilestoneWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MilestoneWhereInputSchema),
          z.lazy(() => MilestoneWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MilestoneWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MilestoneWhereInputSchema),
          z.lazy(() => MilestoneWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      date: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      project: z
        .union([
          z.lazy(() => ProjectScalarRelationFilterSchema),
          z.lazy(() => ProjectWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MilestoneOrderByWithRelationInputSchema: z.ZodType<Prisma.MilestoneOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const MilestoneWhereUniqueInputSchema: z.ZodType<Prisma.MilestoneWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => MilestoneWhereInputSchema),
              z.lazy(() => MilestoneWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MilestoneWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => MilestoneWhereInputSchema),
              z.lazy(() => MilestoneWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          date: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          status: z
            .union([
              z.lazy(() => EnumStatusFilterSchema),
              z.lazy(() => StatusSchema),
            ])
            .optional(),
          projectId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          project: z
            .union([
              z.lazy(() => ProjectScalarRelationFilterSchema),
              z.lazy(() => ProjectWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const MilestoneOrderByWithAggregationInputSchema: z.ZodType<Prisma.MilestoneOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => MilestoneCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => MilestoneMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => MilestoneMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const MilestoneScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MilestoneScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MilestoneScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MilestoneScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MilestoneScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MilestoneScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MilestoneScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      date: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusWithAggregatesFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ChecklistItemWhereInputSchema: z.ZodType<Prisma.ChecklistItemWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ChecklistItemWhereInputSchema),
          z.lazy(() => ChecklistItemWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ChecklistItemWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ChecklistItemWhereInputSchema),
          z.lazy(() => ChecklistItemWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      task: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      assignedTo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      dueDate: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => EnumPriorityFilterSchema),
          z.lazy(() => PrioritySchema),
        ])
        .optional(),
      milestoneId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      project: z
        .union([
          z.lazy(() => ProjectScalarRelationFilterSchema),
          z.lazy(() => ProjectWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemOrderByWithRelationInputSchema: z.ZodType<Prisma.ChecklistItemOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      task: z.lazy(() => SortOrderSchema).optional(),
      assignedTo: z.lazy(() => SortOrderSchema).optional(),
      dueDate: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      milestoneId: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const ChecklistItemWhereUniqueInputSchema: z.ZodType<Prisma.ChecklistItemWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => ChecklistItemWhereInputSchema),
              z.lazy(() => ChecklistItemWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ChecklistItemWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ChecklistItemWhereInputSchema),
              z.lazy(() => ChecklistItemWhereInputSchema).array(),
            ])
            .optional(),
          task: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          assignedTo: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          dueDate: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          status: z
            .union([
              z.lazy(() => EnumStatusFilterSchema),
              z.lazy(() => StatusSchema),
            ])
            .optional(),
          priority: z
            .union([
              z.lazy(() => EnumPriorityFilterSchema),
              z.lazy(() => PrioritySchema),
            ])
            .optional(),
          milestoneId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          projectId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          project: z
            .union([
              z.lazy(() => ProjectScalarRelationFilterSchema),
              z.lazy(() => ProjectWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const ChecklistItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChecklistItemOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      task: z.lazy(() => SortOrderSchema).optional(),
      assignedTo: z.lazy(() => SortOrderSchema).optional(),
      dueDate: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      milestoneId: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => ChecklistItemCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => ChecklistItemMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => ChecklistItemMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ChecklistItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChecklistItemScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ChecklistItemScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ChecklistItemScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ChecklistItemScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ChecklistItemScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ChecklistItemScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      task: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      assignedTo: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      dueDate: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusWithAggregatesFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => EnumPriorityWithAggregatesFilterSchema),
          z.lazy(() => PrioritySchema),
        ])
        .optional(),
      milestoneId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const DocumentWhereInputSchema: z.ZodType<Prisma.DocumentWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => DocumentWhereInputSchema),
        z.lazy(() => DocumentWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DocumentWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DocumentWhereInputSchema),
        z.lazy(() => DocumentWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileName: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    date: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    projectId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    project: z
      .union([
        z.lazy(() => ProjectScalarRelationFilterSchema),
        z.lazy(() => ProjectWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const DocumentOrderByWithRelationInputSchema: z.ZodType<Prisma.DocumentOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const DocumentWhereUniqueInputSchema: z.ZodType<Prisma.DocumentWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => DocumentWhereInputSchema),
              z.lazy(() => DocumentWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => DocumentWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => DocumentWhereInputSchema),
              z.lazy(() => DocumentWhereInputSchema).array(),
            ])
            .optional(),
          title: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          fileUrl: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          fileName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          date: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          projectId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          project: z
            .union([
              z.lazy(() => ProjectScalarRelationFilterSchema),
              z.lazy(() => ProjectWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const DocumentOrderByWithAggregationInputSchema: z.ZodType<Prisma.DocumentOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => DocumentCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => DocumentMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => DocumentMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const DocumentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DocumentScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema),
          z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => DocumentScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema),
          z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      fileUrl: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      date: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const SiteImageWhereInputSchema: z.ZodType<Prisma.SiteImageWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SiteImageWhereInputSchema),
          z.lazy(() => SiteImageWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SiteImageWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SiteImageWhereInputSchema),
          z.lazy(() => SiteImageWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      location: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      category: z
        .union([
          z.lazy(() => EnumCategoryFilterSchema),
          z.lazy(() => CategorySchema),
        ])
        .optional(),
      imageUrl: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      date: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      project: z
        .union([
          z.lazy(() => ProjectScalarRelationFilterSchema),
          z.lazy(() => ProjectWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SiteImageOrderByWithRelationInputSchema: z.ZodType<Prisma.SiteImageOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      category: z.lazy(() => SortOrderSchema).optional(),
      imageUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const SiteImageWhereUniqueInputSchema: z.ZodType<Prisma.SiteImageWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => SiteImageWhereInputSchema),
              z.lazy(() => SiteImageWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SiteImageWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SiteImageWhereInputSchema),
              z.lazy(() => SiteImageWhereInputSchema).array(),
            ])
            .optional(),
          title: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          location: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          category: z
            .union([
              z.lazy(() => EnumCategoryFilterSchema),
              z.lazy(() => CategorySchema),
            ])
            .optional(),
          imageUrl: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          fileName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          date: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          projectId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          project: z
            .union([
              z.lazy(() => ProjectScalarRelationFilterSchema),
              z.lazy(() => ProjectWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const SiteImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.SiteImageOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      category: z.lazy(() => SortOrderSchema).optional(),
      imageUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => SiteImageCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => SiteImageMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SiteImageMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const SiteImageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SiteImageScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SiteImageScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SiteImageScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SiteImageScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SiteImageScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SiteImageScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      location: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      category: z
        .union([
          z.lazy(() => EnumCategoryWithAggregatesFilterSchema),
          z.lazy(() => CategorySchema),
        ])
        .optional(),
      imageUrl: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      date: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const OutgoingLetterWhereInputSchema: z.ZodType<Prisma.OutgoingLetterWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => OutgoingLetterWhereInputSchema),
          z.lazy(() => OutgoingLetterWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => OutgoingLetterWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => OutgoingLetterWhereInputSchema),
          z.lazy(() => OutgoingLetterWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      recipient: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      subject: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      priority: z
        .union([
          z.lazy(() => EnumPriorityFilterSchema),
          z.lazy(() => PrioritySchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumOutgoingStatusFilterSchema),
          z.lazy(() => OutgoingStatusSchema),
        ])
        .optional(),
      fileUrl: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      project: z
        .union([
          z.lazy(() => ProjectScalarRelationFilterSchema),
          z.lazy(() => ProjectWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterOrderByWithRelationInputSchema: z.ZodType<Prisma.OutgoingLetterOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      recipient: z.lazy(() => SortOrderSchema).optional(),
      subject: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const OutgoingLetterWhereUniqueInputSchema: z.ZodType<Prisma.OutgoingLetterWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => OutgoingLetterWhereInputSchema),
              z.lazy(() => OutgoingLetterWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => OutgoingLetterWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => OutgoingLetterWhereInputSchema),
              z.lazy(() => OutgoingLetterWhereInputSchema).array(),
            ])
            .optional(),
          recipient: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          subject: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          priority: z
            .union([
              z.lazy(() => EnumPriorityFilterSchema),
              z.lazy(() => PrioritySchema),
            ])
            .optional(),
          status: z
            .union([
              z.lazy(() => EnumOutgoingStatusFilterSchema),
              z.lazy(() => OutgoingStatusSchema),
            ])
            .optional(),
          fileUrl: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          fileName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          projectId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          project: z
            .union([
              z.lazy(() => ProjectScalarRelationFilterSchema),
              z.lazy(() => ProjectWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const OutgoingLetterOrderByWithAggregationInputSchema: z.ZodType<Prisma.OutgoingLetterOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      recipient: z.lazy(() => SortOrderSchema).optional(),
      subject: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => OutgoingLetterCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => OutgoingLetterMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => OutgoingLetterMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const OutgoingLetterScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OutgoingLetterScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => OutgoingLetterScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => OutgoingLetterScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => OutgoingLetterScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => OutgoingLetterScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => OutgoingLetterScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      recipient: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      subject: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      priority: z
        .union([
          z.lazy(() => EnumPriorityWithAggregatesFilterSchema),
          z.lazy(() => PrioritySchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumOutgoingStatusWithAggregatesFilterSchema),
          z.lazy(() => OutgoingStatusSchema),
        ])
        .optional(),
      fileUrl: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const IncomingLetterWhereInputSchema: z.ZodType<Prisma.IncomingLetterWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => IncomingLetterWhereInputSchema),
          z.lazy(() => IncomingLetterWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => IncomingLetterWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => IncomingLetterWhereInputSchema),
          z.lazy(() => IncomingLetterWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      sender: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      subject: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      priority: z
        .union([
          z.lazy(() => EnumPriorityFilterSchema),
          z.lazy(() => PrioritySchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumIncomingStatusFilterSchema),
          z.lazy(() => IncomingStatusSchema),
        ])
        .optional(),
      fileUrl: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      project: z
        .union([
          z.lazy(() => ProjectScalarRelationFilterSchema),
          z.lazy(() => ProjectWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterOrderByWithRelationInputSchema: z.ZodType<Prisma.IncomingLetterOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sender: z.lazy(() => SortOrderSchema).optional(),
      subject: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const IncomingLetterWhereUniqueInputSchema: z.ZodType<Prisma.IncomingLetterWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => IncomingLetterWhereInputSchema),
              z.lazy(() => IncomingLetterWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => IncomingLetterWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => IncomingLetterWhereInputSchema),
              z.lazy(() => IncomingLetterWhereInputSchema).array(),
            ])
            .optional(),
          sender: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          subject: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          priority: z
            .union([
              z.lazy(() => EnumPriorityFilterSchema),
              z.lazy(() => PrioritySchema),
            ])
            .optional(),
          status: z
            .union([
              z.lazy(() => EnumIncomingStatusFilterSchema),
              z.lazy(() => IncomingStatusSchema),
            ])
            .optional(),
          fileUrl: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          fileName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          projectId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          project: z
            .union([
              z.lazy(() => ProjectScalarRelationFilterSchema),
              z.lazy(() => ProjectWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const IncomingLetterOrderByWithAggregationInputSchema: z.ZodType<Prisma.IncomingLetterOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sender: z.lazy(() => SortOrderSchema).optional(),
      subject: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => IncomingLetterCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => IncomingLetterMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => IncomingLetterMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const IncomingLetterScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IncomingLetterScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => IncomingLetterScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => IncomingLetterScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => IncomingLetterScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => IncomingLetterScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => IncomingLetterScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      sender: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      subject: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      priority: z
        .union([
          z.lazy(() => EnumPriorityWithAggregatesFilterSchema),
          z.lazy(() => PrioritySchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumIncomingStatusWithAggregatesFilterSchema),
          z.lazy(() => IncomingStatusSchema),
        ])
        .optional(),
      fileUrl: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ReportWhereInputSchema: z.ZodType<Prisma.ReportWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ReportWhereInputSchema),
        z.lazy(() => ReportWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ReportWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ReportWhereInputSchema),
        z.lazy(() => ReportWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    publisher: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    reportType: z
      .union([
        z.lazy(() => EnumReportTypeFilterSchema),
        z.lazy(() => ReportTypeSchema),
      ])
      .optional(),
    version: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    status: z
      .union([
        z.lazy(() => EnumReportStatusFilterSchema),
        z.lazy(() => ReportStatusSchema),
      ])
      .optional(),
    fileUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileName: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    uploadedDate: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    projectId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    project: z
      .union([
        z.lazy(() => ProjectScalarRelationFilterSchema),
        z.lazy(() => ProjectWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const ReportOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      publisher: z.lazy(() => SortOrderSchema).optional(),
      reportType: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      uploadedDate: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const ReportWhereUniqueInputSchema: z.ZodType<Prisma.ReportWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => ReportWhereInputSchema),
              z.lazy(() => ReportWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ReportWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ReportWhereInputSchema),
              z.lazy(() => ReportWhereInputSchema).array(),
            ])
            .optional(),
          title: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          publisher: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          reportType: z
            .union([
              z.lazy(() => EnumReportTypeFilterSchema),
              z.lazy(() => ReportTypeSchema),
            ])
            .optional(),
          version: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          status: z
            .union([
              z.lazy(() => EnumReportStatusFilterSchema),
              z.lazy(() => ReportStatusSchema),
            ])
            .optional(),
          fileUrl: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          fileName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          uploadedDate: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          projectId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          project: z
            .union([
              z.lazy(() => ProjectScalarRelationFilterSchema),
              z.lazy(() => ProjectWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const ReportOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      publisher: z.lazy(() => SortOrderSchema).optional(),
      reportType: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      uploadedDate: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => ReportCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ReportMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ReportMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const ReportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ReportScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      publisher: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      reportType: z
        .union([
          z.lazy(() => EnumReportTypeWithAggregatesFilterSchema),
          z.lazy(() => ReportTypeSchema),
        ])
        .optional(),
      version: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumReportStatusWithAggregatesFilterSchema),
          z.lazy(() => ReportStatusSchema),
        ])
        .optional(),
      fileUrl: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      uploadedDate: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      email: z.string(),
      password: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    password: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      email: z.string(),
      password: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z
  .object({
    id: z.string().optional(),
    projectName: z.string(),
    clientName: z.string(),
    location: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    budget: z
      .lazy(() => BudgetCreateNestedOneWithoutProjectInputSchema)
      .optional(),
    team: z.lazy(() => TeamCreateNestedOneWithoutProjectInputSchema).optional(),
    milestones: z
      .lazy(() => MilestoneCreateNestedManyWithoutProjectInputSchema)
      .optional(),
    checklist: z
      .lazy(() => ChecklistItemCreateNestedManyWithoutProjectInputSchema)
      .optional(),
    documents: z
      .lazy(() => DocumentCreateNestedManyWithoutProjectInputSchema)
      .optional(),
    outgoingLetters: z
      .lazy(() => OutgoingLetterCreateNestedManyWithoutProjectInputSchema)
      .optional(),
    incomingLetters: z
      .lazy(() => IncomingLetterCreateNestedManyWithoutProjectInputSchema)
      .optional(),
    reports: z
      .lazy(() => ReportCreateNestedManyWithoutProjectInputSchema)
      .optional(),
    siteImages: z
      .lazy(() => SiteImageCreateNestedManyWithoutProjectInputSchema)
      .optional(),
  })
  .strict();

export const ProjectUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUpdateInputSchema: z.ZodType<Prisma.ProjectUpdateInput> = z
  .object({
    projectName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    clientName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    location: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    startDate: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    endDate: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    budget: z
      .lazy(() => BudgetUpdateOneWithoutProjectNestedInputSchema)
      .optional(),
    team: z.lazy(() => TeamUpdateOneWithoutProjectNestedInputSchema).optional(),
    milestones: z
      .lazy(() => MilestoneUpdateManyWithoutProjectNestedInputSchema)
      .optional(),
    checklist: z
      .lazy(() => ChecklistItemUpdateManyWithoutProjectNestedInputSchema)
      .optional(),
    documents: z
      .lazy(() => DocumentUpdateManyWithoutProjectNestedInputSchema)
      .optional(),
    outgoingLetters: z
      .lazy(() => OutgoingLetterUpdateManyWithoutProjectNestedInputSchema)
      .optional(),
    incomingLetters: z
      .lazy(() => IncomingLetterUpdateManyWithoutProjectNestedInputSchema)
      .optional(),
    reports: z
      .lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema)
      .optional(),
    siteImages: z
      .lazy(() => SiteImageUpdateManyWithoutProjectNestedInputSchema)
      .optional(),
  })
  .strict();

export const ProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateManyInputSchema: z.ZodType<Prisma.ProjectCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const ProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectUpdateManyMutationInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const BudgetCreateInputSchema: z.ZodType<Prisma.BudgetCreateInput> = z
  .object({
    id: z.string().optional(),
    total: z.number(),
    spent: z.number(),
    project: z.lazy(() => ProjectCreateNestedOneWithoutBudgetInputSchema),
  })
  .strict();

export const BudgetUncheckedCreateInputSchema: z.ZodType<Prisma.BudgetUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      total: z.number(),
      spent: z.number(),
      projectId: z.string(),
    })
    .strict();

export const BudgetUpdateInputSchema: z.ZodType<Prisma.BudgetUpdateInput> = z
  .object({
    total: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    spent: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
      .optional(),
    project: z
      .lazy(() => ProjectUpdateOneRequiredWithoutBudgetNestedInputSchema)
      .optional(),
  })
  .strict();

export const BudgetUncheckedUpdateInputSchema: z.ZodType<Prisma.BudgetUncheckedUpdateInput> =
  z
    .object({
      total: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      spent: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const BudgetCreateManyInputSchema: z.ZodType<Prisma.BudgetCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      total: z.number(),
      spent: z.number(),
      projectId: z.string(),
    })
    .strict();

export const BudgetUpdateManyMutationInputSchema: z.ZodType<Prisma.BudgetUpdateManyMutationInput> =
  z
    .object({
      total: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      spent: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const BudgetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BudgetUncheckedUpdateManyInput> =
  z
    .object({
      total: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      spent: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeamCreateInputSchema: z.ZodType<Prisma.TeamCreateInput> = z
  .object({
    id: z.string().optional(),
    projectManager: z.string(),
    siteManager: z.string(),
    civilManager: z.string(),
    architecturalLead: z.string(),
    totalWorkers: z.number().int(),
    project: z.lazy(() => ProjectCreateNestedOneWithoutTeamInputSchema),
  })
  .strict();

export const TeamUncheckedCreateInputSchema: z.ZodType<Prisma.TeamUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      projectManager: z.string(),
      siteManager: z.string(),
      civilManager: z.string(),
      architecturalLead: z.string(),
      totalWorkers: z.number().int(),
      projectId: z.string(),
    })
    .strict();

export const TeamUpdateInputSchema: z.ZodType<Prisma.TeamUpdateInput> = z
  .object({
    projectManager: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    siteManager: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    civilManager: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    architecturalLead: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    totalWorkers: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    project: z
      .lazy(() => ProjectUpdateOneRequiredWithoutTeamNestedInputSchema)
      .optional(),
  })
  .strict();

export const TeamUncheckedUpdateInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateInput> =
  z
    .object({
      projectManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      siteManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      civilManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      architecturalLead: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      totalWorkers: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeamCreateManyInputSchema: z.ZodType<Prisma.TeamCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      projectManager: z.string(),
      siteManager: z.string(),
      civilManager: z.string(),
      architecturalLead: z.string(),
      totalWorkers: z.number().int(),
      projectId: z.string(),
    })
    .strict();

export const TeamUpdateManyMutationInputSchema: z.ZodType<Prisma.TeamUpdateManyMutationInput> =
  z
    .object({
      projectManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      siteManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      civilManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      architecturalLead: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      totalWorkers: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeamUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyInput> =
  z
    .object({
      projectManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      siteManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      civilManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      architecturalLead: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      totalWorkers: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MilestoneCreateInputSchema: z.ZodType<Prisma.MilestoneCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      date: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
      project: z.lazy(() => ProjectCreateNestedOneWithoutMilestonesInputSchema),
    })
    .strict();

export const MilestoneUncheckedCreateInputSchema: z.ZodType<Prisma.MilestoneUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      date: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
      projectId: z.string(),
    })
    .strict();

export const MilestoneUpdateInputSchema: z.ZodType<Prisma.MilestoneUpdateInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      project: z
        .lazy(() => ProjectUpdateOneRequiredWithoutMilestonesNestedInputSchema)
        .optional(),
    })
    .strict();

export const MilestoneUncheckedUpdateInputSchema: z.ZodType<Prisma.MilestoneUncheckedUpdateInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MilestoneCreateManyInputSchema: z.ZodType<Prisma.MilestoneCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      date: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
      projectId: z.string(),
    })
    .strict();

export const MilestoneUpdateManyMutationInputSchema: z.ZodType<Prisma.MilestoneUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MilestoneUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MilestoneUncheckedUpdateManyInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemCreateInputSchema: z.ZodType<Prisma.ChecklistItemCreateInput> =
  z
    .object({
      id: z.string().optional(),
      task: z.string(),
      assignedTo: z.string(),
      dueDate: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
      priority: z.lazy(() => PrioritySchema),
      milestoneId: z.string(),
      project: z.lazy(() => ProjectCreateNestedOneWithoutChecklistInputSchema),
    })
    .strict();

export const ChecklistItemUncheckedCreateInputSchema: z.ZodType<Prisma.ChecklistItemUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      task: z.string(),
      assignedTo: z.string(),
      dueDate: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
      priority: z.lazy(() => PrioritySchema),
      milestoneId: z.string(),
      projectId: z.string(),
    })
    .strict();

export const ChecklistItemUpdateInputSchema: z.ZodType<Prisma.ChecklistItemUpdateInput> =
  z
    .object({
      task: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assignedTo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dueDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      milestoneId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      project: z
        .lazy(() => ProjectUpdateOneRequiredWithoutChecklistNestedInputSchema)
        .optional(),
    })
    .strict();

export const ChecklistItemUncheckedUpdateInputSchema: z.ZodType<Prisma.ChecklistItemUncheckedUpdateInput> =
  z
    .object({
      task: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assignedTo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dueDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      milestoneId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemCreateManyInputSchema: z.ZodType<Prisma.ChecklistItemCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      task: z.string(),
      assignedTo: z.string(),
      dueDate: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
      priority: z.lazy(() => PrioritySchema),
      milestoneId: z.string(),
      projectId: z.string(),
    })
    .strict();

export const ChecklistItemUpdateManyMutationInputSchema: z.ZodType<Prisma.ChecklistItemUpdateManyMutationInput> =
  z
    .object({
      task: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assignedTo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dueDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      milestoneId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChecklistItemUncheckedUpdateManyInput> =
  z
    .object({
      task: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assignedTo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dueDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      milestoneId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DocumentCreateInputSchema: z.ZodType<Prisma.DocumentCreateInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      fileUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
      project: z.lazy(() => ProjectCreateNestedOneWithoutDocumentsInputSchema),
    })
    .strict();

export const DocumentUncheckedCreateInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      fileUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
      projectId: z.string(),
    })
    .strict();

export const DocumentUpdateInputSchema: z.ZodType<Prisma.DocumentUpdateInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      project: z
        .lazy(() => ProjectUpdateOneRequiredWithoutDocumentsNestedInputSchema)
        .optional(),
    })
    .strict();

export const DocumentUncheckedUpdateInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DocumentCreateManyInputSchema: z.ZodType<Prisma.DocumentCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      fileUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
      projectId: z.string(),
    })
    .strict();

export const DocumentUpdateManyMutationInputSchema: z.ZodType<Prisma.DocumentUpdateManyMutationInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DocumentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SiteImageCreateInputSchema: z.ZodType<Prisma.SiteImageCreateInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      location: z.string(),
      category: z.lazy(() => CategorySchema),
      imageUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
      project: z.lazy(() => ProjectCreateNestedOneWithoutSiteImagesInputSchema),
    })
    .strict();

export const SiteImageUncheckedCreateInputSchema: z.ZodType<Prisma.SiteImageUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      location: z.string(),
      category: z.lazy(() => CategorySchema),
      imageUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
      projectId: z.string(),
    })
    .strict();

export const SiteImageUpdateInputSchema: z.ZodType<Prisma.SiteImageUpdateInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.lazy(() => CategorySchema),
          z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      project: z
        .lazy(() => ProjectUpdateOneRequiredWithoutSiteImagesNestedInputSchema)
        .optional(),
    })
    .strict();

export const SiteImageUncheckedUpdateInputSchema: z.ZodType<Prisma.SiteImageUncheckedUpdateInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.lazy(() => CategorySchema),
          z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SiteImageCreateManyInputSchema: z.ZodType<Prisma.SiteImageCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      location: z.string(),
      category: z.lazy(() => CategorySchema),
      imageUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
      projectId: z.string(),
    })
    .strict();

export const SiteImageUpdateManyMutationInputSchema: z.ZodType<Prisma.SiteImageUpdateManyMutationInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.lazy(() => CategorySchema),
          z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SiteImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SiteImageUncheckedUpdateManyInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.lazy(() => CategorySchema),
          z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterCreateInputSchema: z.ZodType<Prisma.OutgoingLetterCreateInput> =
  z
    .object({
      id: z.string().optional(),
      recipient: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => OutgoingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
      project: z.lazy(
        () => ProjectCreateNestedOneWithoutOutgoingLettersInputSchema
      ),
    })
    .strict();

export const OutgoingLetterUncheckedCreateInputSchema: z.ZodType<Prisma.OutgoingLetterUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      recipient: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => OutgoingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
      projectId: z.string(),
    })
    .strict();

export const OutgoingLetterUpdateInputSchema: z.ZodType<Prisma.OutgoingLetterUpdateInput> =
  z
    .object({
      recipient: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      project: z
        .lazy(
          () => ProjectUpdateOneRequiredWithoutOutgoingLettersNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const OutgoingLetterUncheckedUpdateInputSchema: z.ZodType<Prisma.OutgoingLetterUncheckedUpdateInput> =
  z
    .object({
      recipient: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterCreateManyInputSchema: z.ZodType<Prisma.OutgoingLetterCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      recipient: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => OutgoingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
      projectId: z.string(),
    })
    .strict();

export const OutgoingLetterUpdateManyMutationInputSchema: z.ZodType<Prisma.OutgoingLetterUpdateManyMutationInput> =
  z
    .object({
      recipient: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OutgoingLetterUncheckedUpdateManyInput> =
  z
    .object({
      recipient: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterCreateInputSchema: z.ZodType<Prisma.IncomingLetterCreateInput> =
  z
    .object({
      id: z.string().optional(),
      sender: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => IncomingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
      project: z.lazy(
        () => ProjectCreateNestedOneWithoutIncomingLettersInputSchema
      ),
    })
    .strict();

export const IncomingLetterUncheckedCreateInputSchema: z.ZodType<Prisma.IncomingLetterUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      sender: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => IncomingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
      projectId: z.string(),
    })
    .strict();

export const IncomingLetterUpdateInputSchema: z.ZodType<Prisma.IncomingLetterUpdateInput> =
  z
    .object({
      sender: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      project: z
        .lazy(
          () => ProjectUpdateOneRequiredWithoutIncomingLettersNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const IncomingLetterUncheckedUpdateInputSchema: z.ZodType<Prisma.IncomingLetterUncheckedUpdateInput> =
  z
    .object({
      sender: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterCreateManyInputSchema: z.ZodType<Prisma.IncomingLetterCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      sender: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => IncomingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
      projectId: z.string(),
    })
    .strict();

export const IncomingLetterUpdateManyMutationInputSchema: z.ZodType<Prisma.IncomingLetterUpdateManyMutationInput> =
  z
    .object({
      sender: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IncomingLetterUncheckedUpdateManyInput> =
  z
    .object({
      sender: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ReportCreateInputSchema: z.ZodType<Prisma.ReportCreateInput> = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    publisher: z.string(),
    reportType: z.lazy(() => ReportTypeSchema),
    version: z.string(),
    status: z.lazy(() => ReportStatusSchema),
    fileUrl: z.string(),
    fileName: z.string(),
    uploadedDate: z.coerce.date().optional(),
    project: z.lazy(() => ProjectCreateNestedOneWithoutReportsInputSchema),
  })
  .strict();

export const ReportUncheckedCreateInputSchema: z.ZodType<Prisma.ReportUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      publisher: z.string(),
      reportType: z.lazy(() => ReportTypeSchema),
      version: z.string(),
      status: z.lazy(() => ReportStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      uploadedDate: z.coerce.date().optional(),
      projectId: z.string(),
    })
    .strict();

export const ReportUpdateInputSchema: z.ZodType<Prisma.ReportUpdateInput> = z
  .object({
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    publisher: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    reportType: z
      .union([
        z.lazy(() => ReportTypeSchema),
        z.lazy(() => EnumReportTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    version: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([
        z.lazy(() => ReportStatusSchema),
        z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    fileUrl: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    fileName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    uploadedDate: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    project: z
      .lazy(() => ProjectUpdateOneRequiredWithoutReportsNestedInputSchema)
      .optional(),
  })
  .strict();

export const ReportUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      publisher: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      reportType: z
        .union([
          z.lazy(() => ReportTypeSchema),
          z.lazy(() => EnumReportTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => ReportStatusSchema),
          z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uploadedDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ReportCreateManyInputSchema: z.ZodType<Prisma.ReportCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      publisher: z.string(),
      reportType: z.lazy(() => ReportTypeSchema),
      version: z.string(),
      status: z.lazy(() => ReportStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      uploadedDate: z.coerce.date().optional(),
      projectId: z.string(),
    })
    .strict();

export const ReportUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportUpdateManyMutationInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      publisher: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      reportType: z
        .union([
          z.lazy(() => ReportTypeSchema),
          z.lazy(() => EnumReportTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => ReportStatusSchema),
          z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uploadedDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ReportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      publisher: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      reportType: z
        .union([
          z.lazy(() => ReportTypeSchema),
          z.lazy(() => EnumReportTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => ReportStatusSchema),
          z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uploadedDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      projectId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const BudgetNullableScalarRelationFilterSchema: z.ZodType<Prisma.BudgetNullableScalarRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => BudgetWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => BudgetWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const TeamNullableScalarRelationFilterSchema: z.ZodType<Prisma.TeamNullableScalarRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => TeamWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => TeamWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const MilestoneListRelationFilterSchema: z.ZodType<Prisma.MilestoneListRelationFilter> =
  z
    .object({
      every: z.lazy(() => MilestoneWhereInputSchema).optional(),
      some: z.lazy(() => MilestoneWhereInputSchema).optional(),
      none: z.lazy(() => MilestoneWhereInputSchema).optional(),
    })
    .strict();

export const ChecklistItemListRelationFilterSchema: z.ZodType<Prisma.ChecklistItemListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ChecklistItemWhereInputSchema).optional(),
      some: z.lazy(() => ChecklistItemWhereInputSchema).optional(),
      none: z.lazy(() => ChecklistItemWhereInputSchema).optional(),
    })
    .strict();

export const DocumentListRelationFilterSchema: z.ZodType<Prisma.DocumentListRelationFilter> =
  z
    .object({
      every: z.lazy(() => DocumentWhereInputSchema).optional(),
      some: z.lazy(() => DocumentWhereInputSchema).optional(),
      none: z.lazy(() => DocumentWhereInputSchema).optional(),
    })
    .strict();

export const OutgoingLetterListRelationFilterSchema: z.ZodType<Prisma.OutgoingLetterListRelationFilter> =
  z
    .object({
      every: z.lazy(() => OutgoingLetterWhereInputSchema).optional(),
      some: z.lazy(() => OutgoingLetterWhereInputSchema).optional(),
      none: z.lazy(() => OutgoingLetterWhereInputSchema).optional(),
    })
    .strict();

export const IncomingLetterListRelationFilterSchema: z.ZodType<Prisma.IncomingLetterListRelationFilter> =
  z
    .object({
      every: z.lazy(() => IncomingLetterWhereInputSchema).optional(),
      some: z.lazy(() => IncomingLetterWhereInputSchema).optional(),
      none: z.lazy(() => IncomingLetterWhereInputSchema).optional(),
    })
    .strict();

export const ReportListRelationFilterSchema: z.ZodType<Prisma.ReportListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ReportWhereInputSchema).optional(),
      some: z.lazy(() => ReportWhereInputSchema).optional(),
      none: z.lazy(() => ReportWhereInputSchema).optional(),
    })
    .strict();

export const SiteImageListRelationFilterSchema: z.ZodType<Prisma.SiteImageListRelationFilter> =
  z
    .object({
      every: z.lazy(() => SiteImageWhereInputSchema).optional(),
      some: z.lazy(() => SiteImageWhereInputSchema).optional(),
      none: z.lazy(() => SiteImageWhereInputSchema).optional(),
    })
    .strict();

export const MilestoneOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MilestoneOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ChecklistItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChecklistItemOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DocumentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DocumentOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const OutgoingLetterOrderByRelationAggregateInputSchema: z.ZodType<Prisma.OutgoingLetterOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IncomingLetterOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IncomingLetterOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ReportOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReportOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SiteImageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SiteImageOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      projectName: z.lazy(() => SortOrderSchema).optional(),
      clientName: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      startDate: z.lazy(() => SortOrderSchema).optional(),
      endDate: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      projectName: z.lazy(() => SortOrderSchema).optional(),
      clientName: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      startDate: z.lazy(() => SortOrderSchema).optional(),
      endDate: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      projectName: z.lazy(() => SortOrderSchema).optional(),
      clientName: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      startDate: z.lazy(() => SortOrderSchema).optional(),
      endDate: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const ProjectScalarRelationFilterSchema: z.ZodType<Prisma.ProjectScalarRelationFilter> =
  z
    .object({
      is: z.lazy(() => ProjectWhereInputSchema).optional(),
      isNot: z.lazy(() => ProjectWhereInputSchema).optional(),
    })
    .strict();

export const BudgetCountOrderByAggregateInputSchema: z.ZodType<Prisma.BudgetCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      total: z.lazy(() => SortOrderSchema).optional(),
      spent: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BudgetAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BudgetAvgOrderByAggregateInput> =
  z
    .object({
      total: z.lazy(() => SortOrderSchema).optional(),
      spent: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BudgetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BudgetMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      total: z.lazy(() => SortOrderSchema).optional(),
      spent: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BudgetMinOrderByAggregateInputSchema: z.ZodType<Prisma.BudgetMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      total: z.lazy(() => SortOrderSchema).optional(),
      spent: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BudgetSumOrderByAggregateInputSchema: z.ZodType<Prisma.BudgetSumOrderByAggregateInput> =
  z
    .object({
      total: z.lazy(() => SortOrderSchema).optional(),
      spent: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedFloatWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
      _min: z.lazy(() => NestedFloatFilterSchema).optional(),
      _max: z.lazy(() => NestedFloatFilterSchema).optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const TeamCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeamCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      projectManager: z.lazy(() => SortOrderSchema).optional(),
      siteManager: z.lazy(() => SortOrderSchema).optional(),
      civilManager: z.lazy(() => SortOrderSchema).optional(),
      architecturalLead: z.lazy(() => SortOrderSchema).optional(),
      totalWorkers: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TeamAvgOrderByAggregateInput> =
  z
    .object({
      totalWorkers: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      projectManager: z.lazy(() => SortOrderSchema).optional(),
      siteManager: z.lazy(() => SortOrderSchema).optional(),
      civilManager: z.lazy(() => SortOrderSchema).optional(),
      architecturalLead: z.lazy(() => SortOrderSchema).optional(),
      totalWorkers: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      projectManager: z.lazy(() => SortOrderSchema).optional(),
      siteManager: z.lazy(() => SortOrderSchema).optional(),
      civilManager: z.lazy(() => SortOrderSchema).optional(),
      architecturalLead: z.lazy(() => SortOrderSchema).optional(),
      totalWorkers: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamSumOrderByAggregateInputSchema: z.ZodType<Prisma.TeamSumOrderByAggregateInput> =
  z
    .object({
      totalWorkers: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const EnumStatusFilterSchema: z.ZodType<Prisma.EnumStatusFilter> = z
  .object({
    equals: z.lazy(() => StatusSchema).optional(),
    in: z
      .lazy(() => StatusSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusSchema),
        z.lazy(() => NestedEnumStatusFilterSchema),
      ])
      .optional(),
  })
  .strict();

export const MilestoneCountOrderByAggregateInputSchema: z.ZodType<Prisma.MilestoneCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MilestoneMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MilestoneMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MilestoneMinOrderByAggregateInputSchema: z.ZodType<Prisma.MilestoneMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => StatusSchema).optional(),
      in: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
    })
    .strict();

export const EnumPriorityFilterSchema: z.ZodType<Prisma.EnumPriorityFilter> = z
  .object({
    equals: z.lazy(() => PrioritySchema).optional(),
    in: z
      .lazy(() => PrioritySchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => PrioritySchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => PrioritySchema),
        z.lazy(() => NestedEnumPriorityFilterSchema),
      ])
      .optional(),
  })
  .strict();

export const ChecklistItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChecklistItemCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      task: z.lazy(() => SortOrderSchema).optional(),
      assignedTo: z.lazy(() => SortOrderSchema).optional(),
      dueDate: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      milestoneId: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ChecklistItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChecklistItemMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      task: z.lazy(() => SortOrderSchema).optional(),
      assignedTo: z.lazy(() => SortOrderSchema).optional(),
      dueDate: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      milestoneId: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ChecklistItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChecklistItemMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      task: z.lazy(() => SortOrderSchema).optional(),
      assignedTo: z.lazy(() => SortOrderSchema).optional(),
      dueDate: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      milestoneId: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPriorityWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => PrioritySchema).optional(),
      in: z
        .lazy(() => PrioritySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PrioritySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => NestedEnumPriorityWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumPriorityFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumPriorityFilterSchema).optional(),
    })
    .strict();

export const DocumentCountOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DocumentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DocumentMinOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumCategoryFilterSchema: z.ZodType<Prisma.EnumCategoryFilter> = z
  .object({
    equals: z.lazy(() => CategorySchema).optional(),
    in: z
      .lazy(() => CategorySchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => CategorySchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => CategorySchema),
        z.lazy(() => NestedEnumCategoryFilterSchema),
      ])
      .optional(),
  })
  .strict();

export const SiteImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.SiteImageCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      category: z.lazy(() => SortOrderSchema).optional(),
      imageUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SiteImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SiteImageMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      category: z.lazy(() => SortOrderSchema).optional(),
      imageUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SiteImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.SiteImageMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      category: z.lazy(() => SortOrderSchema).optional(),
      imageUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumCategoryWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCategoryWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => CategorySchema).optional(),
      in: z
        .lazy(() => CategorySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => CategorySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => CategorySchema),
          z.lazy(() => NestedEnumCategoryWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumCategoryFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumCategoryFilterSchema).optional(),
    })
    .strict();

export const EnumOutgoingStatusFilterSchema: z.ZodType<Prisma.EnumOutgoingStatusFilter> =
  z
    .object({
      equals: z.lazy(() => OutgoingStatusSchema).optional(),
      in: z
        .lazy(() => OutgoingStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => OutgoingStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => NestedEnumOutgoingStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterCountOrderByAggregateInputSchema: z.ZodType<Prisma.OutgoingLetterCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      recipient: z.lazy(() => SortOrderSchema).optional(),
      subject: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const OutgoingLetterMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OutgoingLetterMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      recipient: z.lazy(() => SortOrderSchema).optional(),
      subject: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const OutgoingLetterMinOrderByAggregateInputSchema: z.ZodType<Prisma.OutgoingLetterMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      recipient: z.lazy(() => SortOrderSchema).optional(),
      subject: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumOutgoingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumOutgoingStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => OutgoingStatusSchema).optional(),
      in: z
        .lazy(() => OutgoingStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => OutgoingStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => NestedEnumOutgoingStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumOutgoingStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumOutgoingStatusFilterSchema).optional(),
    })
    .strict();

export const EnumIncomingStatusFilterSchema: z.ZodType<Prisma.EnumIncomingStatusFilter> =
  z
    .object({
      equals: z.lazy(() => IncomingStatusSchema).optional(),
      in: z
        .lazy(() => IncomingStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => IncomingStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => NestedEnumIncomingStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterCountOrderByAggregateInputSchema: z.ZodType<Prisma.IncomingLetterCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sender: z.lazy(() => SortOrderSchema).optional(),
      subject: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IncomingLetterMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IncomingLetterMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sender: z.lazy(() => SortOrderSchema).optional(),
      subject: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IncomingLetterMinOrderByAggregateInputSchema: z.ZodType<Prisma.IncomingLetterMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sender: z.lazy(() => SortOrderSchema).optional(),
      subject: z.lazy(() => SortOrderSchema).optional(),
      priority: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumIncomingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumIncomingStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => IncomingStatusSchema).optional(),
      in: z
        .lazy(() => IncomingStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => IncomingStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => NestedEnumIncomingStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumIncomingStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumIncomingStatusFilterSchema).optional(),
    })
    .strict();

export const EnumReportTypeFilterSchema: z.ZodType<Prisma.EnumReportTypeFilter> =
  z
    .object({
      equals: z.lazy(() => ReportTypeSchema).optional(),
      in: z
        .lazy(() => ReportTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ReportTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ReportTypeSchema),
          z.lazy(() => NestedEnumReportTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const EnumReportStatusFilterSchema: z.ZodType<Prisma.EnumReportStatusFilter> =
  z
    .object({
      equals: z.lazy(() => ReportStatusSchema).optional(),
      in: z
        .lazy(() => ReportStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ReportStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ReportStatusSchema),
          z.lazy(() => NestedEnumReportStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const ReportCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      publisher: z.lazy(() => SortOrderSchema).optional(),
      reportType: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      uploadedDate: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ReportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      publisher: z.lazy(() => SortOrderSchema).optional(),
      reportType: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      uploadedDate: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ReportMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      publisher: z.lazy(() => SortOrderSchema).optional(),
      reportType: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      fileUrl: z.lazy(() => SortOrderSchema).optional(),
      fileName: z.lazy(() => SortOrderSchema).optional(),
      uploadedDate: z.lazy(() => SortOrderSchema).optional(),
      projectId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumReportTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReportTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => ReportTypeSchema).optional(),
      in: z
        .lazy(() => ReportTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ReportTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ReportTypeSchema),
          z.lazy(() => NestedEnumReportTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumReportTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumReportTypeFilterSchema).optional(),
    })
    .strict();

export const EnumReportStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReportStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => ReportStatusSchema).optional(),
      in: z
        .lazy(() => ReportStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ReportStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ReportStatusSchema),
          z.lazy(() => NestedEnumReportStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumReportStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumReportStatusFilterSchema).optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const BudgetCreateNestedOneWithoutProjectInputSchema: z.ZodType<Prisma.BudgetCreateNestedOneWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BudgetCreateWithoutProjectInputSchema),
          z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema)
        .optional(),
      connect: z.lazy(() => BudgetWhereUniqueInputSchema).optional(),
    })
    .strict();

export const TeamCreateNestedOneWithoutProjectInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeamCreateWithoutProjectInputSchema),
          z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TeamCreateOrConnectWithoutProjectInputSchema)
        .optional(),
      connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
    })
    .strict();

export const MilestoneCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MilestoneCreateWithoutProjectInputSchema),
          z.lazy(() => MilestoneCreateWithoutProjectInputSchema).array(),
          z.lazy(() => MilestoneUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MilestoneCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MilestoneCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MilestoneWhereUniqueInputSchema),
          z.lazy(() => MilestoneWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ChecklistItemCreateWithoutProjectInputSchema),
          z.lazy(() => ChecklistItemCreateWithoutProjectInputSchema).array(),
          z.lazy(() => ChecklistItemUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => ChecklistItemUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ChecklistItemCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => ChecklistItemCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ChecklistItemCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ChecklistItemWhereUniqueInputSchema),
          z.lazy(() => ChecklistItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DocumentCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DocumentCreateWithoutProjectInputSchema),
          z.lazy(() => DocumentCreateWithoutProjectInputSchema).array(),
          z.lazy(() => DocumentUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => DocumentUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DocumentCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => DocumentCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DocumentCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DocumentWhereUniqueInputSchema),
          z.lazy(() => DocumentWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => OutgoingLetterCreateWithoutProjectInputSchema),
          z.lazy(() => OutgoingLetterCreateWithoutProjectInputSchema).array(),
          z.lazy(() => OutgoingLetterUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => OutgoingLetterUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => OutgoingLetterCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => OutgoingLetterCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => OutgoingLetterCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IncomingLetterCreateWithoutProjectInputSchema),
          z.lazy(() => IncomingLetterCreateWithoutProjectInputSchema).array(),
          z.lazy(() => IncomingLetterUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => IncomingLetterUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IncomingLetterCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => IncomingLetterCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IncomingLetterCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => IncomingLetterWhereUniqueInputSchema),
          z.lazy(() => IncomingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ReportCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ReportCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ReportCreateWithoutProjectInputSchema),
          z.lazy(() => ReportCreateWithoutProjectInputSchema).array(),
          z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),
          z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema),
          z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ReportCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ReportWhereUniqueInputSchema),
          z.lazy(() => ReportWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SiteImageCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SiteImageCreateWithoutProjectInputSchema),
          z.lazy(() => SiteImageCreateWithoutProjectInputSchema).array(),
          z.lazy(() => SiteImageUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SiteImageCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SiteImageCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SiteImageWhereUniqueInputSchema),
          z.lazy(() => SiteImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const BudgetUncheckedCreateNestedOneWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUncheckedCreateNestedOneWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BudgetCreateWithoutProjectInputSchema),
          z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema)
        .optional(),
      connect: z.lazy(() => BudgetWhereUniqueInputSchema).optional(),
    })
    .strict();

export const TeamUncheckedCreateNestedOneWithoutProjectInputSchema: z.ZodType<Prisma.TeamUncheckedCreateNestedOneWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeamCreateWithoutProjectInputSchema),
          z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TeamCreateOrConnectWithoutProjectInputSchema)
        .optional(),
      connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
    })
    .strict();

export const MilestoneUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneUncheckedCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MilestoneCreateWithoutProjectInputSchema),
          z.lazy(() => MilestoneCreateWithoutProjectInputSchema).array(),
          z.lazy(() => MilestoneUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MilestoneCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MilestoneCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MilestoneWhereUniqueInputSchema),
          z.lazy(() => MilestoneWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemUncheckedCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ChecklistItemCreateWithoutProjectInputSchema),
          z.lazy(() => ChecklistItemCreateWithoutProjectInputSchema).array(),
          z.lazy(() => ChecklistItemUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => ChecklistItemUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ChecklistItemCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => ChecklistItemCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ChecklistItemCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ChecklistItemWhereUniqueInputSchema),
          z.lazy(() => ChecklistItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DocumentUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DocumentCreateWithoutProjectInputSchema),
          z.lazy(() => DocumentCreateWithoutProjectInputSchema).array(),
          z.lazy(() => DocumentUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => DocumentUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DocumentCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => DocumentCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DocumentCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DocumentWhereUniqueInputSchema),
          z.lazy(() => DocumentWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterUncheckedCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => OutgoingLetterCreateWithoutProjectInputSchema),
          z.lazy(() => OutgoingLetterCreateWithoutProjectInputSchema).array(),
          z.lazy(() => OutgoingLetterUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => OutgoingLetterUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => OutgoingLetterCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => OutgoingLetterCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => OutgoingLetterCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterUncheckedCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IncomingLetterCreateWithoutProjectInputSchema),
          z.lazy(() => IncomingLetterCreateWithoutProjectInputSchema).array(),
          z.lazy(() => IncomingLetterUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => IncomingLetterUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IncomingLetterCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => IncomingLetterCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IncomingLetterCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => IncomingLetterWhereUniqueInputSchema),
          z.lazy(() => IncomingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ReportUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ReportUncheckedCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ReportCreateWithoutProjectInputSchema),
          z.lazy(() => ReportCreateWithoutProjectInputSchema).array(),
          z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),
          z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema),
          z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ReportCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ReportWhereUniqueInputSchema),
          z.lazy(() => ReportWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SiteImageUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageUncheckedCreateNestedManyWithoutProjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SiteImageCreateWithoutProjectInputSchema),
          z.lazy(() => SiteImageCreateWithoutProjectInputSchema).array(),
          z.lazy(() => SiteImageUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SiteImageCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SiteImageCreateManyProjectInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SiteImageWhereUniqueInputSchema),
          z.lazy(() => SiteImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const BudgetUpdateOneWithoutProjectNestedInputSchema: z.ZodType<Prisma.BudgetUpdateOneWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BudgetCreateWithoutProjectInputSchema),
          z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema)
        .optional(),
      upsert: z.lazy(() => BudgetUpsertWithoutProjectInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => BudgetWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => BudgetWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => BudgetWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => BudgetUpdateToOneWithWhereWithoutProjectInputSchema),
          z.lazy(() => BudgetUpdateWithoutProjectInputSchema),
          z.lazy(() => BudgetUncheckedUpdateWithoutProjectInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeamUpdateOneWithoutProjectNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeamCreateWithoutProjectInputSchema),
          z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TeamCreateOrConnectWithoutProjectInputSchema)
        .optional(),
      upsert: z.lazy(() => TeamUpsertWithoutProjectInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => TeamWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => TeamWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => TeamUpdateToOneWithWhereWithoutProjectInputSchema),
          z.lazy(() => TeamUpdateWithoutProjectInputSchema),
          z.lazy(() => TeamUncheckedUpdateWithoutProjectInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MilestoneUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.MilestoneUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MilestoneCreateWithoutProjectInputSchema),
          z.lazy(() => MilestoneCreateWithoutProjectInputSchema).array(),
          z.lazy(() => MilestoneUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MilestoneCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MilestoneUpsertWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneUpsertWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MilestoneCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MilestoneWhereUniqueInputSchema),
          z.lazy(() => MilestoneWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MilestoneWhereUniqueInputSchema),
          z.lazy(() => MilestoneWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MilestoneWhereUniqueInputSchema),
          z.lazy(() => MilestoneWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MilestoneWhereUniqueInputSchema),
          z.lazy(() => MilestoneWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MilestoneUpdateWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneUpdateWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MilestoneUpdateManyWithWhereWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneUpdateManyWithWhereWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MilestoneScalarWhereInputSchema),
          z.lazy(() => MilestoneScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ChecklistItemUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ChecklistItemCreateWithoutProjectInputSchema),
          z.lazy(() => ChecklistItemCreateWithoutProjectInputSchema).array(),
          z.lazy(() => ChecklistItemUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => ChecklistItemUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ChecklistItemCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => ChecklistItemCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ChecklistItemUpsertWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => ChecklistItemUpsertWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ChecklistItemCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ChecklistItemWhereUniqueInputSchema),
          z.lazy(() => ChecklistItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ChecklistItemWhereUniqueInputSchema),
          z.lazy(() => ChecklistItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ChecklistItemWhereUniqueInputSchema),
          z.lazy(() => ChecklistItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ChecklistItemWhereUniqueInputSchema),
          z.lazy(() => ChecklistItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ChecklistItemUpdateWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => ChecklistItemUpdateWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ChecklistItemUpdateManyWithWhereWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => ChecklistItemUpdateManyWithWhereWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ChecklistItemScalarWhereInputSchema),
          z.lazy(() => ChecklistItemScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DocumentUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DocumentCreateWithoutProjectInputSchema),
          z.lazy(() => DocumentCreateWithoutProjectInputSchema).array(),
          z.lazy(() => DocumentUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => DocumentUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DocumentCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => DocumentCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => DocumentUpsertWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => DocumentUpsertWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DocumentCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => DocumentWhereUniqueInputSchema),
          z.lazy(() => DocumentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DocumentWhereUniqueInputSchema),
          z.lazy(() => DocumentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DocumentWhereUniqueInputSchema),
          z.lazy(() => DocumentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DocumentWhereUniqueInputSchema),
          z.lazy(() => DocumentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => DocumentUpdateWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => DocumentUpdateWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => DocumentUpdateManyWithWhereWithoutProjectInputSchema),
          z
            .lazy(() => DocumentUpdateManyWithWhereWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DocumentScalarWhereInputSchema),
          z.lazy(() => DocumentScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.OutgoingLetterUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => OutgoingLetterCreateWithoutProjectInputSchema),
          z.lazy(() => OutgoingLetterCreateWithoutProjectInputSchema).array(),
          z.lazy(() => OutgoingLetterUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => OutgoingLetterUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => OutgoingLetterCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => OutgoingLetterCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => OutgoingLetterUpsertWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => OutgoingLetterUpsertWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => OutgoingLetterCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => OutgoingLetterUpdateWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => OutgoingLetterUpdateWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => OutgoingLetterUpdateManyWithWhereWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => OutgoingLetterUpdateManyWithWhereWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => OutgoingLetterScalarWhereInputSchema),
          z.lazy(() => OutgoingLetterScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.IncomingLetterUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IncomingLetterCreateWithoutProjectInputSchema),
          z.lazy(() => IncomingLetterCreateWithoutProjectInputSchema).array(),
          z.lazy(() => IncomingLetterUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => IncomingLetterUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IncomingLetterCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => IncomingLetterCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => IncomingLetterUpsertWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => IncomingLetterUpsertWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IncomingLetterCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => IncomingLetterWhereUniqueInputSchema),
          z.lazy(() => IncomingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => IncomingLetterWhereUniqueInputSchema),
          z.lazy(() => IncomingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => IncomingLetterWhereUniqueInputSchema),
          z.lazy(() => IncomingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => IncomingLetterWhereUniqueInputSchema),
          z.lazy(() => IncomingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => IncomingLetterUpdateWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => IncomingLetterUpdateWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => IncomingLetterUpdateManyWithWhereWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => IncomingLetterUpdateManyWithWhereWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => IncomingLetterScalarWhereInputSchema),
          z.lazy(() => IncomingLetterScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ReportUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ReportUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ReportCreateWithoutProjectInputSchema),
          z.lazy(() => ReportCreateWithoutProjectInputSchema).array(),
          z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),
          z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema),
          z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ReportUpsertWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => ReportUpsertWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ReportCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ReportWhereUniqueInputSchema),
          z.lazy(() => ReportWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ReportWhereUniqueInputSchema),
          z.lazy(() => ReportWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ReportWhereUniqueInputSchema),
          z.lazy(() => ReportWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ReportWhereUniqueInputSchema),
          z.lazy(() => ReportWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ReportUpdateWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => ReportUpdateWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ReportUpdateManyWithWhereWithoutProjectInputSchema),
          z
            .lazy(() => ReportUpdateManyWithWhereWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ReportScalarWhereInputSchema),
          z.lazy(() => ReportScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SiteImageUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.SiteImageUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SiteImageCreateWithoutProjectInputSchema),
          z.lazy(() => SiteImageCreateWithoutProjectInputSchema).array(),
          z.lazy(() => SiteImageUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SiteImageCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SiteImageUpsertWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageUpsertWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SiteImageCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SiteImageWhereUniqueInputSchema),
          z.lazy(() => SiteImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SiteImageWhereUniqueInputSchema),
          z.lazy(() => SiteImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SiteImageWhereUniqueInputSchema),
          z.lazy(() => SiteImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SiteImageWhereUniqueInputSchema),
          z.lazy(() => SiteImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SiteImageUpdateWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageUpdateWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SiteImageUpdateManyWithWhereWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageUpdateManyWithWhereWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SiteImageScalarWhereInputSchema),
          z.lazy(() => SiteImageScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const BudgetUncheckedUpdateOneWithoutProjectNestedInputSchema: z.ZodType<Prisma.BudgetUncheckedUpdateOneWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BudgetCreateWithoutProjectInputSchema),
          z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema)
        .optional(),
      upsert: z.lazy(() => BudgetUpsertWithoutProjectInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => BudgetWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => BudgetWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => BudgetWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => BudgetUpdateToOneWithWhereWithoutProjectInputSchema),
          z.lazy(() => BudgetUpdateWithoutProjectInputSchema),
          z.lazy(() => BudgetUncheckedUpdateWithoutProjectInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeamUncheckedUpdateOneWithoutProjectNestedInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateOneWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeamCreateWithoutProjectInputSchema),
          z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TeamCreateOrConnectWithoutProjectInputSchema)
        .optional(),
      upsert: z.lazy(() => TeamUpsertWithoutProjectInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => TeamWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => TeamWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => TeamUpdateToOneWithWhereWithoutProjectInputSchema),
          z.lazy(() => TeamUpdateWithoutProjectInputSchema),
          z.lazy(() => TeamUncheckedUpdateWithoutProjectInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MilestoneUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.MilestoneUncheckedUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MilestoneCreateWithoutProjectInputSchema),
          z.lazy(() => MilestoneCreateWithoutProjectInputSchema).array(),
          z.lazy(() => MilestoneUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MilestoneCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MilestoneUpsertWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneUpsertWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MilestoneCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MilestoneWhereUniqueInputSchema),
          z.lazy(() => MilestoneWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MilestoneWhereUniqueInputSchema),
          z.lazy(() => MilestoneWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MilestoneWhereUniqueInputSchema),
          z.lazy(() => MilestoneWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MilestoneWhereUniqueInputSchema),
          z.lazy(() => MilestoneWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MilestoneUpdateWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneUpdateWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MilestoneUpdateManyWithWhereWithoutProjectInputSchema),
          z
            .lazy(() => MilestoneUpdateManyWithWhereWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MilestoneScalarWhereInputSchema),
          z.lazy(() => MilestoneScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ChecklistItemUncheckedUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ChecklistItemCreateWithoutProjectInputSchema),
          z.lazy(() => ChecklistItemCreateWithoutProjectInputSchema).array(),
          z.lazy(() => ChecklistItemUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => ChecklistItemUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ChecklistItemCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => ChecklistItemCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ChecklistItemUpsertWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => ChecklistItemUpsertWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ChecklistItemCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ChecklistItemWhereUniqueInputSchema),
          z.lazy(() => ChecklistItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ChecklistItemWhereUniqueInputSchema),
          z.lazy(() => ChecklistItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ChecklistItemWhereUniqueInputSchema),
          z.lazy(() => ChecklistItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ChecklistItemWhereUniqueInputSchema),
          z.lazy(() => ChecklistItemWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ChecklistItemUpdateWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => ChecklistItemUpdateWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ChecklistItemUpdateManyWithWhereWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => ChecklistItemUpdateManyWithWhereWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ChecklistItemScalarWhereInputSchema),
          z.lazy(() => ChecklistItemScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DocumentUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DocumentCreateWithoutProjectInputSchema),
          z.lazy(() => DocumentCreateWithoutProjectInputSchema).array(),
          z.lazy(() => DocumentUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => DocumentUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DocumentCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => DocumentCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => DocumentUpsertWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => DocumentUpsertWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DocumentCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => DocumentWhereUniqueInputSchema),
          z.lazy(() => DocumentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DocumentWhereUniqueInputSchema),
          z.lazy(() => DocumentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DocumentWhereUniqueInputSchema),
          z.lazy(() => DocumentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DocumentWhereUniqueInputSchema),
          z.lazy(() => DocumentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => DocumentUpdateWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => DocumentUpdateWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => DocumentUpdateManyWithWhereWithoutProjectInputSchema),
          z
            .lazy(() => DocumentUpdateManyWithWhereWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DocumentScalarWhereInputSchema),
          z.lazy(() => DocumentScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => OutgoingLetterCreateWithoutProjectInputSchema),
          z.lazy(() => OutgoingLetterCreateWithoutProjectInputSchema).array(),
          z.lazy(() => OutgoingLetterUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => OutgoingLetterUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => OutgoingLetterCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => OutgoingLetterCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => OutgoingLetterUpsertWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => OutgoingLetterUpsertWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => OutgoingLetterCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
          z.lazy(() => OutgoingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => OutgoingLetterUpdateWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => OutgoingLetterUpdateWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => OutgoingLetterUpdateManyWithWhereWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => OutgoingLetterUpdateManyWithWhereWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => OutgoingLetterScalarWhereInputSchema),
          z.lazy(() => OutgoingLetterScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.IncomingLetterUncheckedUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IncomingLetterCreateWithoutProjectInputSchema),
          z.lazy(() => IncomingLetterCreateWithoutProjectInputSchema).array(),
          z.lazy(() => IncomingLetterUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => IncomingLetterUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IncomingLetterCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => IncomingLetterCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => IncomingLetterUpsertWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => IncomingLetterUpsertWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IncomingLetterCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => IncomingLetterWhereUniqueInputSchema),
          z.lazy(() => IncomingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => IncomingLetterWhereUniqueInputSchema),
          z.lazy(() => IncomingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => IncomingLetterWhereUniqueInputSchema),
          z.lazy(() => IncomingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => IncomingLetterWhereUniqueInputSchema),
          z.lazy(() => IncomingLetterWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => IncomingLetterUpdateWithWhereUniqueWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => IncomingLetterUpdateWithWhereUniqueWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => IncomingLetterUpdateManyWithWhereWithoutProjectInputSchema
          ),
          z
            .lazy(
              () => IncomingLetterUpdateManyWithWhereWithoutProjectInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => IncomingLetterScalarWhereInputSchema),
          z.lazy(() => IncomingLetterScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ReportUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ReportCreateWithoutProjectInputSchema),
          z.lazy(() => ReportCreateWithoutProjectInputSchema).array(),
          z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),
          z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema),
          z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ReportUpsertWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => ReportUpsertWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ReportCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ReportWhereUniqueInputSchema),
          z.lazy(() => ReportWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ReportWhereUniqueInputSchema),
          z.lazy(() => ReportWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ReportWhereUniqueInputSchema),
          z.lazy(() => ReportWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ReportWhereUniqueInputSchema),
          z.lazy(() => ReportWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ReportUpdateWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => ReportUpdateWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ReportUpdateManyWithWhereWithoutProjectInputSchema),
          z
            .lazy(() => ReportUpdateManyWithWhereWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ReportScalarWhereInputSchema),
          z.lazy(() => ReportScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.SiteImageUncheckedUpdateManyWithoutProjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SiteImageCreateWithoutProjectInputSchema),
          z.lazy(() => SiteImageCreateWithoutProjectInputSchema).array(),
          z.lazy(() => SiteImageUncheckedCreateWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageUncheckedCreateWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SiteImageCreateOrConnectWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageCreateOrConnectWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SiteImageUpsertWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageUpsertWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SiteImageCreateManyProjectInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SiteImageWhereUniqueInputSchema),
          z.lazy(() => SiteImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SiteImageWhereUniqueInputSchema),
          z.lazy(() => SiteImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SiteImageWhereUniqueInputSchema),
          z.lazy(() => SiteImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SiteImageWhereUniqueInputSchema),
          z.lazy(() => SiteImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SiteImageUpdateWithWhereUniqueWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageUpdateWithWhereUniqueWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SiteImageUpdateManyWithWhereWithoutProjectInputSchema),
          z
            .lazy(() => SiteImageUpdateManyWithWhereWithoutProjectInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SiteImageScalarWhereInputSchema),
          z.lazy(() => SiteImageScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ProjectCreateNestedOneWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutBudgetInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutBudgetInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutBudgetInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutBudgetInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
    })
    .strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const ProjectUpdateOneRequiredWithoutBudgetNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutBudgetNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutBudgetInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutBudgetInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutBudgetInputSchema)
        .optional(),
      upsert: z.lazy(() => ProjectUpsertWithoutBudgetInputSchema).optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProjectUpdateToOneWithWhereWithoutBudgetInputSchema),
          z.lazy(() => ProjectUpdateWithoutBudgetInputSchema),
          z.lazy(() => ProjectUncheckedUpdateWithoutBudgetInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProjectCreateNestedOneWithoutTeamInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutTeamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutTeamInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutTeamInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutTeamInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const ProjectUpdateOneRequiredWithoutTeamNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutTeamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutTeamInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutTeamInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutTeamInputSchema)
        .optional(),
      upsert: z.lazy(() => ProjectUpsertWithoutTeamInputSchema).optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProjectUpdateToOneWithWhereWithoutTeamInputSchema),
          z.lazy(() => ProjectUpdateWithoutTeamInputSchema),
          z.lazy(() => ProjectUncheckedUpdateWithoutTeamInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProjectCreateNestedOneWithoutMilestonesInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutMilestonesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutMilestonesInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutMilestonesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutMilestonesInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => StatusSchema).optional(),
    })
    .strict();

export const ProjectUpdateOneRequiredWithoutMilestonesNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutMilestonesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutMilestonesInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutMilestonesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutMilestonesInputSchema)
        .optional(),
      upsert: z
        .lazy(() => ProjectUpsertWithoutMilestonesInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProjectUpdateToOneWithWhereWithoutMilestonesInputSchema),
          z.lazy(() => ProjectUpdateWithoutMilestonesInputSchema),
          z.lazy(() => ProjectUncheckedUpdateWithoutMilestonesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProjectCreateNestedOneWithoutChecklistInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutChecklistInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutChecklistInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutChecklistInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutChecklistInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumPriorityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPriorityFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => PrioritySchema).optional(),
    })
    .strict();

export const ProjectUpdateOneRequiredWithoutChecklistNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutChecklistNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutChecklistInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutChecklistInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutChecklistInputSchema)
        .optional(),
      upsert: z.lazy(() => ProjectUpsertWithoutChecklistInputSchema).optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProjectUpdateToOneWithWhereWithoutChecklistInputSchema),
          z.lazy(() => ProjectUpdateWithoutChecklistInputSchema),
          z.lazy(() => ProjectUncheckedUpdateWithoutChecklistInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProjectCreateNestedOneWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutDocumentsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutDocumentsInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutDocumentsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutDocumentsInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
    })
    .strict();

export const ProjectUpdateOneRequiredWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutDocumentsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutDocumentsInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutDocumentsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutDocumentsInputSchema)
        .optional(),
      upsert: z.lazy(() => ProjectUpsertWithoutDocumentsInputSchema).optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProjectUpdateToOneWithWhereWithoutDocumentsInputSchema),
          z.lazy(() => ProjectUpdateWithoutDocumentsInputSchema),
          z.lazy(() => ProjectUncheckedUpdateWithoutDocumentsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProjectCreateNestedOneWithoutSiteImagesInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutSiteImagesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutSiteImagesInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutSiteImagesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutSiteImagesInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumCategoryFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCategoryFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => CategorySchema).optional(),
    })
    .strict();

export const ProjectUpdateOneRequiredWithoutSiteImagesNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutSiteImagesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutSiteImagesInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutSiteImagesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutSiteImagesInputSchema)
        .optional(),
      upsert: z
        .lazy(() => ProjectUpsertWithoutSiteImagesInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProjectUpdateToOneWithWhereWithoutSiteImagesInputSchema),
          z.lazy(() => ProjectUpdateWithoutSiteImagesInputSchema),
          z.lazy(() => ProjectUncheckedUpdateWithoutSiteImagesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProjectCreateNestedOneWithoutOutgoingLettersInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutOutgoingLettersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutOutgoingLettersInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutOutgoingLettersInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutOutgoingLettersInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumOutgoingStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumOutgoingStatusFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => OutgoingStatusSchema).optional(),
    })
    .strict();

export const ProjectUpdateOneRequiredWithoutOutgoingLettersNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutOutgoingLettersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutOutgoingLettersInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutOutgoingLettersInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutOutgoingLettersInputSchema)
        .optional(),
      upsert: z
        .lazy(() => ProjectUpsertWithoutOutgoingLettersInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => ProjectUpdateToOneWithWhereWithoutOutgoingLettersInputSchema
          ),
          z.lazy(() => ProjectUpdateWithoutOutgoingLettersInputSchema),
          z.lazy(() => ProjectUncheckedUpdateWithoutOutgoingLettersInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProjectCreateNestedOneWithoutIncomingLettersInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutIncomingLettersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutIncomingLettersInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutIncomingLettersInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutIncomingLettersInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumIncomingStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumIncomingStatusFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => IncomingStatusSchema).optional(),
    })
    .strict();

export const ProjectUpdateOneRequiredWithoutIncomingLettersNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutIncomingLettersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutIncomingLettersInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutIncomingLettersInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutIncomingLettersInputSchema)
        .optional(),
      upsert: z
        .lazy(() => ProjectUpsertWithoutIncomingLettersInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => ProjectUpdateToOneWithWhereWithoutIncomingLettersInputSchema
          ),
          z.lazy(() => ProjectUpdateWithoutIncomingLettersInputSchema),
          z.lazy(() => ProjectUncheckedUpdateWithoutIncomingLettersInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProjectCreateNestedOneWithoutReportsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutReportsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutReportsInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutReportsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutReportsInputSchema)
        .optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumReportTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReportTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => ReportTypeSchema).optional(),
    })
    .strict();

export const EnumReportStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReportStatusFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => ReportStatusSchema).optional(),
    })
    .strict();

export const ProjectUpdateOneRequiredWithoutReportsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutReportsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProjectCreateWithoutReportsInputSchema),
          z.lazy(() => ProjectUncheckedCreateWithoutReportsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ProjectCreateOrConnectWithoutReportsInputSchema)
        .optional(),
      upsert: z.lazy(() => ProjectUpsertWithoutReportsInputSchema).optional(),
      connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProjectUpdateToOneWithWhereWithoutReportsInputSchema),
          z.lazy(() => ProjectUpdateWithoutReportsInputSchema),
          z.lazy(() => ProjectUncheckedUpdateWithoutReportsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedFloatWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
      _min: z.lazy(() => NestedFloatFilterSchema).optional(),
      _max: z.lazy(() => NestedFloatFilterSchema).optional(),
    })
    .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedEnumStatusFilterSchema: z.ZodType<Prisma.NestedEnumStatusFilter> =
  z
    .object({
      equals: z.lazy(() => StatusSchema).optional(),
      in: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => NestedEnumStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => StatusSchema).optional(),
      in: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => StatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
    })
    .strict();

export const NestedEnumPriorityFilterSchema: z.ZodType<Prisma.NestedEnumPriorityFilter> =
  z
    .object({
      equals: z.lazy(() => PrioritySchema).optional(),
      in: z
        .lazy(() => PrioritySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PrioritySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => NestedEnumPriorityFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPriorityWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => PrioritySchema).optional(),
      in: z
        .lazy(() => PrioritySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PrioritySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => NestedEnumPriorityWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumPriorityFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumPriorityFilterSchema).optional(),
    })
    .strict();

export const NestedEnumCategoryFilterSchema: z.ZodType<Prisma.NestedEnumCategoryFilter> =
  z
    .object({
      equals: z.lazy(() => CategorySchema).optional(),
      in: z
        .lazy(() => CategorySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => CategorySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => CategorySchema),
          z.lazy(() => NestedEnumCategoryFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumCategoryWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCategoryWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => CategorySchema).optional(),
      in: z
        .lazy(() => CategorySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => CategorySchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => CategorySchema),
          z.lazy(() => NestedEnumCategoryWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumCategoryFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumCategoryFilterSchema).optional(),
    })
    .strict();

export const NestedEnumOutgoingStatusFilterSchema: z.ZodType<Prisma.NestedEnumOutgoingStatusFilter> =
  z
    .object({
      equals: z.lazy(() => OutgoingStatusSchema).optional(),
      in: z
        .lazy(() => OutgoingStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => OutgoingStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => NestedEnumOutgoingStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumOutgoingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumOutgoingStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => OutgoingStatusSchema).optional(),
      in: z
        .lazy(() => OutgoingStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => OutgoingStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => NestedEnumOutgoingStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumOutgoingStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumOutgoingStatusFilterSchema).optional(),
    })
    .strict();

export const NestedEnumIncomingStatusFilterSchema: z.ZodType<Prisma.NestedEnumIncomingStatusFilter> =
  z
    .object({
      equals: z.lazy(() => IncomingStatusSchema).optional(),
      in: z
        .lazy(() => IncomingStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => IncomingStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => NestedEnumIncomingStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumIncomingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumIncomingStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => IncomingStatusSchema).optional(),
      in: z
        .lazy(() => IncomingStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => IncomingStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => NestedEnumIncomingStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumIncomingStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumIncomingStatusFilterSchema).optional(),
    })
    .strict();

export const NestedEnumReportTypeFilterSchema: z.ZodType<Prisma.NestedEnumReportTypeFilter> =
  z
    .object({
      equals: z.lazy(() => ReportTypeSchema).optional(),
      in: z
        .lazy(() => ReportTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ReportTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ReportTypeSchema),
          z.lazy(() => NestedEnumReportTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumReportStatusFilterSchema: z.ZodType<Prisma.NestedEnumReportStatusFilter> =
  z
    .object({
      equals: z.lazy(() => ReportStatusSchema).optional(),
      in: z
        .lazy(() => ReportStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ReportStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ReportStatusSchema),
          z.lazy(() => NestedEnumReportStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumReportTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReportTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => ReportTypeSchema).optional(),
      in: z
        .lazy(() => ReportTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ReportTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ReportTypeSchema),
          z.lazy(() => NestedEnumReportTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumReportTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumReportTypeFilterSchema).optional(),
    })
    .strict();

export const NestedEnumReportStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReportStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => ReportStatusSchema).optional(),
      in: z
        .lazy(() => ReportStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ReportStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ReportStatusSchema),
          z.lazy(() => NestedEnumReportStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumReportStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumReportStatusFilterSchema).optional(),
    })
    .strict();

export const BudgetCreateWithoutProjectInputSchema: z.ZodType<Prisma.BudgetCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      total: z.number(),
      spent: z.number(),
    })
    .strict();

export const BudgetUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUncheckedCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      total: z.number(),
      spent: z.number(),
    })
    .strict();

export const BudgetCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.BudgetCreateOrConnectWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => BudgetWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => BudgetCreateWithoutProjectInputSchema),
        z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const TeamCreateWithoutProjectInputSchema: z.ZodType<Prisma.TeamCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      projectManager: z.string(),
      siteManager: z.string(),
      civilManager: z.string(),
      architecturalLead: z.string(),
      totalWorkers: z.number().int(),
    })
    .strict();

export const TeamUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      projectManager: z.string(),
      siteManager: z.string(),
      civilManager: z.string(),
      architecturalLead: z.string(),
      totalWorkers: z.number().int(),
    })
    .strict();

export const TeamCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => TeamWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TeamCreateWithoutProjectInputSchema),
        z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const MilestoneCreateWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      date: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
    })
    .strict();

export const MilestoneUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneUncheckedCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      date: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
    })
    .strict();

export const MilestoneCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneCreateOrConnectWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => MilestoneWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MilestoneCreateWithoutProjectInputSchema),
        z.lazy(() => MilestoneUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const MilestoneCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.MilestoneCreateManyProjectInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => MilestoneCreateManyProjectInputSchema),
        z.lazy(() => MilestoneCreateManyProjectInputSchema).array(),
      ]),
    })
    .strict();

export const ChecklistItemCreateWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      task: z.string(),
      assignedTo: z.string(),
      dueDate: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
      priority: z.lazy(() => PrioritySchema),
      milestoneId: z.string(),
    })
    .strict();

export const ChecklistItemUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemUncheckedCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      task: z.string(),
      assignedTo: z.string(),
      dueDate: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
      priority: z.lazy(() => PrioritySchema),
      milestoneId: z.string(),
    })
    .strict();

export const ChecklistItemCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemCreateOrConnectWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ChecklistItemWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ChecklistItemCreateWithoutProjectInputSchema),
        z.lazy(() => ChecklistItemUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const ChecklistItemCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.ChecklistItemCreateManyProjectInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ChecklistItemCreateManyProjectInputSchema),
        z.lazy(() => ChecklistItemCreateManyProjectInputSchema).array(),
      ]),
    })
    .strict();

export const DocumentCreateWithoutProjectInputSchema: z.ZodType<Prisma.DocumentCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      fileUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
    })
    .strict();

export const DocumentUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      fileUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
    })
    .strict();

export const DocumentCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => DocumentWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DocumentCreateWithoutProjectInputSchema),
        z.lazy(() => DocumentUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const DocumentCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.DocumentCreateManyProjectInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => DocumentCreateManyProjectInputSchema),
        z.lazy(() => DocumentCreateManyProjectInputSchema).array(),
      ]),
    })
    .strict();

export const OutgoingLetterCreateWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      recipient: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => OutgoingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const OutgoingLetterUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterUncheckedCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      recipient: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => OutgoingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const OutgoingLetterCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterCreateOrConnectWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => OutgoingLetterCreateWithoutProjectInputSchema),
        z.lazy(() => OutgoingLetterUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const OutgoingLetterCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.OutgoingLetterCreateManyProjectInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => OutgoingLetterCreateManyProjectInputSchema),
        z.lazy(() => OutgoingLetterCreateManyProjectInputSchema).array(),
      ]),
    })
    .strict();

export const IncomingLetterCreateWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      sender: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => IncomingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const IncomingLetterUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterUncheckedCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      sender: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => IncomingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const IncomingLetterCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterCreateOrConnectWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => IncomingLetterWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => IncomingLetterCreateWithoutProjectInputSchema),
        z.lazy(() => IncomingLetterUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const IncomingLetterCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.IncomingLetterCreateManyProjectInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => IncomingLetterCreateManyProjectInputSchema),
        z.lazy(() => IncomingLetterCreateManyProjectInputSchema).array(),
      ]),
    })
    .strict();

export const ReportCreateWithoutProjectInputSchema: z.ZodType<Prisma.ReportCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      publisher: z.string(),
      reportType: z.lazy(() => ReportTypeSchema),
      version: z.string(),
      status: z.lazy(() => ReportStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      uploadedDate: z.coerce.date().optional(),
    })
    .strict();

export const ReportUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      publisher: z.string(),
      reportType: z.lazy(() => ReportTypeSchema),
      version: z.string(),
      status: z.lazy(() => ReportStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      uploadedDate: z.coerce.date().optional(),
    })
    .strict();

export const ReportCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ReportWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ReportCreateWithoutProjectInputSchema),
        z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const ReportCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.ReportCreateManyProjectInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ReportCreateManyProjectInputSchema),
        z.lazy(() => ReportCreateManyProjectInputSchema).array(),
      ]),
    })
    .strict();

export const SiteImageCreateWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      location: z.string(),
      category: z.lazy(() => CategorySchema),
      imageUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
    })
    .strict();

export const SiteImageUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageUncheckedCreateWithoutProjectInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      location: z.string(),
      category: z.lazy(() => CategorySchema),
      imageUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
    })
    .strict();

export const SiteImageCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageCreateOrConnectWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => SiteImageWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SiteImageCreateWithoutProjectInputSchema),
        z.lazy(() => SiteImageUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const SiteImageCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.SiteImageCreateManyProjectInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => SiteImageCreateManyProjectInputSchema),
        z.lazy(() => SiteImageCreateManyProjectInputSchema).array(),
      ]),
    })
    .strict();

export const BudgetUpsertWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUpsertWithoutProjectInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => BudgetUpdateWithoutProjectInputSchema),
        z.lazy(() => BudgetUncheckedUpdateWithoutProjectInputSchema),
      ]),
      create: z.union([
        z.lazy(() => BudgetCreateWithoutProjectInputSchema),
        z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema),
      ]),
      where: z.lazy(() => BudgetWhereInputSchema).optional(),
    })
    .strict();

export const BudgetUpdateToOneWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUpdateToOneWithWhereWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => BudgetWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => BudgetUpdateWithoutProjectInputSchema),
        z.lazy(() => BudgetUncheckedUpdateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const BudgetUpdateWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUpdateWithoutProjectInput> =
  z
    .object({
      total: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      spent: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const BudgetUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUncheckedUpdateWithoutProjectInput> =
  z
    .object({
      total: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      spent: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeamUpsertWithoutProjectInputSchema: z.ZodType<Prisma.TeamUpsertWithoutProjectInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => TeamUpdateWithoutProjectInputSchema),
        z.lazy(() => TeamUncheckedUpdateWithoutProjectInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TeamCreateWithoutProjectInputSchema),
        z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema),
      ]),
      where: z.lazy(() => TeamWhereInputSchema).optional(),
    })
    .strict();

export const TeamUpdateToOneWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => TeamWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => TeamUpdateWithoutProjectInputSchema),
        z.lazy(() => TeamUncheckedUpdateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const TeamUpdateWithoutProjectInputSchema: z.ZodType<Prisma.TeamUpdateWithoutProjectInput> =
  z
    .object({
      projectManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      siteManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      civilManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      architecturalLead: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      totalWorkers: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeamUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutProjectInput> =
  z
    .object({
      projectManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      siteManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      civilManager: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      architecturalLead: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      totalWorkers: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MilestoneUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneUpsertWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => MilestoneWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => MilestoneUpdateWithoutProjectInputSchema),
        z.lazy(() => MilestoneUncheckedUpdateWithoutProjectInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MilestoneCreateWithoutProjectInputSchema),
        z.lazy(() => MilestoneUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const MilestoneUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneUpdateWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => MilestoneWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => MilestoneUpdateWithoutProjectInputSchema),
        z.lazy(() => MilestoneUncheckedUpdateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const MilestoneUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneUpdateManyWithWhereWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => MilestoneScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => MilestoneUpdateManyMutationInputSchema),
        z.lazy(() => MilestoneUncheckedUpdateManyWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const MilestoneScalarWhereInputSchema: z.ZodType<Prisma.MilestoneScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MilestoneScalarWhereInputSchema),
          z.lazy(() => MilestoneScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MilestoneScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MilestoneScalarWhereInputSchema),
          z.lazy(() => MilestoneScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      date: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ChecklistItemUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemUpsertWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ChecklistItemWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ChecklistItemUpdateWithoutProjectInputSchema),
        z.lazy(() => ChecklistItemUncheckedUpdateWithoutProjectInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ChecklistItemCreateWithoutProjectInputSchema),
        z.lazy(() => ChecklistItemUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const ChecklistItemUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemUpdateWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ChecklistItemWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ChecklistItemUpdateWithoutProjectInputSchema),
        z.lazy(() => ChecklistItemUncheckedUpdateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const ChecklistItemUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemUpdateManyWithWhereWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ChecklistItemScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ChecklistItemUpdateManyMutationInputSchema),
        z.lazy(() => ChecklistItemUncheckedUpdateManyWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const ChecklistItemScalarWhereInputSchema: z.ZodType<Prisma.ChecklistItemScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ChecklistItemScalarWhereInputSchema),
          z.lazy(() => ChecklistItemScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ChecklistItemScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ChecklistItemScalarWhereInputSchema),
          z.lazy(() => ChecklistItemScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      task: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      assignedTo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      dueDate: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusFilterSchema),
          z.lazy(() => StatusSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => EnumPriorityFilterSchema),
          z.lazy(() => PrioritySchema),
        ])
        .optional(),
      milestoneId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const DocumentUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => DocumentWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => DocumentUpdateWithoutProjectInputSchema),
        z.lazy(() => DocumentUncheckedUpdateWithoutProjectInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DocumentCreateWithoutProjectInputSchema),
        z.lazy(() => DocumentUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const DocumentUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => DocumentWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => DocumentUpdateWithoutProjectInputSchema),
        z.lazy(() => DocumentUncheckedUpdateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const DocumentUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => DocumentScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => DocumentUpdateManyMutationInputSchema),
        z.lazy(() => DocumentUncheckedUpdateManyWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const DocumentScalarWhereInputSchema: z.ZodType<Prisma.DocumentScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => DocumentScalarWhereInputSchema),
          z.lazy(() => DocumentScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => DocumentScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => DocumentScalarWhereInputSchema),
          z.lazy(() => DocumentScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      fileUrl: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      date: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const OutgoingLetterUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterUpsertWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => OutgoingLetterUpdateWithoutProjectInputSchema),
        z.lazy(() => OutgoingLetterUncheckedUpdateWithoutProjectInputSchema),
      ]),
      create: z.union([
        z.lazy(() => OutgoingLetterCreateWithoutProjectInputSchema),
        z.lazy(() => OutgoingLetterUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const OutgoingLetterUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterUpdateWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => OutgoingLetterWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => OutgoingLetterUpdateWithoutProjectInputSchema),
        z.lazy(() => OutgoingLetterUncheckedUpdateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const OutgoingLetterUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterUpdateManyWithWhereWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => OutgoingLetterScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => OutgoingLetterUpdateManyMutationInputSchema),
        z.lazy(
          () => OutgoingLetterUncheckedUpdateManyWithoutProjectInputSchema
        ),
      ]),
    })
    .strict();

export const OutgoingLetterScalarWhereInputSchema: z.ZodType<Prisma.OutgoingLetterScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => OutgoingLetterScalarWhereInputSchema),
          z.lazy(() => OutgoingLetterScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => OutgoingLetterScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => OutgoingLetterScalarWhereInputSchema),
          z.lazy(() => OutgoingLetterScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      recipient: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      subject: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      priority: z
        .union([
          z.lazy(() => EnumPriorityFilterSchema),
          z.lazy(() => PrioritySchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumOutgoingStatusFilterSchema),
          z.lazy(() => OutgoingStatusSchema),
        ])
        .optional(),
      fileUrl: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const IncomingLetterUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterUpsertWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => IncomingLetterWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => IncomingLetterUpdateWithoutProjectInputSchema),
        z.lazy(() => IncomingLetterUncheckedUpdateWithoutProjectInputSchema),
      ]),
      create: z.union([
        z.lazy(() => IncomingLetterCreateWithoutProjectInputSchema),
        z.lazy(() => IncomingLetterUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const IncomingLetterUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterUpdateWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => IncomingLetterWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => IncomingLetterUpdateWithoutProjectInputSchema),
        z.lazy(() => IncomingLetterUncheckedUpdateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const IncomingLetterUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterUpdateManyWithWhereWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => IncomingLetterScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => IncomingLetterUpdateManyMutationInputSchema),
        z.lazy(
          () => IncomingLetterUncheckedUpdateManyWithoutProjectInputSchema
        ),
      ]),
    })
    .strict();

export const IncomingLetterScalarWhereInputSchema: z.ZodType<Prisma.IncomingLetterScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => IncomingLetterScalarWhereInputSchema),
          z.lazy(() => IncomingLetterScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => IncomingLetterScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => IncomingLetterScalarWhereInputSchema),
          z.lazy(() => IncomingLetterScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      sender: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      subject: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      priority: z
        .union([
          z.lazy(() => EnumPriorityFilterSchema),
          z.lazy(() => PrioritySchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumIncomingStatusFilterSchema),
          z.lazy(() => IncomingStatusSchema),
        ])
        .optional(),
      fileUrl: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ReportUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpsertWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ReportWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ReportUpdateWithoutProjectInputSchema),
        z.lazy(() => ReportUncheckedUpdateWithoutProjectInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ReportCreateWithoutProjectInputSchema),
        z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const ReportUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpdateWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ReportWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ReportUpdateWithoutProjectInputSchema),
        z.lazy(() => ReportUncheckedUpdateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const ReportUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpdateManyWithWhereWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => ReportScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ReportUpdateManyMutationInputSchema),
        z.lazy(() => ReportUncheckedUpdateManyWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const ReportScalarWhereInputSchema: z.ZodType<Prisma.ReportScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ReportScalarWhereInputSchema),
          z.lazy(() => ReportScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ReportScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ReportScalarWhereInputSchema),
          z.lazy(() => ReportScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      publisher: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      reportType: z
        .union([
          z.lazy(() => EnumReportTypeFilterSchema),
          z.lazy(() => ReportTypeSchema),
        ])
        .optional(),
      version: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumReportStatusFilterSchema),
          z.lazy(() => ReportStatusSchema),
        ])
        .optional(),
      fileUrl: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      uploadedDate: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const SiteImageUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageUpsertWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => SiteImageWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SiteImageUpdateWithoutProjectInputSchema),
        z.lazy(() => SiteImageUncheckedUpdateWithoutProjectInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SiteImageCreateWithoutProjectInputSchema),
        z.lazy(() => SiteImageUncheckedCreateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const SiteImageUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageUpdateWithWhereUniqueWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => SiteImageWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SiteImageUpdateWithoutProjectInputSchema),
        z.lazy(() => SiteImageUncheckedUpdateWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const SiteImageUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageUpdateManyWithWhereWithoutProjectInput> =
  z
    .object({
      where: z.lazy(() => SiteImageScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SiteImageUpdateManyMutationInputSchema),
        z.lazy(() => SiteImageUncheckedUpdateManyWithoutProjectInputSchema),
      ]),
    })
    .strict();

export const SiteImageScalarWhereInputSchema: z.ZodType<Prisma.SiteImageScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SiteImageScalarWhereInputSchema),
          z.lazy(() => SiteImageScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SiteImageScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SiteImageScalarWhereInputSchema),
          z.lazy(() => SiteImageScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      location: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      category: z
        .union([
          z.lazy(() => EnumCategoryFilterSchema),
          z.lazy(() => CategorySchema),
        ])
        .optional(),
      imageUrl: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      fileName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      date: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      projectId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ProjectCreateWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectCreateWithoutBudgetInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      team: z
        .lazy(() => TeamCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedCreateWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutBudgetInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      team: z
        .lazy(() => TeamUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateOrConnectWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutBudgetInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutBudgetInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutBudgetInputSchema),
      ]),
    })
    .strict();

export const ProjectUpsertWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutBudgetInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ProjectUpdateWithoutBudgetInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutBudgetInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutBudgetInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutBudgetInputSchema),
      ]),
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
    })
    .strict();

export const ProjectUpdateToOneWithWhereWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutBudgetInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProjectUpdateWithoutBudgetInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutBudgetInputSchema),
      ]),
    })
    .strict();

export const ProjectUpdateWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutBudgetInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team: z
        .lazy(() => TeamUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedUpdateWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutBudgetInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      team: z
        .lazy(() => TeamUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateWithoutTeamInputSchema: z.ZodType<Prisma.ProjectCreateWithoutTeamInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutTeamInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutTeamInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const ProjectUpsertWithoutTeamInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutTeamInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ProjectUpdateWithoutTeamInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutTeamInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutTeamInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutTeamInputSchema),
      ]),
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
    })
    .strict();

export const ProjectUpdateToOneWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProjectUpdateWithoutTeamInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const ProjectUpdateWithoutTeamInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutTeamInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutTeamInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateWithoutMilestonesInputSchema: z.ZodType<Prisma.ProjectCreateWithoutMilestonesInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedCreateWithoutMilestonesInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutMilestonesInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateOrConnectWithoutMilestonesInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutMilestonesInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutMilestonesInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutMilestonesInputSchema),
      ]),
    })
    .strict();

export const ProjectUpsertWithoutMilestonesInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutMilestonesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ProjectUpdateWithoutMilestonesInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutMilestonesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutMilestonesInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutMilestonesInputSchema),
      ]),
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
    })
    .strict();

export const ProjectUpdateToOneWithWhereWithoutMilestonesInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutMilestonesInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProjectUpdateWithoutMilestonesInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutMilestonesInputSchema),
      ]),
    })
    .strict();

export const ProjectUpdateWithoutMilestonesInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutMilestonesInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedUpdateWithoutMilestonesInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutMilestonesInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateWithoutChecklistInputSchema: z.ZodType<Prisma.ProjectCreateWithoutChecklistInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedCreateWithoutChecklistInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutChecklistInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateOrConnectWithoutChecklistInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutChecklistInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutChecklistInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutChecklistInputSchema),
      ]),
    })
    .strict();

export const ProjectUpsertWithoutChecklistInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutChecklistInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ProjectUpdateWithoutChecklistInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutChecklistInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutChecklistInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutChecklistInputSchema),
      ]),
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
    })
    .strict();

export const ProjectUpdateToOneWithWhereWithoutChecklistInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutChecklistInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProjectUpdateWithoutChecklistInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutChecklistInputSchema),
      ]),
    })
    .strict();

export const ProjectUpdateWithoutChecklistInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutChecklistInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedUpdateWithoutChecklistInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutChecklistInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutDocumentsInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutDocumentsInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutDocumentsInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutDocumentsInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutDocumentsInputSchema),
      ]),
    })
    .strict();

export const ProjectUpsertWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutDocumentsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ProjectUpdateWithoutDocumentsInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutDocumentsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutDocumentsInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutDocumentsInputSchema),
      ]),
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
    })
    .strict();

export const ProjectUpdateToOneWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutDocumentsInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProjectUpdateWithoutDocumentsInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutDocumentsInputSchema),
      ]),
    })
    .strict();

export const ProjectUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutDocumentsInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutDocumentsInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateWithoutSiteImagesInputSchema: z.ZodType<Prisma.ProjectCreateWithoutSiteImagesInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedCreateWithoutSiteImagesInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutSiteImagesInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateOrConnectWithoutSiteImagesInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutSiteImagesInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutSiteImagesInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutSiteImagesInputSchema),
      ]),
    })
    .strict();

export const ProjectUpsertWithoutSiteImagesInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutSiteImagesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ProjectUpdateWithoutSiteImagesInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutSiteImagesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutSiteImagesInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutSiteImagesInputSchema),
      ]),
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
    })
    .strict();

export const ProjectUpdateToOneWithWhereWithoutSiteImagesInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutSiteImagesInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProjectUpdateWithoutSiteImagesInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutSiteImagesInputSchema),
      ]),
    })
    .strict();

export const ProjectUpdateWithoutSiteImagesInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutSiteImagesInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedUpdateWithoutSiteImagesInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutSiteImagesInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateWithoutOutgoingLettersInputSchema: z.ZodType<Prisma.ProjectCreateWithoutOutgoingLettersInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedCreateWithoutOutgoingLettersInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutOutgoingLettersInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateOrConnectWithoutOutgoingLettersInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutOutgoingLettersInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutOutgoingLettersInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutOutgoingLettersInputSchema),
      ]),
    })
    .strict();

export const ProjectUpsertWithoutOutgoingLettersInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutOutgoingLettersInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ProjectUpdateWithoutOutgoingLettersInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutOutgoingLettersInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutOutgoingLettersInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutOutgoingLettersInputSchema),
      ]),
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
    })
    .strict();

export const ProjectUpdateToOneWithWhereWithoutOutgoingLettersInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutOutgoingLettersInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProjectUpdateWithoutOutgoingLettersInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutOutgoingLettersInputSchema),
      ]),
    })
    .strict();

export const ProjectUpdateWithoutOutgoingLettersInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutOutgoingLettersInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedUpdateWithoutOutgoingLettersInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutOutgoingLettersInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateWithoutIncomingLettersInputSchema: z.ZodType<Prisma.ProjectCreateWithoutIncomingLettersInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedCreateWithoutIncomingLettersInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutIncomingLettersInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateOrConnectWithoutIncomingLettersInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutIncomingLettersInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutIncomingLettersInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutIncomingLettersInputSchema),
      ]),
    })
    .strict();

export const ProjectUpsertWithoutIncomingLettersInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutIncomingLettersInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ProjectUpdateWithoutIncomingLettersInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutIncomingLettersInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutIncomingLettersInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutIncomingLettersInputSchema),
      ]),
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
    })
    .strict();

export const ProjectUpdateToOneWithWhereWithoutIncomingLettersInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutIncomingLettersInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProjectUpdateWithoutIncomingLettersInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutIncomingLettersInputSchema),
      ]),
    })
    .strict();

export const ProjectUpdateWithoutIncomingLettersInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutIncomingLettersInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      reports: z
        .lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedUpdateWithoutIncomingLettersInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutIncomingLettersInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      reports: z
        .lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateWithoutReportsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutReportsInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedCreateWithoutReportsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutReportsInput> =
  z
    .object({
      id: z.string().optional(),
      projectName: z.string(),
      clientName: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      budget: z
        .lazy(() => BudgetUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedCreateNestedOneWithoutProjectInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema
        )
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedCreateNestedManyWithoutProjectInputSchema)
        .optional(),
    })
    .strict();

export const ProjectCreateOrConnectWithoutReportsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutReportsInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutReportsInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutReportsInputSchema),
      ]),
    })
    .strict();

export const ProjectUpsertWithoutReportsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutReportsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ProjectUpdateWithoutReportsInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutReportsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProjectCreateWithoutReportsInputSchema),
        z.lazy(() => ProjectUncheckedCreateWithoutReportsInputSchema),
      ]),
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
    })
    .strict();

export const ProjectUpdateToOneWithWhereWithoutReportsInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutReportsInput> =
  z
    .object({
      where: z.lazy(() => ProjectWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProjectUpdateWithoutReportsInputSchema),
        z.lazy(() => ProjectUncheckedUpdateWithoutReportsInputSchema),
      ]),
    })
    .strict();

export const ProjectUpdateWithoutReportsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutReportsInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(() => ChecklistItemUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      documents: z
        .lazy(() => DocumentUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(() => OutgoingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      incomingLetters: z
        .lazy(() => IncomingLetterUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProjectUncheckedUpdateWithoutReportsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutReportsInput> =
  z
    .object({
      projectName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      budget: z
        .lazy(() => BudgetUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      team: z
        .lazy(() => TeamUncheckedUpdateOneWithoutProjectNestedInputSchema)
        .optional(),
      milestones: z
        .lazy(() => MilestoneUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      checklist: z
        .lazy(
          () => ChecklistItemUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      documents: z
        .lazy(() => DocumentUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
      outgoingLetters: z
        .lazy(
          () => OutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      incomingLetters: z
        .lazy(
          () => IncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema
        )
        .optional(),
      siteImages: z
        .lazy(() => SiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const MilestoneCreateManyProjectInputSchema: z.ZodType<Prisma.MilestoneCreateManyProjectInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      date: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
    })
    .strict();

export const ChecklistItemCreateManyProjectInputSchema: z.ZodType<Prisma.ChecklistItemCreateManyProjectInput> =
  z
    .object({
      id: z.string().optional(),
      task: z.string(),
      assignedTo: z.string(),
      dueDate: z.coerce.date(),
      status: z.lazy(() => StatusSchema),
      priority: z.lazy(() => PrioritySchema),
      milestoneId: z.string(),
    })
    .strict();

export const DocumentCreateManyProjectInputSchema: z.ZodType<Prisma.DocumentCreateManyProjectInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      fileUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
    })
    .strict();

export const OutgoingLetterCreateManyProjectInputSchema: z.ZodType<Prisma.OutgoingLetterCreateManyProjectInput> =
  z
    .object({
      id: z.string().optional(),
      recipient: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => OutgoingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const IncomingLetterCreateManyProjectInputSchema: z.ZodType<Prisma.IncomingLetterCreateManyProjectInput> =
  z
    .object({
      id: z.string().optional(),
      sender: z.string(),
      subject: z.string(),
      priority: z.lazy(() => PrioritySchema),
      status: z.lazy(() => IncomingStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const ReportCreateManyProjectInputSchema: z.ZodType<Prisma.ReportCreateManyProjectInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      publisher: z.string(),
      reportType: z.lazy(() => ReportTypeSchema),
      version: z.string(),
      status: z.lazy(() => ReportStatusSchema),
      fileUrl: z.string(),
      fileName: z.string(),
      uploadedDate: z.coerce.date().optional(),
    })
    .strict();

export const SiteImageCreateManyProjectInputSchema: z.ZodType<Prisma.SiteImageCreateManyProjectInput> =
  z
    .object({
      id: z.string().optional(),
      title: z.string(),
      location: z.string(),
      category: z.lazy(() => CategorySchema),
      imageUrl: z.string(),
      fileName: z.string(),
      date: z.coerce.date().optional(),
    })
    .strict();

export const MilestoneUpdateWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneUpdateWithoutProjectInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MilestoneUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneUncheckedUpdateWithoutProjectInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MilestoneUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.MilestoneUncheckedUpdateManyWithoutProjectInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemUpdateWithoutProjectInput> =
  z
    .object({
      task: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assignedTo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dueDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      milestoneId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemUncheckedUpdateWithoutProjectInput> =
  z
    .object({
      task: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assignedTo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dueDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      milestoneId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.ChecklistItemUncheckedUpdateManyWithoutProjectInput> =
  z
    .object({
      task: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assignedTo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dueDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusSchema),
          z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      milestoneId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DocumentUpdateWithoutProjectInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutProjectInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DocumentUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutProjectInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DocumentUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutProjectInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterUpdateWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterUpdateWithoutProjectInput> =
  z
    .object({
      recipient: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterUncheckedUpdateWithoutProjectInput> =
  z
    .object({
      recipient: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.OutgoingLetterUncheckedUpdateManyWithoutProjectInput> =
  z
    .object({
      recipient: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => OutgoingStatusSchema),
          z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterUpdateWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterUpdateWithoutProjectInput> =
  z
    .object({
      sender: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterUncheckedUpdateWithoutProjectInput> =
  z
    .object({
      sender: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.IncomingLetterUncheckedUpdateManyWithoutProjectInput> =
  z
    .object({
      sender: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priority: z
        .union([
          z.lazy(() => PrioritySchema),
          z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => IncomingStatusSchema),
          z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ReportUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpdateWithoutProjectInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      publisher: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      reportType: z
        .union([
          z.lazy(() => ReportTypeSchema),
          z.lazy(() => EnumReportTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => ReportStatusSchema),
          z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uploadedDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ReportUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutProjectInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      publisher: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      reportType: z
        .union([
          z.lazy(() => ReportTypeSchema),
          z.lazy(() => EnumReportTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => ReportStatusSchema),
          z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uploadedDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ReportUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutProjectInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      publisher: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      reportType: z
        .union([
          z.lazy(() => ReportTypeSchema),
          z.lazy(() => EnumReportTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => ReportStatusSchema),
          z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uploadedDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SiteImageUpdateWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageUpdateWithoutProjectInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.lazy(() => CategorySchema),
          z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SiteImageUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageUncheckedUpdateWithoutProjectInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.lazy(() => CategorySchema),
          z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SiteImageUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.SiteImageUncheckedUpdateManyWithoutProjectInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .union([
          z.lazy(() => CategorySchema),
          z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      fileName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict();

export const ProjectFindFirstArgsSchema: z.ZodType<Prisma.ProjectFindFirstArgs> =
  z
    .object({
      select: ProjectSelectSchema.optional(),
      include: ProjectIncludeSchema.optional(),
      where: ProjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProjectOrderByWithRelationInputSchema.array(),
          ProjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ProjectScalarFieldEnumSchema,
          ProjectScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> =
  z
    .object({
      select: ProjectSelectSchema.optional(),
      include: ProjectIncludeSchema.optional(),
      where: ProjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProjectOrderByWithRelationInputSchema.array(),
          ProjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ProjectScalarFieldEnumSchema,
          ProjectScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ProjectFindManyArgsSchema: z.ZodType<Prisma.ProjectFindManyArgs> =
  z
    .object({
      select: ProjectSelectSchema.optional(),
      include: ProjectIncludeSchema.optional(),
      where: ProjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProjectOrderByWithRelationInputSchema.array(),
          ProjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ProjectScalarFieldEnumSchema,
          ProjectScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ProjectAggregateArgsSchema: z.ZodType<Prisma.ProjectAggregateArgs> =
  z
    .object({
      where: ProjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProjectOrderByWithRelationInputSchema.array(),
          ProjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ProjectGroupByArgsSchema: z.ZodType<Prisma.ProjectGroupByArgs> = z
  .object({
    where: ProjectWhereInputSchema.optional(),
    orderBy: z
      .union([
        ProjectOrderByWithAggregationInputSchema.array(),
        ProjectOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ProjectScalarFieldEnumSchema.array(),
    having: ProjectScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProjectFindUniqueArgsSchema: z.ZodType<Prisma.ProjectFindUniqueArgs> =
  z
    .object({
      select: ProjectSelectSchema.optional(),
      include: ProjectIncludeSchema.optional(),
      where: ProjectWhereUniqueInputSchema,
    })
    .strict();

export const ProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs> =
  z
    .object({
      select: ProjectSelectSchema.optional(),
      include: ProjectIncludeSchema.optional(),
      where: ProjectWhereUniqueInputSchema,
    })
    .strict();

export const BudgetFindFirstArgsSchema: z.ZodType<Prisma.BudgetFindFirstArgs> =
  z
    .object({
      select: BudgetSelectSchema.optional(),
      include: BudgetIncludeSchema.optional(),
      where: BudgetWhereInputSchema.optional(),
      orderBy: z
        .union([
          BudgetOrderByWithRelationInputSchema.array(),
          BudgetOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BudgetWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          BudgetScalarFieldEnumSchema,
          BudgetScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const BudgetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BudgetFindFirstOrThrowArgs> =
  z
    .object({
      select: BudgetSelectSchema.optional(),
      include: BudgetIncludeSchema.optional(),
      where: BudgetWhereInputSchema.optional(),
      orderBy: z
        .union([
          BudgetOrderByWithRelationInputSchema.array(),
          BudgetOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BudgetWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          BudgetScalarFieldEnumSchema,
          BudgetScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const BudgetFindManyArgsSchema: z.ZodType<Prisma.BudgetFindManyArgs> = z
  .object({
    select: BudgetSelectSchema.optional(),
    include: BudgetIncludeSchema.optional(),
    where: BudgetWhereInputSchema.optional(),
    orderBy: z
      .union([
        BudgetOrderByWithRelationInputSchema.array(),
        BudgetOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: BudgetWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([BudgetScalarFieldEnumSchema, BudgetScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const BudgetAggregateArgsSchema: z.ZodType<Prisma.BudgetAggregateArgs> =
  z
    .object({
      where: BudgetWhereInputSchema.optional(),
      orderBy: z
        .union([
          BudgetOrderByWithRelationInputSchema.array(),
          BudgetOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BudgetWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const BudgetGroupByArgsSchema: z.ZodType<Prisma.BudgetGroupByArgs> = z
  .object({
    where: BudgetWhereInputSchema.optional(),
    orderBy: z
      .union([
        BudgetOrderByWithAggregationInputSchema.array(),
        BudgetOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: BudgetScalarFieldEnumSchema.array(),
    having: BudgetScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const BudgetFindUniqueArgsSchema: z.ZodType<Prisma.BudgetFindUniqueArgs> =
  z
    .object({
      select: BudgetSelectSchema.optional(),
      include: BudgetIncludeSchema.optional(),
      where: BudgetWhereUniqueInputSchema,
    })
    .strict();

export const BudgetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BudgetFindUniqueOrThrowArgs> =
  z
    .object({
      select: BudgetSelectSchema.optional(),
      include: BudgetIncludeSchema.optional(),
      where: BudgetWhereUniqueInputSchema,
    })
    .strict();

export const TeamFindFirstArgsSchema: z.ZodType<Prisma.TeamFindFirstArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    where: TeamWhereInputSchema.optional(),
    orderBy: z
      .union([
        TeamOrderByWithRelationInputSchema.array(),
        TeamOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TeamWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TeamScalarFieldEnumSchema, TeamScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const TeamFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeamFindFirstOrThrowArgs> =
  z
    .object({
      select: TeamSelectSchema.optional(),
      include: TeamIncludeSchema.optional(),
      where: TeamWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeamOrderByWithRelationInputSchema.array(),
          TeamOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TeamWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([TeamScalarFieldEnumSchema, TeamScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const TeamFindManyArgsSchema: z.ZodType<Prisma.TeamFindManyArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    where: TeamWhereInputSchema.optional(),
    orderBy: z
      .union([
        TeamOrderByWithRelationInputSchema.array(),
        TeamOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TeamWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TeamScalarFieldEnumSchema, TeamScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const TeamAggregateArgsSchema: z.ZodType<Prisma.TeamAggregateArgs> = z
  .object({
    where: TeamWhereInputSchema.optional(),
    orderBy: z
      .union([
        TeamOrderByWithRelationInputSchema.array(),
        TeamOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TeamWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TeamGroupByArgsSchema: z.ZodType<Prisma.TeamGroupByArgs> = z
  .object({
    where: TeamWhereInputSchema.optional(),
    orderBy: z
      .union([
        TeamOrderByWithAggregationInputSchema.array(),
        TeamOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: TeamScalarFieldEnumSchema.array(),
    having: TeamScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TeamFindUniqueArgsSchema: z.ZodType<Prisma.TeamFindUniqueArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    where: TeamWhereUniqueInputSchema,
  })
  .strict();

export const TeamFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeamFindUniqueOrThrowArgs> =
  z
    .object({
      select: TeamSelectSchema.optional(),
      include: TeamIncludeSchema.optional(),
      where: TeamWhereUniqueInputSchema,
    })
    .strict();

export const MilestoneFindFirstArgsSchema: z.ZodType<Prisma.MilestoneFindFirstArgs> =
  z
    .object({
      select: MilestoneSelectSchema.optional(),
      include: MilestoneIncludeSchema.optional(),
      where: MilestoneWhereInputSchema.optional(),
      orderBy: z
        .union([
          MilestoneOrderByWithRelationInputSchema.array(),
          MilestoneOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MilestoneWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MilestoneScalarFieldEnumSchema,
          MilestoneScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const MilestoneFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MilestoneFindFirstOrThrowArgs> =
  z
    .object({
      select: MilestoneSelectSchema.optional(),
      include: MilestoneIncludeSchema.optional(),
      where: MilestoneWhereInputSchema.optional(),
      orderBy: z
        .union([
          MilestoneOrderByWithRelationInputSchema.array(),
          MilestoneOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MilestoneWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MilestoneScalarFieldEnumSchema,
          MilestoneScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const MilestoneFindManyArgsSchema: z.ZodType<Prisma.MilestoneFindManyArgs> =
  z
    .object({
      select: MilestoneSelectSchema.optional(),
      include: MilestoneIncludeSchema.optional(),
      where: MilestoneWhereInputSchema.optional(),
      orderBy: z
        .union([
          MilestoneOrderByWithRelationInputSchema.array(),
          MilestoneOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MilestoneWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MilestoneScalarFieldEnumSchema,
          MilestoneScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const MilestoneAggregateArgsSchema: z.ZodType<Prisma.MilestoneAggregateArgs> =
  z
    .object({
      where: MilestoneWhereInputSchema.optional(),
      orderBy: z
        .union([
          MilestoneOrderByWithRelationInputSchema.array(),
          MilestoneOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MilestoneWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MilestoneGroupByArgsSchema: z.ZodType<Prisma.MilestoneGroupByArgs> =
  z
    .object({
      where: MilestoneWhereInputSchema.optional(),
      orderBy: z
        .union([
          MilestoneOrderByWithAggregationInputSchema.array(),
          MilestoneOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: MilestoneScalarFieldEnumSchema.array(),
      having: MilestoneScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MilestoneFindUniqueArgsSchema: z.ZodType<Prisma.MilestoneFindUniqueArgs> =
  z
    .object({
      select: MilestoneSelectSchema.optional(),
      include: MilestoneIncludeSchema.optional(),
      where: MilestoneWhereUniqueInputSchema,
    })
    .strict();

export const MilestoneFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MilestoneFindUniqueOrThrowArgs> =
  z
    .object({
      select: MilestoneSelectSchema.optional(),
      include: MilestoneIncludeSchema.optional(),
      where: MilestoneWhereUniqueInputSchema,
    })
    .strict();

export const ChecklistItemFindFirstArgsSchema: z.ZodType<Prisma.ChecklistItemFindFirstArgs> =
  z
    .object({
      select: ChecklistItemSelectSchema.optional(),
      include: ChecklistItemIncludeSchema.optional(),
      where: ChecklistItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ChecklistItemOrderByWithRelationInputSchema.array(),
          ChecklistItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ChecklistItemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ChecklistItemScalarFieldEnumSchema,
          ChecklistItemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChecklistItemFindFirstOrThrowArgs> =
  z
    .object({
      select: ChecklistItemSelectSchema.optional(),
      include: ChecklistItemIncludeSchema.optional(),
      where: ChecklistItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ChecklistItemOrderByWithRelationInputSchema.array(),
          ChecklistItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ChecklistItemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ChecklistItemScalarFieldEnumSchema,
          ChecklistItemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemFindManyArgsSchema: z.ZodType<Prisma.ChecklistItemFindManyArgs> =
  z
    .object({
      select: ChecklistItemSelectSchema.optional(),
      include: ChecklistItemIncludeSchema.optional(),
      where: ChecklistItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ChecklistItemOrderByWithRelationInputSchema.array(),
          ChecklistItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ChecklistItemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ChecklistItemScalarFieldEnumSchema,
          ChecklistItemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ChecklistItemAggregateArgsSchema: z.ZodType<Prisma.ChecklistItemAggregateArgs> =
  z
    .object({
      where: ChecklistItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ChecklistItemOrderByWithRelationInputSchema.array(),
          ChecklistItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ChecklistItemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ChecklistItemGroupByArgsSchema: z.ZodType<Prisma.ChecklistItemGroupByArgs> =
  z
    .object({
      where: ChecklistItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ChecklistItemOrderByWithAggregationInputSchema.array(),
          ChecklistItemOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ChecklistItemScalarFieldEnumSchema.array(),
      having: ChecklistItemScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ChecklistItemFindUniqueArgsSchema: z.ZodType<Prisma.ChecklistItemFindUniqueArgs> =
  z
    .object({
      select: ChecklistItemSelectSchema.optional(),
      include: ChecklistItemIncludeSchema.optional(),
      where: ChecklistItemWhereUniqueInputSchema,
    })
    .strict();

export const ChecklistItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChecklistItemFindUniqueOrThrowArgs> =
  z
    .object({
      select: ChecklistItemSelectSchema.optional(),
      include: ChecklistItemIncludeSchema.optional(),
      where: ChecklistItemWhereUniqueInputSchema,
    })
    .strict();

export const DocumentFindFirstArgsSchema: z.ZodType<Prisma.DocumentFindFirstArgs> =
  z
    .object({
      select: DocumentSelectSchema.optional(),
      include: DocumentIncludeSchema.optional(),
      where: DocumentWhereInputSchema.optional(),
      orderBy: z
        .union([
          DocumentOrderByWithRelationInputSchema.array(),
          DocumentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DocumentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DocumentScalarFieldEnumSchema,
          DocumentScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const DocumentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DocumentFindFirstOrThrowArgs> =
  z
    .object({
      select: DocumentSelectSchema.optional(),
      include: DocumentIncludeSchema.optional(),
      where: DocumentWhereInputSchema.optional(),
      orderBy: z
        .union([
          DocumentOrderByWithRelationInputSchema.array(),
          DocumentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DocumentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DocumentScalarFieldEnumSchema,
          DocumentScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const DocumentFindManyArgsSchema: z.ZodType<Prisma.DocumentFindManyArgs> =
  z
    .object({
      select: DocumentSelectSchema.optional(),
      include: DocumentIncludeSchema.optional(),
      where: DocumentWhereInputSchema.optional(),
      orderBy: z
        .union([
          DocumentOrderByWithRelationInputSchema.array(),
          DocumentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DocumentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DocumentScalarFieldEnumSchema,
          DocumentScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const DocumentAggregateArgsSchema: z.ZodType<Prisma.DocumentAggregateArgs> =
  z
    .object({
      where: DocumentWhereInputSchema.optional(),
      orderBy: z
        .union([
          DocumentOrderByWithRelationInputSchema.array(),
          DocumentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DocumentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const DocumentGroupByArgsSchema: z.ZodType<Prisma.DocumentGroupByArgs> =
  z
    .object({
      where: DocumentWhereInputSchema.optional(),
      orderBy: z
        .union([
          DocumentOrderByWithAggregationInputSchema.array(),
          DocumentOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: DocumentScalarFieldEnumSchema.array(),
      having: DocumentScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const DocumentFindUniqueArgsSchema: z.ZodType<Prisma.DocumentFindUniqueArgs> =
  z
    .object({
      select: DocumentSelectSchema.optional(),
      include: DocumentIncludeSchema.optional(),
      where: DocumentWhereUniqueInputSchema,
    })
    .strict();

export const DocumentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DocumentFindUniqueOrThrowArgs> =
  z
    .object({
      select: DocumentSelectSchema.optional(),
      include: DocumentIncludeSchema.optional(),
      where: DocumentWhereUniqueInputSchema,
    })
    .strict();

export const SiteImageFindFirstArgsSchema: z.ZodType<Prisma.SiteImageFindFirstArgs> =
  z
    .object({
      select: SiteImageSelectSchema.optional(),
      include: SiteImageIncludeSchema.optional(),
      where: SiteImageWhereInputSchema.optional(),
      orderBy: z
        .union([
          SiteImageOrderByWithRelationInputSchema.array(),
          SiteImageOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SiteImageWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SiteImageScalarFieldEnumSchema,
          SiteImageScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SiteImageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SiteImageFindFirstOrThrowArgs> =
  z
    .object({
      select: SiteImageSelectSchema.optional(),
      include: SiteImageIncludeSchema.optional(),
      where: SiteImageWhereInputSchema.optional(),
      orderBy: z
        .union([
          SiteImageOrderByWithRelationInputSchema.array(),
          SiteImageOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SiteImageWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SiteImageScalarFieldEnumSchema,
          SiteImageScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SiteImageFindManyArgsSchema: z.ZodType<Prisma.SiteImageFindManyArgs> =
  z
    .object({
      select: SiteImageSelectSchema.optional(),
      include: SiteImageIncludeSchema.optional(),
      where: SiteImageWhereInputSchema.optional(),
      orderBy: z
        .union([
          SiteImageOrderByWithRelationInputSchema.array(),
          SiteImageOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SiteImageWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SiteImageScalarFieldEnumSchema,
          SiteImageScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SiteImageAggregateArgsSchema: z.ZodType<Prisma.SiteImageAggregateArgs> =
  z
    .object({
      where: SiteImageWhereInputSchema.optional(),
      orderBy: z
        .union([
          SiteImageOrderByWithRelationInputSchema.array(),
          SiteImageOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SiteImageWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SiteImageGroupByArgsSchema: z.ZodType<Prisma.SiteImageGroupByArgs> =
  z
    .object({
      where: SiteImageWhereInputSchema.optional(),
      orderBy: z
        .union([
          SiteImageOrderByWithAggregationInputSchema.array(),
          SiteImageOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: SiteImageScalarFieldEnumSchema.array(),
      having: SiteImageScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SiteImageFindUniqueArgsSchema: z.ZodType<Prisma.SiteImageFindUniqueArgs> =
  z
    .object({
      select: SiteImageSelectSchema.optional(),
      include: SiteImageIncludeSchema.optional(),
      where: SiteImageWhereUniqueInputSchema,
    })
    .strict();

export const SiteImageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SiteImageFindUniqueOrThrowArgs> =
  z
    .object({
      select: SiteImageSelectSchema.optional(),
      include: SiteImageIncludeSchema.optional(),
      where: SiteImageWhereUniqueInputSchema,
    })
    .strict();

export const OutgoingLetterFindFirstArgsSchema: z.ZodType<Prisma.OutgoingLetterFindFirstArgs> =
  z
    .object({
      select: OutgoingLetterSelectSchema.optional(),
      include: OutgoingLetterIncludeSchema.optional(),
      where: OutgoingLetterWhereInputSchema.optional(),
      orderBy: z
        .union([
          OutgoingLetterOrderByWithRelationInputSchema.array(),
          OutgoingLetterOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OutgoingLetterWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          OutgoingLetterScalarFieldEnumSchema,
          OutgoingLetterScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OutgoingLetterFindFirstOrThrowArgs> =
  z
    .object({
      select: OutgoingLetterSelectSchema.optional(),
      include: OutgoingLetterIncludeSchema.optional(),
      where: OutgoingLetterWhereInputSchema.optional(),
      orderBy: z
        .union([
          OutgoingLetterOrderByWithRelationInputSchema.array(),
          OutgoingLetterOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OutgoingLetterWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          OutgoingLetterScalarFieldEnumSchema,
          OutgoingLetterScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterFindManyArgsSchema: z.ZodType<Prisma.OutgoingLetterFindManyArgs> =
  z
    .object({
      select: OutgoingLetterSelectSchema.optional(),
      include: OutgoingLetterIncludeSchema.optional(),
      where: OutgoingLetterWhereInputSchema.optional(),
      orderBy: z
        .union([
          OutgoingLetterOrderByWithRelationInputSchema.array(),
          OutgoingLetterOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OutgoingLetterWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          OutgoingLetterScalarFieldEnumSchema,
          OutgoingLetterScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const OutgoingLetterAggregateArgsSchema: z.ZodType<Prisma.OutgoingLetterAggregateArgs> =
  z
    .object({
      where: OutgoingLetterWhereInputSchema.optional(),
      orderBy: z
        .union([
          OutgoingLetterOrderByWithRelationInputSchema.array(),
          OutgoingLetterOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OutgoingLetterWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const OutgoingLetterGroupByArgsSchema: z.ZodType<Prisma.OutgoingLetterGroupByArgs> =
  z
    .object({
      where: OutgoingLetterWhereInputSchema.optional(),
      orderBy: z
        .union([
          OutgoingLetterOrderByWithAggregationInputSchema.array(),
          OutgoingLetterOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: OutgoingLetterScalarFieldEnumSchema.array(),
      having: OutgoingLetterScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const OutgoingLetterFindUniqueArgsSchema: z.ZodType<Prisma.OutgoingLetterFindUniqueArgs> =
  z
    .object({
      select: OutgoingLetterSelectSchema.optional(),
      include: OutgoingLetterIncludeSchema.optional(),
      where: OutgoingLetterWhereUniqueInputSchema,
    })
    .strict();

export const OutgoingLetterFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OutgoingLetterFindUniqueOrThrowArgs> =
  z
    .object({
      select: OutgoingLetterSelectSchema.optional(),
      include: OutgoingLetterIncludeSchema.optional(),
      where: OutgoingLetterWhereUniqueInputSchema,
    })
    .strict();

export const IncomingLetterFindFirstArgsSchema: z.ZodType<Prisma.IncomingLetterFindFirstArgs> =
  z
    .object({
      select: IncomingLetterSelectSchema.optional(),
      include: IncomingLetterIncludeSchema.optional(),
      where: IncomingLetterWhereInputSchema.optional(),
      orderBy: z
        .union([
          IncomingLetterOrderByWithRelationInputSchema.array(),
          IncomingLetterOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: IncomingLetterWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          IncomingLetterScalarFieldEnumSchema,
          IncomingLetterScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IncomingLetterFindFirstOrThrowArgs> =
  z
    .object({
      select: IncomingLetterSelectSchema.optional(),
      include: IncomingLetterIncludeSchema.optional(),
      where: IncomingLetterWhereInputSchema.optional(),
      orderBy: z
        .union([
          IncomingLetterOrderByWithRelationInputSchema.array(),
          IncomingLetterOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: IncomingLetterWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          IncomingLetterScalarFieldEnumSchema,
          IncomingLetterScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterFindManyArgsSchema: z.ZodType<Prisma.IncomingLetterFindManyArgs> =
  z
    .object({
      select: IncomingLetterSelectSchema.optional(),
      include: IncomingLetterIncludeSchema.optional(),
      where: IncomingLetterWhereInputSchema.optional(),
      orderBy: z
        .union([
          IncomingLetterOrderByWithRelationInputSchema.array(),
          IncomingLetterOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: IncomingLetterWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          IncomingLetterScalarFieldEnumSchema,
          IncomingLetterScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const IncomingLetterAggregateArgsSchema: z.ZodType<Prisma.IncomingLetterAggregateArgs> =
  z
    .object({
      where: IncomingLetterWhereInputSchema.optional(),
      orderBy: z
        .union([
          IncomingLetterOrderByWithRelationInputSchema.array(),
          IncomingLetterOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: IncomingLetterWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const IncomingLetterGroupByArgsSchema: z.ZodType<Prisma.IncomingLetterGroupByArgs> =
  z
    .object({
      where: IncomingLetterWhereInputSchema.optional(),
      orderBy: z
        .union([
          IncomingLetterOrderByWithAggregationInputSchema.array(),
          IncomingLetterOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: IncomingLetterScalarFieldEnumSchema.array(),
      having: IncomingLetterScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const IncomingLetterFindUniqueArgsSchema: z.ZodType<Prisma.IncomingLetterFindUniqueArgs> =
  z
    .object({
      select: IncomingLetterSelectSchema.optional(),
      include: IncomingLetterIncludeSchema.optional(),
      where: IncomingLetterWhereUniqueInputSchema,
    })
    .strict();

export const IncomingLetterFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IncomingLetterFindUniqueOrThrowArgs> =
  z
    .object({
      select: IncomingLetterSelectSchema.optional(),
      include: IncomingLetterIncludeSchema.optional(),
      where: IncomingLetterWhereUniqueInputSchema,
    })
    .strict();

export const ReportFindFirstArgsSchema: z.ZodType<Prisma.ReportFindFirstArgs> =
  z
    .object({
      select: ReportSelectSchema.optional(),
      include: ReportIncludeSchema.optional(),
      where: ReportWhereInputSchema.optional(),
      orderBy: z
        .union([
          ReportOrderByWithRelationInputSchema.array(),
          ReportOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ReportWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ReportScalarFieldEnumSchema,
          ReportScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ReportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportFindFirstOrThrowArgs> =
  z
    .object({
      select: ReportSelectSchema.optional(),
      include: ReportIncludeSchema.optional(),
      where: ReportWhereInputSchema.optional(),
      orderBy: z
        .union([
          ReportOrderByWithRelationInputSchema.array(),
          ReportOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ReportWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ReportScalarFieldEnumSchema,
          ReportScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ReportFindManyArgsSchema: z.ZodType<Prisma.ReportFindManyArgs> = z
  .object({
    select: ReportSelectSchema.optional(),
    include: ReportIncludeSchema.optional(),
    where: ReportWhereInputSchema.optional(),
    orderBy: z
      .union([
        ReportOrderByWithRelationInputSchema.array(),
        ReportOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ReportWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ReportScalarFieldEnumSchema, ReportScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const ReportAggregateArgsSchema: z.ZodType<Prisma.ReportAggregateArgs> =
  z
    .object({
      where: ReportWhereInputSchema.optional(),
      orderBy: z
        .union([
          ReportOrderByWithRelationInputSchema.array(),
          ReportOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ReportWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ReportGroupByArgsSchema: z.ZodType<Prisma.ReportGroupByArgs> = z
  .object({
    where: ReportWhereInputSchema.optional(),
    orderBy: z
      .union([
        ReportOrderByWithAggregationInputSchema.array(),
        ReportOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ReportScalarFieldEnumSchema.array(),
    having: ReportScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ReportFindUniqueArgsSchema: z.ZodType<Prisma.ReportFindUniqueArgs> =
  z
    .object({
      select: ReportSelectSchema.optional(),
      include: ReportIncludeSchema.optional(),
      where: ReportWhereUniqueInputSchema,
    })
    .strict();

export const ReportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReportFindUniqueOrThrowArgs> =
  z
    .object({
      select: ReportSelectSchema.optional(),
      include: ReportIncludeSchema.optional(),
      where: ReportWhereUniqueInputSchema,
    })
    .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
  })
  .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const ProjectCreateArgsSchema: z.ZodType<Prisma.ProjectCreateArgs> = z
  .object({
    select: ProjectSelectSchema.optional(),
    include: ProjectIncludeSchema.optional(),
    data: z.union([
      ProjectCreateInputSchema,
      ProjectUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const ProjectUpsertArgsSchema: z.ZodType<Prisma.ProjectUpsertArgs> = z
  .object({
    select: ProjectSelectSchema.optional(),
    include: ProjectIncludeSchema.optional(),
    where: ProjectWhereUniqueInputSchema,
    create: z.union([
      ProjectCreateInputSchema,
      ProjectUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ProjectUpdateInputSchema,
      ProjectUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ProjectCreateManyArgsSchema: z.ZodType<Prisma.ProjectCreateManyArgs> =
  z
    .object({
      data: z.union([
        ProjectCreateManyInputSchema,
        ProjectCreateManyInputSchema.array(),
      ]),
    })
    .strict();

export const ProjectDeleteArgsSchema: z.ZodType<Prisma.ProjectDeleteArgs> = z
  .object({
    select: ProjectSelectSchema.optional(),
    include: ProjectIncludeSchema.optional(),
    where: ProjectWhereUniqueInputSchema,
  })
  .strict();

export const ProjectUpdateArgsSchema: z.ZodType<Prisma.ProjectUpdateArgs> = z
  .object({
    select: ProjectSelectSchema.optional(),
    include: ProjectIncludeSchema.optional(),
    data: z.union([
      ProjectUpdateInputSchema,
      ProjectUncheckedUpdateInputSchema,
    ]),
    where: ProjectWhereUniqueInputSchema,
  })
  .strict();

export const ProjectUpdateManyArgsSchema: z.ZodType<Prisma.ProjectUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ProjectUpdateManyMutationInputSchema,
        ProjectUncheckedUpdateManyInputSchema,
      ]),
      where: ProjectWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ProjectDeleteManyArgsSchema: z.ZodType<Prisma.ProjectDeleteManyArgs> =
  z
    .object({
      where: ProjectWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const BudgetCreateArgsSchema: z.ZodType<Prisma.BudgetCreateArgs> = z
  .object({
    select: BudgetSelectSchema.optional(),
    include: BudgetIncludeSchema.optional(),
    data: z.union([BudgetCreateInputSchema, BudgetUncheckedCreateInputSchema]),
  })
  .strict();

export const BudgetUpsertArgsSchema: z.ZodType<Prisma.BudgetUpsertArgs> = z
  .object({
    select: BudgetSelectSchema.optional(),
    include: BudgetIncludeSchema.optional(),
    where: BudgetWhereUniqueInputSchema,
    create: z.union([
      BudgetCreateInputSchema,
      BudgetUncheckedCreateInputSchema,
    ]),
    update: z.union([
      BudgetUpdateInputSchema,
      BudgetUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const BudgetCreateManyArgsSchema: z.ZodType<Prisma.BudgetCreateManyArgs> =
  z
    .object({
      data: z.union([
        BudgetCreateManyInputSchema,
        BudgetCreateManyInputSchema.array(),
      ]),
    })
    .strict();

export const BudgetDeleteArgsSchema: z.ZodType<Prisma.BudgetDeleteArgs> = z
  .object({
    select: BudgetSelectSchema.optional(),
    include: BudgetIncludeSchema.optional(),
    where: BudgetWhereUniqueInputSchema,
  })
  .strict();

export const BudgetUpdateArgsSchema: z.ZodType<Prisma.BudgetUpdateArgs> = z
  .object({
    select: BudgetSelectSchema.optional(),
    include: BudgetIncludeSchema.optional(),
    data: z.union([BudgetUpdateInputSchema, BudgetUncheckedUpdateInputSchema]),
    where: BudgetWhereUniqueInputSchema,
  })
  .strict();

export const BudgetUpdateManyArgsSchema: z.ZodType<Prisma.BudgetUpdateManyArgs> =
  z
    .object({
      data: z.union([
        BudgetUpdateManyMutationInputSchema,
        BudgetUncheckedUpdateManyInputSchema,
      ]),
      where: BudgetWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const BudgetDeleteManyArgsSchema: z.ZodType<Prisma.BudgetDeleteManyArgs> =
  z
    .object({
      where: BudgetWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const TeamCreateArgsSchema: z.ZodType<Prisma.TeamCreateArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    data: z.union([TeamCreateInputSchema, TeamUncheckedCreateInputSchema]),
  })
  .strict();

export const TeamUpsertArgsSchema: z.ZodType<Prisma.TeamUpsertArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    where: TeamWhereUniqueInputSchema,
    create: z.union([TeamCreateInputSchema, TeamUncheckedCreateInputSchema]),
    update: z.union([TeamUpdateInputSchema, TeamUncheckedUpdateInputSchema]),
  })
  .strict();

export const TeamCreateManyArgsSchema: z.ZodType<Prisma.TeamCreateManyArgs> = z
  .object({
    data: z.union([
      TeamCreateManyInputSchema,
      TeamCreateManyInputSchema.array(),
    ]),
  })
  .strict();

export const TeamDeleteArgsSchema: z.ZodType<Prisma.TeamDeleteArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    where: TeamWhereUniqueInputSchema,
  })
  .strict();

export const TeamUpdateArgsSchema: z.ZodType<Prisma.TeamUpdateArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    data: z.union([TeamUpdateInputSchema, TeamUncheckedUpdateInputSchema]),
    where: TeamWhereUniqueInputSchema,
  })
  .strict();

export const TeamUpdateManyArgsSchema: z.ZodType<Prisma.TeamUpdateManyArgs> = z
  .object({
    data: z.union([
      TeamUpdateManyMutationInputSchema,
      TeamUncheckedUpdateManyInputSchema,
    ]),
    where: TeamWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const TeamDeleteManyArgsSchema: z.ZodType<Prisma.TeamDeleteManyArgs> = z
  .object({
    where: TeamWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const MilestoneCreateArgsSchema: z.ZodType<Prisma.MilestoneCreateArgs> =
  z
    .object({
      select: MilestoneSelectSchema.optional(),
      include: MilestoneIncludeSchema.optional(),
      data: z.union([
        MilestoneCreateInputSchema,
        MilestoneUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const MilestoneUpsertArgsSchema: z.ZodType<Prisma.MilestoneUpsertArgs> =
  z
    .object({
      select: MilestoneSelectSchema.optional(),
      include: MilestoneIncludeSchema.optional(),
      where: MilestoneWhereUniqueInputSchema,
      create: z.union([
        MilestoneCreateInputSchema,
        MilestoneUncheckedCreateInputSchema,
      ]),
      update: z.union([
        MilestoneUpdateInputSchema,
        MilestoneUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const MilestoneCreateManyArgsSchema: z.ZodType<Prisma.MilestoneCreateManyArgs> =
  z
    .object({
      data: z.union([
        MilestoneCreateManyInputSchema,
        MilestoneCreateManyInputSchema.array(),
      ]),
    })
    .strict();

export const MilestoneDeleteArgsSchema: z.ZodType<Prisma.MilestoneDeleteArgs> =
  z
    .object({
      select: MilestoneSelectSchema.optional(),
      include: MilestoneIncludeSchema.optional(),
      where: MilestoneWhereUniqueInputSchema,
    })
    .strict();

export const MilestoneUpdateArgsSchema: z.ZodType<Prisma.MilestoneUpdateArgs> =
  z
    .object({
      select: MilestoneSelectSchema.optional(),
      include: MilestoneIncludeSchema.optional(),
      data: z.union([
        MilestoneUpdateInputSchema,
        MilestoneUncheckedUpdateInputSchema,
      ]),
      where: MilestoneWhereUniqueInputSchema,
    })
    .strict();

export const MilestoneUpdateManyArgsSchema: z.ZodType<Prisma.MilestoneUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MilestoneUpdateManyMutationInputSchema,
        MilestoneUncheckedUpdateManyInputSchema,
      ]),
      where: MilestoneWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const MilestoneDeleteManyArgsSchema: z.ZodType<Prisma.MilestoneDeleteManyArgs> =
  z
    .object({
      where: MilestoneWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ChecklistItemCreateArgsSchema: z.ZodType<Prisma.ChecklistItemCreateArgs> =
  z
    .object({
      select: ChecklistItemSelectSchema.optional(),
      include: ChecklistItemIncludeSchema.optional(),
      data: z.union([
        ChecklistItemCreateInputSchema,
        ChecklistItemUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const ChecklistItemUpsertArgsSchema: z.ZodType<Prisma.ChecklistItemUpsertArgs> =
  z
    .object({
      select: ChecklistItemSelectSchema.optional(),
      include: ChecklistItemIncludeSchema.optional(),
      where: ChecklistItemWhereUniqueInputSchema,
      create: z.union([
        ChecklistItemCreateInputSchema,
        ChecklistItemUncheckedCreateInputSchema,
      ]),
      update: z.union([
        ChecklistItemUpdateInputSchema,
        ChecklistItemUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const ChecklistItemCreateManyArgsSchema: z.ZodType<Prisma.ChecklistItemCreateManyArgs> =
  z
    .object({
      data: z.union([
        ChecklistItemCreateManyInputSchema,
        ChecklistItemCreateManyInputSchema.array(),
      ]),
    })
    .strict();

export const ChecklistItemDeleteArgsSchema: z.ZodType<Prisma.ChecklistItemDeleteArgs> =
  z
    .object({
      select: ChecklistItemSelectSchema.optional(),
      include: ChecklistItemIncludeSchema.optional(),
      where: ChecklistItemWhereUniqueInputSchema,
    })
    .strict();

export const ChecklistItemUpdateArgsSchema: z.ZodType<Prisma.ChecklistItemUpdateArgs> =
  z
    .object({
      select: ChecklistItemSelectSchema.optional(),
      include: ChecklistItemIncludeSchema.optional(),
      data: z.union([
        ChecklistItemUpdateInputSchema,
        ChecklistItemUncheckedUpdateInputSchema,
      ]),
      where: ChecklistItemWhereUniqueInputSchema,
    })
    .strict();

export const ChecklistItemUpdateManyArgsSchema: z.ZodType<Prisma.ChecklistItemUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ChecklistItemUpdateManyMutationInputSchema,
        ChecklistItemUncheckedUpdateManyInputSchema,
      ]),
      where: ChecklistItemWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ChecklistItemDeleteManyArgsSchema: z.ZodType<Prisma.ChecklistItemDeleteManyArgs> =
  z
    .object({
      where: ChecklistItemWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const DocumentCreateArgsSchema: z.ZodType<Prisma.DocumentCreateArgs> = z
  .object({
    select: DocumentSelectSchema.optional(),
    include: DocumentIncludeSchema.optional(),
    data: z.union([
      DocumentCreateInputSchema,
      DocumentUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const DocumentUpsertArgsSchema: z.ZodType<Prisma.DocumentUpsertArgs> = z
  .object({
    select: DocumentSelectSchema.optional(),
    include: DocumentIncludeSchema.optional(),
    where: DocumentWhereUniqueInputSchema,
    create: z.union([
      DocumentCreateInputSchema,
      DocumentUncheckedCreateInputSchema,
    ]),
    update: z.union([
      DocumentUpdateInputSchema,
      DocumentUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const DocumentCreateManyArgsSchema: z.ZodType<Prisma.DocumentCreateManyArgs> =
  z
    .object({
      data: z.union([
        DocumentCreateManyInputSchema,
        DocumentCreateManyInputSchema.array(),
      ]),
    })
    .strict();

export const DocumentDeleteArgsSchema: z.ZodType<Prisma.DocumentDeleteArgs> = z
  .object({
    select: DocumentSelectSchema.optional(),
    include: DocumentIncludeSchema.optional(),
    where: DocumentWhereUniqueInputSchema,
  })
  .strict();

export const DocumentUpdateArgsSchema: z.ZodType<Prisma.DocumentUpdateArgs> = z
  .object({
    select: DocumentSelectSchema.optional(),
    include: DocumentIncludeSchema.optional(),
    data: z.union([
      DocumentUpdateInputSchema,
      DocumentUncheckedUpdateInputSchema,
    ]),
    where: DocumentWhereUniqueInputSchema,
  })
  .strict();

export const DocumentUpdateManyArgsSchema: z.ZodType<Prisma.DocumentUpdateManyArgs> =
  z
    .object({
      data: z.union([
        DocumentUpdateManyMutationInputSchema,
        DocumentUncheckedUpdateManyInputSchema,
      ]),
      where: DocumentWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const DocumentDeleteManyArgsSchema: z.ZodType<Prisma.DocumentDeleteManyArgs> =
  z
    .object({
      where: DocumentWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const SiteImageCreateArgsSchema: z.ZodType<Prisma.SiteImageCreateArgs> =
  z
    .object({
      select: SiteImageSelectSchema.optional(),
      include: SiteImageIncludeSchema.optional(),
      data: z.union([
        SiteImageCreateInputSchema,
        SiteImageUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const SiteImageUpsertArgsSchema: z.ZodType<Prisma.SiteImageUpsertArgs> =
  z
    .object({
      select: SiteImageSelectSchema.optional(),
      include: SiteImageIncludeSchema.optional(),
      where: SiteImageWhereUniqueInputSchema,
      create: z.union([
        SiteImageCreateInputSchema,
        SiteImageUncheckedCreateInputSchema,
      ]),
      update: z.union([
        SiteImageUpdateInputSchema,
        SiteImageUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const SiteImageCreateManyArgsSchema: z.ZodType<Prisma.SiteImageCreateManyArgs> =
  z
    .object({
      data: z.union([
        SiteImageCreateManyInputSchema,
        SiteImageCreateManyInputSchema.array(),
      ]),
    })
    .strict();

export const SiteImageDeleteArgsSchema: z.ZodType<Prisma.SiteImageDeleteArgs> =
  z
    .object({
      select: SiteImageSelectSchema.optional(),
      include: SiteImageIncludeSchema.optional(),
      where: SiteImageWhereUniqueInputSchema,
    })
    .strict();

export const SiteImageUpdateArgsSchema: z.ZodType<Prisma.SiteImageUpdateArgs> =
  z
    .object({
      select: SiteImageSelectSchema.optional(),
      include: SiteImageIncludeSchema.optional(),
      data: z.union([
        SiteImageUpdateInputSchema,
        SiteImageUncheckedUpdateInputSchema,
      ]),
      where: SiteImageWhereUniqueInputSchema,
    })
    .strict();

export const SiteImageUpdateManyArgsSchema: z.ZodType<Prisma.SiteImageUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SiteImageUpdateManyMutationInputSchema,
        SiteImageUncheckedUpdateManyInputSchema,
      ]),
      where: SiteImageWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const SiteImageDeleteManyArgsSchema: z.ZodType<Prisma.SiteImageDeleteManyArgs> =
  z
    .object({
      where: SiteImageWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const OutgoingLetterCreateArgsSchema: z.ZodType<Prisma.OutgoingLetterCreateArgs> =
  z
    .object({
      select: OutgoingLetterSelectSchema.optional(),
      include: OutgoingLetterIncludeSchema.optional(),
      data: z.union([
        OutgoingLetterCreateInputSchema,
        OutgoingLetterUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const OutgoingLetterUpsertArgsSchema: z.ZodType<Prisma.OutgoingLetterUpsertArgs> =
  z
    .object({
      select: OutgoingLetterSelectSchema.optional(),
      include: OutgoingLetterIncludeSchema.optional(),
      where: OutgoingLetterWhereUniqueInputSchema,
      create: z.union([
        OutgoingLetterCreateInputSchema,
        OutgoingLetterUncheckedCreateInputSchema,
      ]),
      update: z.union([
        OutgoingLetterUpdateInputSchema,
        OutgoingLetterUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const OutgoingLetterCreateManyArgsSchema: z.ZodType<Prisma.OutgoingLetterCreateManyArgs> =
  z
    .object({
      data: z.union([
        OutgoingLetterCreateManyInputSchema,
        OutgoingLetterCreateManyInputSchema.array(),
      ]),
    })
    .strict();

export const OutgoingLetterDeleteArgsSchema: z.ZodType<Prisma.OutgoingLetterDeleteArgs> =
  z
    .object({
      select: OutgoingLetterSelectSchema.optional(),
      include: OutgoingLetterIncludeSchema.optional(),
      where: OutgoingLetterWhereUniqueInputSchema,
    })
    .strict();

export const OutgoingLetterUpdateArgsSchema: z.ZodType<Prisma.OutgoingLetterUpdateArgs> =
  z
    .object({
      select: OutgoingLetterSelectSchema.optional(),
      include: OutgoingLetterIncludeSchema.optional(),
      data: z.union([
        OutgoingLetterUpdateInputSchema,
        OutgoingLetterUncheckedUpdateInputSchema,
      ]),
      where: OutgoingLetterWhereUniqueInputSchema,
    })
    .strict();

export const OutgoingLetterUpdateManyArgsSchema: z.ZodType<Prisma.OutgoingLetterUpdateManyArgs> =
  z
    .object({
      data: z.union([
        OutgoingLetterUpdateManyMutationInputSchema,
        OutgoingLetterUncheckedUpdateManyInputSchema,
      ]),
      where: OutgoingLetterWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const OutgoingLetterDeleteManyArgsSchema: z.ZodType<Prisma.OutgoingLetterDeleteManyArgs> =
  z
    .object({
      where: OutgoingLetterWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const IncomingLetterCreateArgsSchema: z.ZodType<Prisma.IncomingLetterCreateArgs> =
  z
    .object({
      select: IncomingLetterSelectSchema.optional(),
      include: IncomingLetterIncludeSchema.optional(),
      data: z.union([
        IncomingLetterCreateInputSchema,
        IncomingLetterUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const IncomingLetterUpsertArgsSchema: z.ZodType<Prisma.IncomingLetterUpsertArgs> =
  z
    .object({
      select: IncomingLetterSelectSchema.optional(),
      include: IncomingLetterIncludeSchema.optional(),
      where: IncomingLetterWhereUniqueInputSchema,
      create: z.union([
        IncomingLetterCreateInputSchema,
        IncomingLetterUncheckedCreateInputSchema,
      ]),
      update: z.union([
        IncomingLetterUpdateInputSchema,
        IncomingLetterUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const IncomingLetterCreateManyArgsSchema: z.ZodType<Prisma.IncomingLetterCreateManyArgs> =
  z
    .object({
      data: z.union([
        IncomingLetterCreateManyInputSchema,
        IncomingLetterCreateManyInputSchema.array(),
      ]),
    })
    .strict();

export const IncomingLetterDeleteArgsSchema: z.ZodType<Prisma.IncomingLetterDeleteArgs> =
  z
    .object({
      select: IncomingLetterSelectSchema.optional(),
      include: IncomingLetterIncludeSchema.optional(),
      where: IncomingLetterWhereUniqueInputSchema,
    })
    .strict();

export const IncomingLetterUpdateArgsSchema: z.ZodType<Prisma.IncomingLetterUpdateArgs> =
  z
    .object({
      select: IncomingLetterSelectSchema.optional(),
      include: IncomingLetterIncludeSchema.optional(),
      data: z.union([
        IncomingLetterUpdateInputSchema,
        IncomingLetterUncheckedUpdateInputSchema,
      ]),
      where: IncomingLetterWhereUniqueInputSchema,
    })
    .strict();

export const IncomingLetterUpdateManyArgsSchema: z.ZodType<Prisma.IncomingLetterUpdateManyArgs> =
  z
    .object({
      data: z.union([
        IncomingLetterUpdateManyMutationInputSchema,
        IncomingLetterUncheckedUpdateManyInputSchema,
      ]),
      where: IncomingLetterWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const IncomingLetterDeleteManyArgsSchema: z.ZodType<Prisma.IncomingLetterDeleteManyArgs> =
  z
    .object({
      where: IncomingLetterWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ReportCreateArgsSchema: z.ZodType<Prisma.ReportCreateArgs> = z
  .object({
    select: ReportSelectSchema.optional(),
    include: ReportIncludeSchema.optional(),
    data: z.union([ReportCreateInputSchema, ReportUncheckedCreateInputSchema]),
  })
  .strict();

export const ReportUpsertArgsSchema: z.ZodType<Prisma.ReportUpsertArgs> = z
  .object({
    select: ReportSelectSchema.optional(),
    include: ReportIncludeSchema.optional(),
    where: ReportWhereUniqueInputSchema,
    create: z.union([
      ReportCreateInputSchema,
      ReportUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ReportUpdateInputSchema,
      ReportUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ReportCreateManyArgsSchema: z.ZodType<Prisma.ReportCreateManyArgs> =
  z
    .object({
      data: z.union([
        ReportCreateManyInputSchema,
        ReportCreateManyInputSchema.array(),
      ]),
    })
    .strict();

export const ReportDeleteArgsSchema: z.ZodType<Prisma.ReportDeleteArgs> = z
  .object({
    select: ReportSelectSchema.optional(),
    include: ReportIncludeSchema.optional(),
    where: ReportWhereUniqueInputSchema,
  })
  .strict();

export const ReportUpdateArgsSchema: z.ZodType<Prisma.ReportUpdateArgs> = z
  .object({
    select: ReportSelectSchema.optional(),
    include: ReportIncludeSchema.optional(),
    data: z.union([ReportUpdateInputSchema, ReportUncheckedUpdateInputSchema]),
    where: ReportWhereUniqueInputSchema,
  })
  .strict();

export const ReportUpdateManyArgsSchema: z.ZodType<Prisma.ReportUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ReportUpdateManyMutationInputSchema,
        ReportUncheckedUpdateManyInputSchema,
      ]),
      where: ReportWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ReportDeleteManyArgsSchema: z.ZodType<Prisma.ReportDeleteManyArgs> =
  z
    .object({
      where: ReportWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();
