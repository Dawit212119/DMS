import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','password','createdAt','updatedAt']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','projectName','clientName','location','startDate','dueDate','progress']);

export const BudgetScalarFieldEnumSchema = z.enum(['id','total','spent','projectId']);

export const TeamScalarFieldEnumSchema = z.enum(['id','projectManger','siteManger','civilManger','architecturalLoad','totalWorker','projectId']);

export const UpcomingMilstoneScalarFieldEnumSchema = z.enum(['id','title','date','status','projectId']);

export const CheckListScalarFieldEnumSchema = z.enum(['id','task','assignedTo','dueData','priority','completed','projectId']);

export const DocumentsScalarFieldEnumSchema = z.enum(['id','name','date','projectId','downloadedUrl']);

export const TheIncomingLetterScalarFieldEnumSchema = z.enum(['id','sender','subject','priority','status','projectId','createdAt','downloadedUrl','updatedAt']);

export const TheOutgoingLetterScalarFieldEnumSchema = z.enum(['id','recipent','subject','status','priority','createdAt','downloadedUrl','projectId']);

export const ReportScalarFieldEnumSchema = z.enum(['id','publisher','status','uploadedDate','lastModified','version','downloadedUrl','reportType','projectId']);

export const ConstructionSiteImageScalarFieldEnumSchema = z.enum(['id','title','imagesrc','location','date','category','projectId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const StatusSchema = z.enum(['ontrack','atrisk']);

export type StatusType = `${z.infer<typeof StatusSchema>}`

export const PrioritySchema = z.enum(['high','medium','low']);

export type PriorityType = `${z.infer<typeof PrioritySchema>}`

export const IncomingStatusSchema = z.enum(['read','unread']);

export type IncomingStatusType = `${z.infer<typeof IncomingStatusSchema>}`

export const OutgoingStatusSchema = z.enum(['sent','draft']);

export type OutgoingStatusType = `${z.infer<typeof OutgoingStatusSchema>}`

export const reportStatusSchema = z.enum(['approved','rejected']);

export type reportStatusType = `${z.infer<typeof reportStatusSchema>}`

export const reportTypeSchema = z.enum(['daily','weekly','monthly','annually','quarterly']);

export type reportTypeType = `${z.infer<typeof reportTypeSchema>}`

export const categorySchema = z.enum(['foundation','structural','electrical','plumbing','exterior','aerial']);

export type categoryType = `${z.infer<typeof categorySchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  progress: z.number().int(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// BUDGET SCHEMA
/////////////////////////////////////////

export const BudgetSchema = z.object({
  id: z.string(),
  total: z.number(),
  spent: z.number(),
  projectId: z.string(),
})

export type Budget = z.infer<typeof BudgetSchema>

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////

export const TeamSchema = z.object({
  id: z.string(),
  projectManger: z.string(),
  siteManger: z.string(),
  civilManger: z.string(),
  architecturalLoad: z.string(),
  totalWorker: z.number().int(),
  projectId: z.string(),
})

export type Team = z.infer<typeof TeamSchema>

/////////////////////////////////////////
// UPCOMING MILSTONE SCHEMA
/////////////////////////////////////////

export const UpcomingMilstoneSchema = z.object({
  status: StatusSchema,
  id: z.string(),
  title: z.string(),
  date: z.coerce.date(),
  projectId: z.string(),
})

export type UpcomingMilstone = z.infer<typeof UpcomingMilstoneSchema>

/////////////////////////////////////////
// CHECK LIST SCHEMA
/////////////////////////////////////////

export const CheckListSchema = z.object({
  task: StatusSchema,
  priority: PrioritySchema,
  id: z.string(),
  assignedTo: z.string(),
  dueData: z.coerce.date(),
  completed: z.boolean(),
  projectId: z.string(),
})

export type CheckList = z.infer<typeof CheckListSchema>

/////////////////////////////////////////
// DOCUMENTS SCHEMA
/////////////////////////////////////////

export const DocumentsSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.coerce.date(),
  projectId: z.string(),
  downloadedUrl: z.string(),
})

export type Documents = z.infer<typeof DocumentsSchema>

/////////////////////////////////////////
// THE INCOMING LETTER SCHEMA
/////////////////////////////////////////

export const TheIncomingLetterSchema = z.object({
  priority: PrioritySchema,
  status: IncomingStatusSchema,
  id: z.string(),
  sender: z.string(),
  subject: z.string(),
  projectId: z.string(),
  createdAt: z.coerce.date(),
  downloadedUrl: z.string(),
  updatedAt: z.coerce.date(),
})

export type TheIncomingLetter = z.infer<typeof TheIncomingLetterSchema>

/////////////////////////////////////////
// THE OUTGOING LETTER SCHEMA
/////////////////////////////////////////

export const TheOutgoingLetterSchema = z.object({
  status: OutgoingStatusSchema,
  priority: PrioritySchema,
  id: z.string(),
  recipent: z.string(),
  subject: z.string(),
  createdAt: z.coerce.date(),
  downloadedUrl: z.string(),
  projectId: z.string(),
})

export type TheOutgoingLetter = z.infer<typeof TheOutgoingLetterSchema>

/////////////////////////////////////////
// REPORT SCHEMA
/////////////////////////////////////////

export const ReportSchema = z.object({
  status: reportStatusSchema,
  reportType: reportTypeSchema,
  id: z.string(),
  publisher: z.string(),
  uploadedDate: z.coerce.date(),
  lastModified: z.coerce.date(),
  version: z.string(),
  downloadedUrl: z.string(),
  projectId: z.string(),
})

export type Report = z.infer<typeof ReportSchema>

/////////////////////////////////////////
// CONSTRUCTION SITE IMAGE SCHEMA
/////////////////////////////////////////

export const ConstructionSiteImageSchema = z.object({
  category: categorySchema,
  id: z.string(),
  title: z.string(),
  imagesrc: z.string(),
  location: z.string(),
  date: z.coerce.date(),
  projectId: z.string(),
})

export type ConstructionSiteImage = z.infer<typeof ConstructionSiteImageSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// PROJECT
//------------------------------------------------------

export const ProjectIncludeSchema: z.ZodType<Prisma.ProjectInclude> = z.object({
}).strict()

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectDefaultArgs> = z.object({
  select: z.lazy(() => ProjectSelectSchema).optional(),
  include: z.lazy(() => ProjectIncludeSchema).optional(),
}).strict();

export const ProjectCountOutputTypeArgsSchema: z.ZodType<Prisma.ProjectCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProjectCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProjectCountOutputTypeSelectSchema: z.ZodType<Prisma.ProjectCountOutputTypeSelect> = z.object({
  budget: z.boolean().optional(),
  team: z.boolean().optional(),
  checkList: z.boolean().optional(),
  documents: z.boolean().optional(),
  theIncomingLetter: z.boolean().optional(),
  theOutgoingLetter: z.boolean().optional(),
  report: z.boolean().optional(),
  constructionSiteImage: z.boolean().optional(),
}).strict();

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
  id: z.boolean().optional(),
  projectName: z.boolean().optional(),
  clientName: z.boolean().optional(),
  location: z.boolean().optional(),
  startDate: z.boolean().optional(),
  dueDate: z.boolean().optional(),
  progress: z.boolean().optional(),
  budget: z.union([z.boolean(),z.lazy(() => BudgetArgsSchema)]).optional(),
  team: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  upcomingMilstone: z.union([z.boolean(),z.lazy(() => UpcomingMilstoneArgsSchema)]).optional(),
  checkList: z.union([z.boolean(),z.lazy(() => CheckListArgsSchema)]).optional(),
  documents: z.union([z.boolean(),z.lazy(() => DocumentsArgsSchema)]).optional(),
  theIncomingLetter: z.union([z.boolean(),z.lazy(() => TheIncomingLetterArgsSchema)]).optional(),
  theOutgoingLetter: z.union([z.boolean(),z.lazy(() => TheOutgoingLetterArgsSchema)]).optional(),
  report: z.union([z.boolean(),z.lazy(() => ReportArgsSchema)]).optional(),
  constructionSiteImage: z.union([z.boolean(),z.lazy(() => ConstructionSiteImageArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BUDGET
//------------------------------------------------------

export const BudgetIncludeSchema: z.ZodType<Prisma.BudgetInclude> = z.object({
}).strict()

export const BudgetArgsSchema: z.ZodType<Prisma.BudgetDefaultArgs> = z.object({
  select: z.lazy(() => BudgetSelectSchema).optional(),
  include: z.lazy(() => BudgetIncludeSchema).optional(),
}).strict();

export const BudgetSelectSchema: z.ZodType<Prisma.BudgetSelect> = z.object({
  id: z.boolean().optional(),
  total: z.boolean().optional(),
  spent: z.boolean().optional(),
  projectId: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// TEAM
//------------------------------------------------------

export const TeamIncludeSchema: z.ZodType<Prisma.TeamInclude> = z.object({
}).strict()

export const TeamArgsSchema: z.ZodType<Prisma.TeamDefaultArgs> = z.object({
  select: z.lazy(() => TeamSelectSchema).optional(),
  include: z.lazy(() => TeamIncludeSchema).optional(),
}).strict();

export const TeamSelectSchema: z.ZodType<Prisma.TeamSelect> = z.object({
  id: z.boolean().optional(),
  projectManger: z.boolean().optional(),
  siteManger: z.boolean().optional(),
  civilManger: z.boolean().optional(),
  architecturalLoad: z.boolean().optional(),
  totalWorker: z.boolean().optional(),
  projectId: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// UPCOMING MILSTONE
//------------------------------------------------------

export const UpcomingMilstoneIncludeSchema: z.ZodType<Prisma.UpcomingMilstoneInclude> = z.object({
}).strict()

export const UpcomingMilstoneArgsSchema: z.ZodType<Prisma.UpcomingMilstoneDefaultArgs> = z.object({
  select: z.lazy(() => UpcomingMilstoneSelectSchema).optional(),
  include: z.lazy(() => UpcomingMilstoneIncludeSchema).optional(),
}).strict();

export const UpcomingMilstoneSelectSchema: z.ZodType<Prisma.UpcomingMilstoneSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  date: z.boolean().optional(),
  status: z.boolean().optional(),
  projectId: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// CHECK LIST
//------------------------------------------------------

export const CheckListIncludeSchema: z.ZodType<Prisma.CheckListInclude> = z.object({
}).strict()

export const CheckListArgsSchema: z.ZodType<Prisma.CheckListDefaultArgs> = z.object({
  select: z.lazy(() => CheckListSelectSchema).optional(),
  include: z.lazy(() => CheckListIncludeSchema).optional(),
}).strict();

export const CheckListSelectSchema: z.ZodType<Prisma.CheckListSelect> = z.object({
  id: z.boolean().optional(),
  task: z.boolean().optional(),
  assignedTo: z.boolean().optional(),
  dueData: z.boolean().optional(),
  priority: z.boolean().optional(),
  completed: z.boolean().optional(),
  projectId: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// DOCUMENTS
//------------------------------------------------------

export const DocumentsIncludeSchema: z.ZodType<Prisma.DocumentsInclude> = z.object({
}).strict()

export const DocumentsArgsSchema: z.ZodType<Prisma.DocumentsDefaultArgs> = z.object({
  select: z.lazy(() => DocumentsSelectSchema).optional(),
  include: z.lazy(() => DocumentsIncludeSchema).optional(),
}).strict();

export const DocumentsSelectSchema: z.ZodType<Prisma.DocumentsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  date: z.boolean().optional(),
  projectId: z.boolean().optional(),
  downloadedUrl: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// THE INCOMING LETTER
//------------------------------------------------------

export const TheIncomingLetterIncludeSchema: z.ZodType<Prisma.TheIncomingLetterInclude> = z.object({
}).strict()

export const TheIncomingLetterArgsSchema: z.ZodType<Prisma.TheIncomingLetterDefaultArgs> = z.object({
  select: z.lazy(() => TheIncomingLetterSelectSchema).optional(),
  include: z.lazy(() => TheIncomingLetterIncludeSchema).optional(),
}).strict();

export const TheIncomingLetterSelectSchema: z.ZodType<Prisma.TheIncomingLetterSelect> = z.object({
  id: z.boolean().optional(),
  sender: z.boolean().optional(),
  subject: z.boolean().optional(),
  priority: z.boolean().optional(),
  status: z.boolean().optional(),
  projectId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  downloadedUrl: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// THE OUTGOING LETTER
//------------------------------------------------------

export const TheOutgoingLetterIncludeSchema: z.ZodType<Prisma.TheOutgoingLetterInclude> = z.object({
}).strict()

export const TheOutgoingLetterArgsSchema: z.ZodType<Prisma.TheOutgoingLetterDefaultArgs> = z.object({
  select: z.lazy(() => TheOutgoingLetterSelectSchema).optional(),
  include: z.lazy(() => TheOutgoingLetterIncludeSchema).optional(),
}).strict();

export const TheOutgoingLetterSelectSchema: z.ZodType<Prisma.TheOutgoingLetterSelect> = z.object({
  id: z.boolean().optional(),
  recipent: z.boolean().optional(),
  subject: z.boolean().optional(),
  status: z.boolean().optional(),
  priority: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  downloadedUrl: z.boolean().optional(),
  projectId: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// REPORT
//------------------------------------------------------

export const ReportIncludeSchema: z.ZodType<Prisma.ReportInclude> = z.object({
}).strict()

export const ReportArgsSchema: z.ZodType<Prisma.ReportDefaultArgs> = z.object({
  select: z.lazy(() => ReportSelectSchema).optional(),
  include: z.lazy(() => ReportIncludeSchema).optional(),
}).strict();

export const ReportSelectSchema: z.ZodType<Prisma.ReportSelect> = z.object({
  id: z.boolean().optional(),
  publisher: z.boolean().optional(),
  status: z.boolean().optional(),
  uploadedDate: z.boolean().optional(),
  lastModified: z.boolean().optional(),
  version: z.boolean().optional(),
  downloadedUrl: z.boolean().optional(),
  reportType: z.boolean().optional(),
  projectId: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

// CONSTRUCTION SITE IMAGE
//------------------------------------------------------

export const ConstructionSiteImageIncludeSchema: z.ZodType<Prisma.ConstructionSiteImageInclude> = z.object({
}).strict()

export const ConstructionSiteImageArgsSchema: z.ZodType<Prisma.ConstructionSiteImageDefaultArgs> = z.object({
  select: z.lazy(() => ConstructionSiteImageSelectSchema).optional(),
  include: z.lazy(() => ConstructionSiteImageIncludeSchema).optional(),
}).strict();

export const ConstructionSiteImageSelectSchema: z.ZodType<Prisma.ConstructionSiteImageSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  imagesrc: z.boolean().optional(),
  location: z.boolean().optional(),
  date: z.boolean().optional(),
  category: z.boolean().optional(),
  projectId: z.boolean().optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clientName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  progress: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  budget: z.lazy(() => BudgetListRelationFilterSchema).optional(),
  team: z.lazy(() => TeamListRelationFilterSchema).optional(),
  upcomingMilstone: z.union([ z.lazy(() => UpcomingMilstoneNullableScalarRelationFilterSchema),z.lazy(() => UpcomingMilstoneWhereInputSchema) ]).optional().nullable(),
  checkList: z.lazy(() => CheckListListRelationFilterSchema).optional(),
  documents: z.lazy(() => DocumentsListRelationFilterSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterListRelationFilterSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterListRelationFilterSchema).optional(),
  report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageListRelationFilterSchema).optional()
}).strict();

export const ProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  projectName: z.lazy(() => SortOrderSchema).optional(),
  clientName: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => BudgetOrderByRelationAggregateInputSchema).optional(),
  team: z.lazy(() => TeamOrderByRelationAggregateInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneOrderByWithRelationInputSchema).optional(),
  checkList: z.lazy(() => CheckListOrderByRelationAggregateInputSchema).optional(),
  documents: z.lazy(() => DocumentsOrderByRelationAggregateInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterOrderByRelationAggregateInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterOrderByRelationAggregateInputSchema).optional(),
  report: z.lazy(() => ReportOrderByRelationAggregateInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProjectWhereUniqueInputSchema: z.ZodType<Prisma.ProjectWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  projectName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clientName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  progress: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  budget: z.lazy(() => BudgetListRelationFilterSchema).optional(),
  team: z.lazy(() => TeamListRelationFilterSchema).optional(),
  upcomingMilstone: z.union([ z.lazy(() => UpcomingMilstoneNullableScalarRelationFilterSchema),z.lazy(() => UpcomingMilstoneWhereInputSchema) ]).optional().nullable(),
  checkList: z.lazy(() => CheckListListRelationFilterSchema).optional(),
  documents: z.lazy(() => DocumentsListRelationFilterSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterListRelationFilterSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterListRelationFilterSchema).optional(),
  report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageListRelationFilterSchema).optional()
}).strict());

export const ProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  projectName: z.lazy(() => SortOrderSchema).optional(),
  clientName: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProjectAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProjectSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  clientName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  progress: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const BudgetWhereInputSchema: z.ZodType<Prisma.BudgetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BudgetWhereInputSchema),z.lazy(() => BudgetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BudgetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BudgetWhereInputSchema),z.lazy(() => BudgetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  total: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  spent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const BudgetOrderByWithRelationInputSchema: z.ZodType<Prisma.BudgetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  spent: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const BudgetWhereUniqueInputSchema: z.ZodType<Prisma.BudgetWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => BudgetWhereInputSchema),z.lazy(() => BudgetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BudgetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BudgetWhereInputSchema),z.lazy(() => BudgetWhereInputSchema).array() ]).optional(),
  total: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  spent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const BudgetOrderByWithAggregationInputSchema: z.ZodType<Prisma.BudgetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  spent: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BudgetCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BudgetAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BudgetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BudgetMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BudgetSumOrderByAggregateInputSchema).optional()
}).strict();

export const BudgetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BudgetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BudgetScalarWhereWithAggregatesInputSchema),z.lazy(() => BudgetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BudgetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BudgetScalarWhereWithAggregatesInputSchema),z.lazy(() => BudgetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  total: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  spent: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TeamWhereInputSchema: z.ZodType<Prisma.TeamWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectManger: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  siteManger: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  civilManger: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  architecturalLoad: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalWorker: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const TeamOrderByWithRelationInputSchema: z.ZodType<Prisma.TeamOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  projectManger: z.lazy(() => SortOrderSchema).optional(),
  siteManger: z.lazy(() => SortOrderSchema).optional(),
  civilManger: z.lazy(() => SortOrderSchema).optional(),
  architecturalLoad: z.lazy(() => SortOrderSchema).optional(),
  totalWorker: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const TeamWhereUniqueInputSchema: z.ZodType<Prisma.TeamWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  projectManger: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  siteManger: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  civilManger: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  architecturalLoad: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalWorker: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const TeamOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeamOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  projectManger: z.lazy(() => SortOrderSchema).optional(),
  siteManger: z.lazy(() => SortOrderSchema).optional(),
  civilManger: z.lazy(() => SortOrderSchema).optional(),
  architecturalLoad: z.lazy(() => SortOrderSchema).optional(),
  totalWorker: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TeamCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TeamAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TeamMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TeamMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TeamSumOrderByAggregateInputSchema).optional()
}).strict();

export const TeamScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeamScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectManger: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  siteManger: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  civilManger: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  architecturalLoad: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  totalWorker: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UpcomingMilstoneWhereInputSchema: z.ZodType<Prisma.UpcomingMilstoneWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UpcomingMilstoneWhereInputSchema),z.lazy(() => UpcomingMilstoneWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UpcomingMilstoneWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UpcomingMilstoneWhereInputSchema),z.lazy(() => UpcomingMilstoneWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const UpcomingMilstoneOrderByWithRelationInputSchema: z.ZodType<Prisma.UpcomingMilstoneOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const UpcomingMilstoneWhereUniqueInputSchema: z.ZodType<Prisma.UpcomingMilstoneWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    projectId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    projectId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  projectId: z.string().optional(),
  AND: z.union([ z.lazy(() => UpcomingMilstoneWhereInputSchema),z.lazy(() => UpcomingMilstoneWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UpcomingMilstoneWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UpcomingMilstoneWhereInputSchema),z.lazy(() => UpcomingMilstoneWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const UpcomingMilstoneOrderByWithAggregationInputSchema: z.ZodType<Prisma.UpcomingMilstoneOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UpcomingMilstoneCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UpcomingMilstoneMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UpcomingMilstoneMinOrderByAggregateInputSchema).optional()
}).strict();

export const UpcomingMilstoneScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UpcomingMilstoneScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UpcomingMilstoneScalarWhereWithAggregatesInputSchema),z.lazy(() => UpcomingMilstoneScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UpcomingMilstoneScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UpcomingMilstoneScalarWhereWithAggregatesInputSchema),z.lazy(() => UpcomingMilstoneScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusWithAggregatesFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CheckListWhereInputSchema: z.ZodType<Prisma.CheckListWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CheckListWhereInputSchema),z.lazy(() => CheckListWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckListWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckListWhereInputSchema),z.lazy(() => CheckListWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  task: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  assignedTo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dueData: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const CheckListOrderByWithRelationInputSchema: z.ZodType<Prisma.CheckListOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => SortOrderSchema).optional(),
  assignedTo: z.lazy(() => SortOrderSchema).optional(),
  dueData: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const CheckListWhereUniqueInputSchema: z.ZodType<Prisma.CheckListWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CheckListWhereInputSchema),z.lazy(() => CheckListWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckListWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckListWhereInputSchema),z.lazy(() => CheckListWhereInputSchema).array() ]).optional(),
  task: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  assignedTo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dueData: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const CheckListOrderByWithAggregationInputSchema: z.ZodType<Prisma.CheckListOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => SortOrderSchema).optional(),
  assignedTo: z.lazy(() => SortOrderSchema).optional(),
  dueData: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CheckListCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CheckListMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CheckListMinOrderByAggregateInputSchema).optional()
}).strict();

export const CheckListScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CheckListScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CheckListScalarWhereWithAggregatesInputSchema),z.lazy(() => CheckListScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckListScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckListScalarWhereWithAggregatesInputSchema),z.lazy(() => CheckListScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  task: z.union([ z.lazy(() => EnumStatusWithAggregatesFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  assignedTo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dueData: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityWithAggregatesFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  completed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DocumentsWhereInputSchema: z.ZodType<Prisma.DocumentsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentsWhereInputSchema),z.lazy(() => DocumentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentsWhereInputSchema),z.lazy(() => DocumentsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const DocumentsOrderByWithRelationInputSchema: z.ZodType<Prisma.DocumentsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const DocumentsWhereUniqueInputSchema: z.ZodType<Prisma.DocumentsWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DocumentsWhereInputSchema),z.lazy(() => DocumentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentsWhereInputSchema),z.lazy(() => DocumentsWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const DocumentsOrderByWithAggregationInputSchema: z.ZodType<Prisma.DocumentsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DocumentsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DocumentsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DocumentsMinOrderByAggregateInputSchema).optional()
}).strict();

export const DocumentsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DocumentsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentsScalarWhereWithAggregatesInputSchema),z.lazy(() => DocumentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentsScalarWhereWithAggregatesInputSchema),z.lazy(() => DocumentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TheIncomingLetterWhereInputSchema: z.ZodType<Prisma.TheIncomingLetterWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TheIncomingLetterWhereInputSchema),z.lazy(() => TheIncomingLetterWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TheIncomingLetterWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TheIncomingLetterWhereInputSchema),z.lazy(() => TheIncomingLetterWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sender: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumIncomingStatusFilterSchema),z.lazy(() => IncomingStatusSchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const TheIncomingLetterOrderByWithRelationInputSchema: z.ZodType<Prisma.TheIncomingLetterOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sender: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const TheIncomingLetterWhereUniqueInputSchema: z.ZodType<Prisma.TheIncomingLetterWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TheIncomingLetterWhereInputSchema),z.lazy(() => TheIncomingLetterWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TheIncomingLetterWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TheIncomingLetterWhereInputSchema),z.lazy(() => TheIncomingLetterWhereInputSchema).array() ]).optional(),
  sender: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumIncomingStatusFilterSchema),z.lazy(() => IncomingStatusSchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const TheIncomingLetterOrderByWithAggregationInputSchema: z.ZodType<Prisma.TheIncomingLetterOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sender: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TheIncomingLetterCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TheIncomingLetterMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TheIncomingLetterMinOrderByAggregateInputSchema).optional()
}).strict();

export const TheIncomingLetterScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TheIncomingLetterScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TheIncomingLetterScalarWhereWithAggregatesInputSchema),z.lazy(() => TheIncomingLetterScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TheIncomingLetterScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TheIncomingLetterScalarWhereWithAggregatesInputSchema),z.lazy(() => TheIncomingLetterScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sender: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityWithAggregatesFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumIncomingStatusWithAggregatesFilterSchema),z.lazy(() => IncomingStatusSchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TheOutgoingLetterWhereInputSchema: z.ZodType<Prisma.TheOutgoingLetterWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TheOutgoingLetterWhereInputSchema),z.lazy(() => TheOutgoingLetterWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TheOutgoingLetterWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TheOutgoingLetterWhereInputSchema),z.lazy(() => TheOutgoingLetterWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumOutgoingStatusFilterSchema),z.lazy(() => OutgoingStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const TheOutgoingLetterOrderByWithRelationInputSchema: z.ZodType<Prisma.TheOutgoingLetterOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  recipent: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const TheOutgoingLetterWhereUniqueInputSchema: z.ZodType<Prisma.TheOutgoingLetterWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TheOutgoingLetterWhereInputSchema),z.lazy(() => TheOutgoingLetterWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TheOutgoingLetterWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TheOutgoingLetterWhereInputSchema),z.lazy(() => TheOutgoingLetterWhereInputSchema).array() ]).optional(),
  recipent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumOutgoingStatusFilterSchema),z.lazy(() => OutgoingStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const TheOutgoingLetterOrderByWithAggregationInputSchema: z.ZodType<Prisma.TheOutgoingLetterOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  recipent: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TheOutgoingLetterCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TheOutgoingLetterMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TheOutgoingLetterMinOrderByAggregateInputSchema).optional()
}).strict();

export const TheOutgoingLetterScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TheOutgoingLetterScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TheOutgoingLetterScalarWhereWithAggregatesInputSchema),z.lazy(() => TheOutgoingLetterScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TheOutgoingLetterScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TheOutgoingLetterScalarWhereWithAggregatesInputSchema),z.lazy(() => TheOutgoingLetterScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  recipent: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumOutgoingStatusWithAggregatesFilterSchema),z.lazy(() => OutgoingStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityWithAggregatesFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ReportWhereInputSchema: z.ZodType<Prisma.ReportWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publisher: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumreportStatusFilterSchema),z.lazy(() => reportStatusSchema) ]).optional(),
  uploadedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastModified: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportType: z.union([ z.lazy(() => EnumreportTypeFilterSchema),z.lazy(() => reportTypeSchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const ReportOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  uploadedDate: z.lazy(() => SortOrderSchema).optional(),
  lastModified: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const ReportWhereUniqueInputSchema: z.ZodType<Prisma.ReportWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  publisher: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumreportStatusFilterSchema),z.lazy(() => reportStatusSchema) ]).optional(),
  uploadedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastModified: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportType: z.union([ z.lazy(() => EnumreportTypeFilterSchema),z.lazy(() => reportTypeSchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const ReportOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  uploadedDate: z.lazy(() => SortOrderSchema).optional(),
  lastModified: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReportCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReportMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReportMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  publisher: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumreportStatusWithAggregatesFilterSchema),z.lazy(() => reportStatusSchema) ]).optional(),
  uploadedDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  lastModified: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  version: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reportType: z.union([ z.lazy(() => EnumreportTypeWithAggregatesFilterSchema),z.lazy(() => reportTypeSchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ConstructionSiteImageWhereInputSchema: z.ZodType<Prisma.ConstructionSiteImageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConstructionSiteImageWhereInputSchema),z.lazy(() => ConstructionSiteImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConstructionSiteImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConstructionSiteImageWhereInputSchema),z.lazy(() => ConstructionSiteImageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imagesrc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  category: z.union([ z.lazy(() => EnumcategoryFilterSchema),z.lazy(() => categorySchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export const ConstructionSiteImageOrderByWithRelationInputSchema: z.ZodType<Prisma.ConstructionSiteImageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  imagesrc: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const ConstructionSiteImageWhereUniqueInputSchema: z.ZodType<Prisma.ConstructionSiteImageWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ConstructionSiteImageWhereInputSchema),z.lazy(() => ConstructionSiteImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConstructionSiteImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConstructionSiteImageWhereInputSchema),z.lazy(() => ConstructionSiteImageWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imagesrc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  category: z.union([ z.lazy(() => EnumcategoryFilterSchema),z.lazy(() => categorySchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export const ConstructionSiteImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConstructionSiteImageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  imagesrc: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ConstructionSiteImageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ConstructionSiteImageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ConstructionSiteImageMinOrderByAggregateInputSchema).optional()
}).strict();

export const ConstructionSiteImageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConstructionSiteImageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ConstructionSiteImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ConstructionSiteImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConstructionSiteImageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConstructionSiteImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ConstructionSiteImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imagesrc: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  category: z.union([ z.lazy(() => EnumcategoryWithAggregatesFilterSchema),z.lazy(() => categorySchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUpdateInputSchema: z.ZodType<Prisma.ProjectUpdateInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateManyInputSchema: z.ZodType<Prisma.ProjectCreateManyInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int()
}).strict();

export const ProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectUpdateManyMutationInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BudgetCreateInputSchema: z.ZodType<Prisma.BudgetCreateInput> = z.object({
  id: z.string().optional(),
  total: z.number(),
  spent: z.number(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutBudgetInputSchema)
}).strict();

export const BudgetUncheckedCreateInputSchema: z.ZodType<Prisma.BudgetUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  total: z.number(),
  spent: z.number(),
  projectId: z.string()
}).strict();

export const BudgetUpdateInputSchema: z.ZodType<Prisma.BudgetUpdateInput> = z.object({
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  spent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutBudgetNestedInputSchema).optional()
}).strict();

export const BudgetUncheckedUpdateInputSchema: z.ZodType<Prisma.BudgetUncheckedUpdateInput> = z.object({
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  spent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BudgetCreateManyInputSchema: z.ZodType<Prisma.BudgetCreateManyInput> = z.object({
  id: z.string().optional(),
  total: z.number(),
  spent: z.number(),
  projectId: z.string()
}).strict();

export const BudgetUpdateManyMutationInputSchema: z.ZodType<Prisma.BudgetUpdateManyMutationInput> = z.object({
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  spent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BudgetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BudgetUncheckedUpdateManyInput> = z.object({
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  spent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamCreateInputSchema: z.ZodType<Prisma.TeamCreateInput> = z.object({
  id: z.string().optional(),
  projectManger: z.string(),
  siteManger: z.string(),
  civilManger: z.string(),
  architecturalLoad: z.string(),
  totalWorker: z.number().int(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutTeamInputSchema)
}).strict();

export const TeamUncheckedCreateInputSchema: z.ZodType<Prisma.TeamUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  projectManger: z.string(),
  siteManger: z.string(),
  civilManger: z.string(),
  architecturalLoad: z.string(),
  totalWorker: z.number().int(),
  projectId: z.string()
}).strict();

export const TeamUpdateInputSchema: z.ZodType<Prisma.TeamUpdateInput> = z.object({
  projectManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  siteManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  civilManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  architecturalLoad: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalWorker: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateInput> = z.object({
  projectManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  siteManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  civilManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  architecturalLoad: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalWorker: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamCreateManyInputSchema: z.ZodType<Prisma.TeamCreateManyInput> = z.object({
  id: z.string().optional(),
  projectManger: z.string(),
  siteManger: z.string(),
  civilManger: z.string(),
  architecturalLoad: z.string(),
  totalWorker: z.number().int(),
  projectId: z.string()
}).strict();

export const TeamUpdateManyMutationInputSchema: z.ZodType<Prisma.TeamUpdateManyMutationInput> = z.object({
  projectManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  siteManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  civilManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  architecturalLoad: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalWorker: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyInput> = z.object({
  projectManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  siteManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  civilManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  architecturalLoad: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalWorker: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UpcomingMilstoneCreateInputSchema: z.ZodType<Prisma.UpcomingMilstoneCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  date: z.coerce.date().optional(),
  status: z.lazy(() => StatusSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutUpcomingMilstoneInputSchema)
}).strict();

export const UpcomingMilstoneUncheckedCreateInputSchema: z.ZodType<Prisma.UpcomingMilstoneUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  date: z.coerce.date().optional(),
  status: z.lazy(() => StatusSchema),
  projectId: z.string()
}).strict();

export const UpcomingMilstoneUpdateInputSchema: z.ZodType<Prisma.UpcomingMilstoneUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutUpcomingMilstoneNestedInputSchema).optional()
}).strict();

export const UpcomingMilstoneUncheckedUpdateInputSchema: z.ZodType<Prisma.UpcomingMilstoneUncheckedUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UpcomingMilstoneCreateManyInputSchema: z.ZodType<Prisma.UpcomingMilstoneCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  date: z.coerce.date().optional(),
  status: z.lazy(() => StatusSchema),
  projectId: z.string()
}).strict();

export const UpcomingMilstoneUpdateManyMutationInputSchema: z.ZodType<Prisma.UpcomingMilstoneUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UpcomingMilstoneUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UpcomingMilstoneUncheckedUpdateManyInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CheckListCreateInputSchema: z.ZodType<Prisma.CheckListCreateInput> = z.object({
  id: z.string().optional(),
  task: z.lazy(() => StatusSchema),
  assignedTo: z.string(),
  dueData: z.coerce.date().optional(),
  priority: z.lazy(() => PrioritySchema),
  completed: z.boolean(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutCheckListInputSchema)
}).strict();

export const CheckListUncheckedCreateInputSchema: z.ZodType<Prisma.CheckListUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  task: z.lazy(() => StatusSchema),
  assignedTo: z.string(),
  dueData: z.coerce.date().optional(),
  priority: z.lazy(() => PrioritySchema),
  completed: z.boolean(),
  projectId: z.string()
}).strict();

export const CheckListUpdateInputSchema: z.ZodType<Prisma.CheckListUpdateInput> = z.object({
  task: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueData: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutCheckListNestedInputSchema).optional()
}).strict();

export const CheckListUncheckedUpdateInputSchema: z.ZodType<Prisma.CheckListUncheckedUpdateInput> = z.object({
  task: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueData: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CheckListCreateManyInputSchema: z.ZodType<Prisma.CheckListCreateManyInput> = z.object({
  id: z.string().optional(),
  task: z.lazy(() => StatusSchema),
  assignedTo: z.string(),
  dueData: z.coerce.date().optional(),
  priority: z.lazy(() => PrioritySchema),
  completed: z.boolean(),
  projectId: z.string()
}).strict();

export const CheckListUpdateManyMutationInputSchema: z.ZodType<Prisma.CheckListUpdateManyMutationInput> = z.object({
  task: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueData: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CheckListUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CheckListUncheckedUpdateManyInput> = z.object({
  task: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueData: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentsCreateInputSchema: z.ZodType<Prisma.DocumentsCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  date: z.coerce.date().optional(),
  downloadedUrl: z.string(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutDocumentsInputSchema)
}).strict();

export const DocumentsUncheckedCreateInputSchema: z.ZodType<Prisma.DocumentsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  date: z.coerce.date().optional(),
  projectId: z.string(),
  downloadedUrl: z.string()
}).strict();

export const DocumentsUpdateInputSchema: z.ZodType<Prisma.DocumentsUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentsUncheckedUpdateInputSchema: z.ZodType<Prisma.DocumentsUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentsCreateManyInputSchema: z.ZodType<Prisma.DocumentsCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  date: z.coerce.date().optional(),
  projectId: z.string(),
  downloadedUrl: z.string()
}).strict();

export const DocumentsUpdateManyMutationInputSchema: z.ZodType<Prisma.DocumentsUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DocumentsUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheIncomingLetterCreateInputSchema: z.ZodType<Prisma.TheIncomingLetterCreateInput> = z.object({
  id: z.string().optional(),
  sender: z.string(),
  subject: z.string(),
  priority: z.lazy(() => PrioritySchema),
  status: z.lazy(() => IncomingStatusSchema),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string(),
  updatedAt: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutTheIncomingLetterInputSchema)
}).strict();

export const TheIncomingLetterUncheckedCreateInputSchema: z.ZodType<Prisma.TheIncomingLetterUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  sender: z.string(),
  subject: z.string(),
  priority: z.lazy(() => PrioritySchema),
  status: z.lazy(() => IncomingStatusSchema),
  projectId: z.string(),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TheIncomingLetterUpdateInputSchema: z.ZodType<Prisma.TheIncomingLetterUpdateInput> = z.object({
  sender: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutTheIncomingLetterNestedInputSchema).optional()
}).strict();

export const TheIncomingLetterUncheckedUpdateInputSchema: z.ZodType<Prisma.TheIncomingLetterUncheckedUpdateInput> = z.object({
  sender: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheIncomingLetterCreateManyInputSchema: z.ZodType<Prisma.TheIncomingLetterCreateManyInput> = z.object({
  id: z.string().optional(),
  sender: z.string(),
  subject: z.string(),
  priority: z.lazy(() => PrioritySchema),
  status: z.lazy(() => IncomingStatusSchema),
  projectId: z.string(),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TheIncomingLetterUpdateManyMutationInputSchema: z.ZodType<Prisma.TheIncomingLetterUpdateManyMutationInput> = z.object({
  sender: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheIncomingLetterUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TheIncomingLetterUncheckedUpdateManyInput> = z.object({
  sender: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheOutgoingLetterCreateInputSchema: z.ZodType<Prisma.TheOutgoingLetterCreateInput> = z.object({
  id: z.string().optional(),
  recipent: z.string(),
  subject: z.string(),
  status: z.lazy(() => OutgoingStatusSchema),
  priority: z.lazy(() => PrioritySchema),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutTheOutgoingLetterInputSchema)
}).strict();

export const TheOutgoingLetterUncheckedCreateInputSchema: z.ZodType<Prisma.TheOutgoingLetterUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  recipent: z.string(),
  subject: z.string(),
  status: z.lazy(() => OutgoingStatusSchema),
  priority: z.lazy(() => PrioritySchema),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string(),
  projectId: z.string()
}).strict();

export const TheOutgoingLetterUpdateInputSchema: z.ZodType<Prisma.TheOutgoingLetterUpdateInput> = z.object({
  recipent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutTheOutgoingLetterNestedInputSchema).optional()
}).strict();

export const TheOutgoingLetterUncheckedUpdateInputSchema: z.ZodType<Prisma.TheOutgoingLetterUncheckedUpdateInput> = z.object({
  recipent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheOutgoingLetterCreateManyInputSchema: z.ZodType<Prisma.TheOutgoingLetterCreateManyInput> = z.object({
  id: z.string().optional(),
  recipent: z.string(),
  subject: z.string(),
  status: z.lazy(() => OutgoingStatusSchema),
  priority: z.lazy(() => PrioritySchema),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string(),
  projectId: z.string()
}).strict();

export const TheOutgoingLetterUpdateManyMutationInputSchema: z.ZodType<Prisma.TheOutgoingLetterUpdateManyMutationInput> = z.object({
  recipent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheOutgoingLetterUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TheOutgoingLetterUncheckedUpdateManyInput> = z.object({
  recipent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateInputSchema: z.ZodType<Prisma.ReportCreateInput> = z.object({
  id: z.string().optional(),
  publisher: z.string(),
  status: z.lazy(() => reportStatusSchema),
  uploadedDate: z.coerce.date().optional(),
  lastModified: z.coerce.date().optional(),
  version: z.string(),
  downloadedUrl: z.string(),
  reportType: z.lazy(() => reportTypeSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutReportInputSchema)
}).strict();

export const ReportUncheckedCreateInputSchema: z.ZodType<Prisma.ReportUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  publisher: z.string(),
  status: z.lazy(() => reportStatusSchema),
  uploadedDate: z.coerce.date().optional(),
  lastModified: z.coerce.date().optional(),
  version: z.string(),
  downloadedUrl: z.string(),
  reportType: z.lazy(() => reportTypeSchema),
  projectId: z.string()
}).strict();

export const ReportUpdateInputSchema: z.ZodType<Prisma.ReportUpdateInput> = z.object({
  publisher: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => EnumreportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastModified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => EnumreportTypeFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateInput> = z.object({
  publisher: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => EnumreportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastModified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => EnumreportTypeFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateManyInputSchema: z.ZodType<Prisma.ReportCreateManyInput> = z.object({
  id: z.string().optional(),
  publisher: z.string(),
  status: z.lazy(() => reportStatusSchema),
  uploadedDate: z.coerce.date().optional(),
  lastModified: z.coerce.date().optional(),
  version: z.string(),
  downloadedUrl: z.string(),
  reportType: z.lazy(() => reportTypeSchema),
  projectId: z.string()
}).strict();

export const ReportUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportUpdateManyMutationInput> = z.object({
  publisher: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => EnumreportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastModified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => EnumreportTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyInput> = z.object({
  publisher: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => EnumreportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastModified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => EnumreportTypeFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConstructionSiteImageCreateInputSchema: z.ZodType<Prisma.ConstructionSiteImageCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  imagesrc: z.string(),
  location: z.string(),
  date: z.coerce.date().optional(),
  category: z.lazy(() => categorySchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutConstructionSiteImageInputSchema)
}).strict();

export const ConstructionSiteImageUncheckedCreateInputSchema: z.ZodType<Prisma.ConstructionSiteImageUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  imagesrc: z.string(),
  location: z.string(),
  date: z.coerce.date().optional(),
  category: z.lazy(() => categorySchema),
  projectId: z.string()
}).strict();

export const ConstructionSiteImageUpdateInputSchema: z.ZodType<Prisma.ConstructionSiteImageUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagesrc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => categorySchema),z.lazy(() => EnumcategoryFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutConstructionSiteImageNestedInputSchema).optional()
}).strict();

export const ConstructionSiteImageUncheckedUpdateInputSchema: z.ZodType<Prisma.ConstructionSiteImageUncheckedUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagesrc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => categorySchema),z.lazy(() => EnumcategoryFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConstructionSiteImageCreateManyInputSchema: z.ZodType<Prisma.ConstructionSiteImageCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  imagesrc: z.string(),
  location: z.string(),
  date: z.coerce.date().optional(),
  category: z.lazy(() => categorySchema),
  projectId: z.string()
}).strict();

export const ConstructionSiteImageUpdateManyMutationInputSchema: z.ZodType<Prisma.ConstructionSiteImageUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagesrc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => categorySchema),z.lazy(() => EnumcategoryFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConstructionSiteImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConstructionSiteImageUncheckedUpdateManyInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagesrc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => categorySchema),z.lazy(() => EnumcategoryFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const BudgetListRelationFilterSchema: z.ZodType<Prisma.BudgetListRelationFilter> = z.object({
  every: z.lazy(() => BudgetWhereInputSchema).optional(),
  some: z.lazy(() => BudgetWhereInputSchema).optional(),
  none: z.lazy(() => BudgetWhereInputSchema).optional()
}).strict();

export const TeamListRelationFilterSchema: z.ZodType<Prisma.TeamListRelationFilter> = z.object({
  every: z.lazy(() => TeamWhereInputSchema).optional(),
  some: z.lazy(() => TeamWhereInputSchema).optional(),
  none: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const UpcomingMilstoneNullableScalarRelationFilterSchema: z.ZodType<Prisma.UpcomingMilstoneNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UpcomingMilstoneWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UpcomingMilstoneWhereInputSchema).optional().nullable()
}).strict();

export const CheckListListRelationFilterSchema: z.ZodType<Prisma.CheckListListRelationFilter> = z.object({
  every: z.lazy(() => CheckListWhereInputSchema).optional(),
  some: z.lazy(() => CheckListWhereInputSchema).optional(),
  none: z.lazy(() => CheckListWhereInputSchema).optional()
}).strict();

export const DocumentsListRelationFilterSchema: z.ZodType<Prisma.DocumentsListRelationFilter> = z.object({
  every: z.lazy(() => DocumentsWhereInputSchema).optional(),
  some: z.lazy(() => DocumentsWhereInputSchema).optional(),
  none: z.lazy(() => DocumentsWhereInputSchema).optional()
}).strict();

export const TheIncomingLetterListRelationFilterSchema: z.ZodType<Prisma.TheIncomingLetterListRelationFilter> = z.object({
  every: z.lazy(() => TheIncomingLetterWhereInputSchema).optional(),
  some: z.lazy(() => TheIncomingLetterWhereInputSchema).optional(),
  none: z.lazy(() => TheIncomingLetterWhereInputSchema).optional()
}).strict();

export const TheOutgoingLetterListRelationFilterSchema: z.ZodType<Prisma.TheOutgoingLetterListRelationFilter> = z.object({
  every: z.lazy(() => TheOutgoingLetterWhereInputSchema).optional(),
  some: z.lazy(() => TheOutgoingLetterWhereInputSchema).optional(),
  none: z.lazy(() => TheOutgoingLetterWhereInputSchema).optional()
}).strict();

export const ReportListRelationFilterSchema: z.ZodType<Prisma.ReportListRelationFilter> = z.object({
  every: z.lazy(() => ReportWhereInputSchema).optional(),
  some: z.lazy(() => ReportWhereInputSchema).optional(),
  none: z.lazy(() => ReportWhereInputSchema).optional()
}).strict();

export const ConstructionSiteImageListRelationFilterSchema: z.ZodType<Prisma.ConstructionSiteImageListRelationFilter> = z.object({
  every: z.lazy(() => ConstructionSiteImageWhereInputSchema).optional(),
  some: z.lazy(() => ConstructionSiteImageWhereInputSchema).optional(),
  none: z.lazy(() => ConstructionSiteImageWhereInputSchema).optional()
}).strict();

export const BudgetOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BudgetOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TeamOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CheckListOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CheckListOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DocumentsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TheIncomingLetterOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TheIncomingLetterOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TheOutgoingLetterOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TheOutgoingLetterOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReportOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConstructionSiteImageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ConstructionSiteImageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  projectName: z.lazy(() => SortOrderSchema).optional(),
  clientName: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectAvgOrderByAggregateInput> = z.object({
  progress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  projectName: z.lazy(() => SortOrderSchema).optional(),
  clientName: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  projectName: z.lazy(() => SortOrderSchema).optional(),
  clientName: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectSumOrderByAggregateInput> = z.object({
  progress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const ProjectScalarRelationFilterSchema: z.ZodType<Prisma.ProjectScalarRelationFilter> = z.object({
  is: z.lazy(() => ProjectWhereInputSchema).optional(),
  isNot: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const BudgetCountOrderByAggregateInputSchema: z.ZodType<Prisma.BudgetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  spent: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BudgetAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BudgetAvgOrderByAggregateInput> = z.object({
  total: z.lazy(() => SortOrderSchema).optional(),
  spent: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BudgetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BudgetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  spent: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BudgetMinOrderByAggregateInputSchema: z.ZodType<Prisma.BudgetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  spent: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BudgetSumOrderByAggregateInputSchema: z.ZodType<Prisma.BudgetSumOrderByAggregateInput> = z.object({
  total: z.lazy(() => SortOrderSchema).optional(),
  spent: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const TeamCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeamCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  projectManger: z.lazy(() => SortOrderSchema).optional(),
  siteManger: z.lazy(() => SortOrderSchema).optional(),
  civilManger: z.lazy(() => SortOrderSchema).optional(),
  architecturalLoad: z.lazy(() => SortOrderSchema).optional(),
  totalWorker: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TeamAvgOrderByAggregateInput> = z.object({
  totalWorker: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  projectManger: z.lazy(() => SortOrderSchema).optional(),
  siteManger: z.lazy(() => SortOrderSchema).optional(),
  civilManger: z.lazy(() => SortOrderSchema).optional(),
  architecturalLoad: z.lazy(() => SortOrderSchema).optional(),
  totalWorker: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  projectManger: z.lazy(() => SortOrderSchema).optional(),
  siteManger: z.lazy(() => SortOrderSchema).optional(),
  civilManger: z.lazy(() => SortOrderSchema).optional(),
  architecturalLoad: z.lazy(() => SortOrderSchema).optional(),
  totalWorker: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamSumOrderByAggregateInputSchema: z.ZodType<Prisma.TeamSumOrderByAggregateInput> = z.object({
  totalWorker: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumStatusFilterSchema: z.ZodType<Prisma.EnumStatusFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
}).strict();

export const UpcomingMilstoneCountOrderByAggregateInputSchema: z.ZodType<Prisma.UpcomingMilstoneCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UpcomingMilstoneMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UpcomingMilstoneMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UpcomingMilstoneMinOrderByAggregateInputSchema: z.ZodType<Prisma.UpcomingMilstoneMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional()
}).strict();

export const EnumPriorityFilterSchema: z.ZodType<Prisma.EnumPriorityFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const CheckListCountOrderByAggregateInputSchema: z.ZodType<Prisma.CheckListCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => SortOrderSchema).optional(),
  assignedTo: z.lazy(() => SortOrderSchema).optional(),
  dueData: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CheckListMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CheckListMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => SortOrderSchema).optional(),
  assignedTo: z.lazy(() => SortOrderSchema).optional(),
  dueData: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CheckListMinOrderByAggregateInputSchema: z.ZodType<Prisma.CheckListMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => SortOrderSchema).optional(),
  assignedTo: z.lazy(() => SortOrderSchema).optional(),
  dueData: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPriorityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPriorityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPriorityFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DocumentsCountOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentsMinOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumIncomingStatusFilterSchema: z.ZodType<Prisma.EnumIncomingStatusFilter> = z.object({
  equals: z.lazy(() => IncomingStatusSchema).optional(),
  in: z.lazy(() => IncomingStatusSchema).array().optional(),
  notIn: z.lazy(() => IncomingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => NestedEnumIncomingStatusFilterSchema) ]).optional(),
}).strict();

export const TheIncomingLetterCountOrderByAggregateInputSchema: z.ZodType<Prisma.TheIncomingLetterCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sender: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TheIncomingLetterMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TheIncomingLetterMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sender: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TheIncomingLetterMinOrderByAggregateInputSchema: z.ZodType<Prisma.TheIncomingLetterMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sender: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumIncomingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumIncomingStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IncomingStatusSchema).optional(),
  in: z.lazy(() => IncomingStatusSchema).array().optional(),
  notIn: z.lazy(() => IncomingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => NestedEnumIncomingStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIncomingStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIncomingStatusFilterSchema).optional()
}).strict();

export const EnumOutgoingStatusFilterSchema: z.ZodType<Prisma.EnumOutgoingStatusFilter> = z.object({
  equals: z.lazy(() => OutgoingStatusSchema).optional(),
  in: z.lazy(() => OutgoingStatusSchema).array().optional(),
  notIn: z.lazy(() => OutgoingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => NestedEnumOutgoingStatusFilterSchema) ]).optional(),
}).strict();

export const TheOutgoingLetterCountOrderByAggregateInputSchema: z.ZodType<Prisma.TheOutgoingLetterCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  recipent: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TheOutgoingLetterMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TheOutgoingLetterMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  recipent: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TheOutgoingLetterMinOrderByAggregateInputSchema: z.ZodType<Prisma.TheOutgoingLetterMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  recipent: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumOutgoingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumOutgoingStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => OutgoingStatusSchema).optional(),
  in: z.lazy(() => OutgoingStatusSchema).array().optional(),
  notIn: z.lazy(() => OutgoingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => NestedEnumOutgoingStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumOutgoingStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumOutgoingStatusFilterSchema).optional()
}).strict();

export const EnumreportStatusFilterSchema: z.ZodType<Prisma.EnumreportStatusFilter> = z.object({
  equals: z.lazy(() => reportStatusSchema).optional(),
  in: z.lazy(() => reportStatusSchema).array().optional(),
  notIn: z.lazy(() => reportStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => NestedEnumreportStatusFilterSchema) ]).optional(),
}).strict();

export const EnumreportTypeFilterSchema: z.ZodType<Prisma.EnumreportTypeFilter> = z.object({
  equals: z.lazy(() => reportTypeSchema).optional(),
  in: z.lazy(() => reportTypeSchema).array().optional(),
  notIn: z.lazy(() => reportTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => NestedEnumreportTypeFilterSchema) ]).optional(),
}).strict();

export const ReportCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  uploadedDate: z.lazy(() => SortOrderSchema).optional(),
  lastModified: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  uploadedDate: z.lazy(() => SortOrderSchema).optional(),
  lastModified: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  uploadedDate: z.lazy(() => SortOrderSchema).optional(),
  lastModified: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  downloadedUrl: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumreportStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumreportStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => reportStatusSchema).optional(),
  in: z.lazy(() => reportStatusSchema).array().optional(),
  notIn: z.lazy(() => reportStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => NestedEnumreportStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumreportStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumreportStatusFilterSchema).optional()
}).strict();

export const EnumreportTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumreportTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => reportTypeSchema).optional(),
  in: z.lazy(() => reportTypeSchema).array().optional(),
  notIn: z.lazy(() => reportTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => NestedEnumreportTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumreportTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumreportTypeFilterSchema).optional()
}).strict();

export const EnumcategoryFilterSchema: z.ZodType<Prisma.EnumcategoryFilter> = z.object({
  equals: z.lazy(() => categorySchema).optional(),
  in: z.lazy(() => categorySchema).array().optional(),
  notIn: z.lazy(() => categorySchema).array().optional(),
  not: z.union([ z.lazy(() => categorySchema),z.lazy(() => NestedEnumcategoryFilterSchema) ]).optional(),
}).strict();

export const ConstructionSiteImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConstructionSiteImageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  imagesrc: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConstructionSiteImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConstructionSiteImageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  imagesrc: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConstructionSiteImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConstructionSiteImageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  imagesrc: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumcategoryWithAggregatesFilterSchema: z.ZodType<Prisma.EnumcategoryWithAggregatesFilter> = z.object({
  equals: z.lazy(() => categorySchema).optional(),
  in: z.lazy(() => categorySchema).array().optional(),
  notIn: z.lazy(() => categorySchema).array().optional(),
  not: z.union([ z.lazy(() => categorySchema),z.lazy(() => NestedEnumcategoryWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumcategoryFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumcategoryFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BudgetCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.BudgetCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => BudgetCreateWithoutProjectInputSchema),z.lazy(() => BudgetCreateWithoutProjectInputSchema).array(),z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema),z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema),z.lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BudgetCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BudgetWhereUniqueInputSchema),z.lazy(() => BudgetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.TeamCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutProjectInputSchema),z.lazy(() => TeamCreateWithoutProjectInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TeamCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UpcomingMilstoneCreateNestedOneWithoutProjectInputSchema: z.ZodType<Prisma.UpcomingMilstoneCreateNestedOneWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => UpcomingMilstoneCreateWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUncheckedCreateWithoutProjectInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UpcomingMilstoneCreateOrConnectWithoutProjectInputSchema).optional(),
  connect: z.lazy(() => UpcomingMilstoneWhereUniqueInputSchema).optional()
}).strict();

export const CheckListCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.CheckListCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => CheckListCreateWithoutProjectInputSchema),z.lazy(() => CheckListCreateWithoutProjectInputSchema).array(),z.lazy(() => CheckListUncheckedCreateWithoutProjectInputSchema),z.lazy(() => CheckListUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckListCreateOrConnectWithoutProjectInputSchema),z.lazy(() => CheckListCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckListCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckListWhereUniqueInputSchema),z.lazy(() => CheckListWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentsCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => DocumentsCreateWithoutProjectInputSchema),z.lazy(() => DocumentsCreateWithoutProjectInputSchema).array(),z.lazy(() => DocumentsUncheckedCreateWithoutProjectInputSchema),z.lazy(() => DocumentsUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentsCreateOrConnectWithoutProjectInputSchema),z.lazy(() => DocumentsCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentsCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema),z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TheIncomingLetterCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => TheIncomingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterCreateWithoutProjectInputSchema).array(),z.lazy(() => TheIncomingLetterUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TheIncomingLetterCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TheIncomingLetterCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),z.lazy(() => TheIncomingLetterWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TheOutgoingLetterCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => TheOutgoingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterCreateWithoutProjectInputSchema).array(),z.lazy(() => TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TheOutgoingLetterCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TheOutgoingLetterCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ReportCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutProjectInputSchema),z.lazy(() => ReportCreateWithoutProjectInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConstructionSiteImageCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ConstructionSiteImageCreateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageCreateWithoutProjectInputSchema).array(),z.lazy(() => ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConstructionSiteImageCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConstructionSiteImageCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BudgetUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => BudgetCreateWithoutProjectInputSchema),z.lazy(() => BudgetCreateWithoutProjectInputSchema).array(),z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema),z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema),z.lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BudgetCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BudgetWhereUniqueInputSchema),z.lazy(() => BudgetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.TeamUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutProjectInputSchema),z.lazy(() => TeamCreateWithoutProjectInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TeamCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInputSchema: z.ZodType<Prisma.UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => UpcomingMilstoneCreateWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUncheckedCreateWithoutProjectInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UpcomingMilstoneCreateOrConnectWithoutProjectInputSchema).optional(),
  connect: z.lazy(() => UpcomingMilstoneWhereUniqueInputSchema).optional()
}).strict();

export const CheckListUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.CheckListUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => CheckListCreateWithoutProjectInputSchema),z.lazy(() => CheckListCreateWithoutProjectInputSchema).array(),z.lazy(() => CheckListUncheckedCreateWithoutProjectInputSchema),z.lazy(() => CheckListUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckListCreateOrConnectWithoutProjectInputSchema),z.lazy(() => CheckListCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckListCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckListWhereUniqueInputSchema),z.lazy(() => CheckListWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentsUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => DocumentsCreateWithoutProjectInputSchema),z.lazy(() => DocumentsCreateWithoutProjectInputSchema).array(),z.lazy(() => DocumentsUncheckedCreateWithoutProjectInputSchema),z.lazy(() => DocumentsUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentsCreateOrConnectWithoutProjectInputSchema),z.lazy(() => DocumentsCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentsCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema),z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => TheIncomingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterCreateWithoutProjectInputSchema).array(),z.lazy(() => TheIncomingLetterUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TheIncomingLetterCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TheIncomingLetterCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),z.lazy(() => TheIncomingLetterWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => TheOutgoingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterCreateWithoutProjectInputSchema).array(),z.lazy(() => TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TheOutgoingLetterCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TheOutgoingLetterCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ReportUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutProjectInputSchema),z.lazy(() => ReportCreateWithoutProjectInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ConstructionSiteImageCreateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageCreateWithoutProjectInputSchema).array(),z.lazy(() => ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConstructionSiteImageCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConstructionSiteImageCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BudgetUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.BudgetUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => BudgetCreateWithoutProjectInputSchema),z.lazy(() => BudgetCreateWithoutProjectInputSchema).array(),z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema),z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema),z.lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BudgetUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => BudgetUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BudgetCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BudgetWhereUniqueInputSchema),z.lazy(() => BudgetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BudgetWhereUniqueInputSchema),z.lazy(() => BudgetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BudgetWhereUniqueInputSchema),z.lazy(() => BudgetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BudgetWhereUniqueInputSchema),z.lazy(() => BudgetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BudgetUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => BudgetUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BudgetUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => BudgetUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BudgetScalarWhereInputSchema),z.lazy(() => BudgetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.TeamUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutProjectInputSchema),z.lazy(() => TeamCreateWithoutProjectInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TeamCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TeamUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TeamUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => TeamUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UpcomingMilstoneUpdateOneWithoutProjectNestedInputSchema: z.ZodType<Prisma.UpcomingMilstoneUpdateOneWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => UpcomingMilstoneCreateWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUncheckedCreateWithoutProjectInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UpcomingMilstoneCreateOrConnectWithoutProjectInputSchema).optional(),
  upsert: z.lazy(() => UpcomingMilstoneUpsertWithoutProjectInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UpcomingMilstoneWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UpcomingMilstoneWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UpcomingMilstoneWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UpcomingMilstoneUpdateToOneWithWhereWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUpdateWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUncheckedUpdateWithoutProjectInputSchema) ]).optional(),
}).strict();

export const CheckListUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.CheckListUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => CheckListCreateWithoutProjectInputSchema),z.lazy(() => CheckListCreateWithoutProjectInputSchema).array(),z.lazy(() => CheckListUncheckedCreateWithoutProjectInputSchema),z.lazy(() => CheckListUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckListCreateOrConnectWithoutProjectInputSchema),z.lazy(() => CheckListCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckListUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => CheckListUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckListCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckListWhereUniqueInputSchema),z.lazy(() => CheckListWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckListWhereUniqueInputSchema),z.lazy(() => CheckListWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckListWhereUniqueInputSchema),z.lazy(() => CheckListWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckListWhereUniqueInputSchema),z.lazy(() => CheckListWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckListUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => CheckListUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckListUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => CheckListUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckListScalarWhereInputSchema),z.lazy(() => CheckListScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentsUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.DocumentsUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentsCreateWithoutProjectInputSchema),z.lazy(() => DocumentsCreateWithoutProjectInputSchema).array(),z.lazy(() => DocumentsUncheckedCreateWithoutProjectInputSchema),z.lazy(() => DocumentsUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentsCreateOrConnectWithoutProjectInputSchema),z.lazy(() => DocumentsCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentsUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => DocumentsUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentsCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema),z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema),z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema),z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema),z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentsUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => DocumentsUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentsUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => DocumentsUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentsScalarWhereInputSchema),z.lazy(() => DocumentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TheIncomingLetterUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.TheIncomingLetterUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => TheIncomingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterCreateWithoutProjectInputSchema).array(),z.lazy(() => TheIncomingLetterUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TheIncomingLetterCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TheIncomingLetterUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TheIncomingLetterCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),z.lazy(() => TheIncomingLetterWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),z.lazy(() => TheIncomingLetterWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),z.lazy(() => TheIncomingLetterWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),z.lazy(() => TheIncomingLetterWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TheIncomingLetterUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TheIncomingLetterUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TheIncomingLetterScalarWhereInputSchema),z.lazy(() => TheIncomingLetterScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TheOutgoingLetterUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.TheOutgoingLetterUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => TheOutgoingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterCreateWithoutProjectInputSchema).array(),z.lazy(() => TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TheOutgoingLetterCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TheOutgoingLetterUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TheOutgoingLetterCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TheOutgoingLetterUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TheOutgoingLetterUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TheOutgoingLetterScalarWhereInputSchema),z.lazy(() => TheOutgoingLetterScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ReportUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutProjectInputSchema),z.lazy(() => ReportCreateWithoutProjectInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConstructionSiteImageUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ConstructionSiteImageUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConstructionSiteImageCreateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageCreateWithoutProjectInputSchema).array(),z.lazy(() => ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConstructionSiteImageCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConstructionSiteImageUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConstructionSiteImageCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConstructionSiteImageUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConstructionSiteImageUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConstructionSiteImageScalarWhereInputSchema),z.lazy(() => ConstructionSiteImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BudgetUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.BudgetUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => BudgetCreateWithoutProjectInputSchema),z.lazy(() => BudgetCreateWithoutProjectInputSchema).array(),z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema),z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema),z.lazy(() => BudgetCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BudgetUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => BudgetUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BudgetCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BudgetWhereUniqueInputSchema),z.lazy(() => BudgetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BudgetWhereUniqueInputSchema),z.lazy(() => BudgetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BudgetWhereUniqueInputSchema),z.lazy(() => BudgetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BudgetWhereUniqueInputSchema),z.lazy(() => BudgetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BudgetUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => BudgetUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BudgetUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => BudgetUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BudgetScalarWhereInputSchema),z.lazy(() => BudgetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutProjectInputSchema),z.lazy(() => TeamCreateWithoutProjectInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TeamCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TeamUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TeamUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => TeamUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInputSchema: z.ZodType<Prisma.UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => UpcomingMilstoneCreateWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUncheckedCreateWithoutProjectInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UpcomingMilstoneCreateOrConnectWithoutProjectInputSchema).optional(),
  upsert: z.lazy(() => UpcomingMilstoneUpsertWithoutProjectInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UpcomingMilstoneWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UpcomingMilstoneWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UpcomingMilstoneWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UpcomingMilstoneUpdateToOneWithWhereWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUpdateWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUncheckedUpdateWithoutProjectInputSchema) ]).optional(),
}).strict();

export const CheckListUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.CheckListUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => CheckListCreateWithoutProjectInputSchema),z.lazy(() => CheckListCreateWithoutProjectInputSchema).array(),z.lazy(() => CheckListUncheckedCreateWithoutProjectInputSchema),z.lazy(() => CheckListUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckListCreateOrConnectWithoutProjectInputSchema),z.lazy(() => CheckListCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckListUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => CheckListUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckListCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckListWhereUniqueInputSchema),z.lazy(() => CheckListWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckListWhereUniqueInputSchema),z.lazy(() => CheckListWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckListWhereUniqueInputSchema),z.lazy(() => CheckListWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckListWhereUniqueInputSchema),z.lazy(() => CheckListWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckListUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => CheckListUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckListUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => CheckListUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckListScalarWhereInputSchema),z.lazy(() => CheckListScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentsUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.DocumentsUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentsCreateWithoutProjectInputSchema),z.lazy(() => DocumentsCreateWithoutProjectInputSchema).array(),z.lazy(() => DocumentsUncheckedCreateWithoutProjectInputSchema),z.lazy(() => DocumentsUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentsCreateOrConnectWithoutProjectInputSchema),z.lazy(() => DocumentsCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentsUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => DocumentsUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentsCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema),z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema),z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema),z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema),z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentsUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => DocumentsUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentsUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => DocumentsUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentsScalarWhereInputSchema),z.lazy(() => DocumentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => TheIncomingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterCreateWithoutProjectInputSchema).array(),z.lazy(() => TheIncomingLetterUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TheIncomingLetterCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TheIncomingLetterUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TheIncomingLetterCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),z.lazy(() => TheIncomingLetterWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),z.lazy(() => TheIncomingLetterWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),z.lazy(() => TheIncomingLetterWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),z.lazy(() => TheIncomingLetterWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TheIncomingLetterUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TheIncomingLetterUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TheIncomingLetterScalarWhereInputSchema),z.lazy(() => TheIncomingLetterScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => TheOutgoingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterCreateWithoutProjectInputSchema).array(),z.lazy(() => TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TheOutgoingLetterCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TheOutgoingLetterUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TheOutgoingLetterCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TheOutgoingLetterUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TheOutgoingLetterUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TheOutgoingLetterScalarWhereInputSchema),z.lazy(() => TheOutgoingLetterScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutProjectInputSchema),z.lazy(() => ReportCreateWithoutProjectInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConstructionSiteImageCreateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageCreateWithoutProjectInputSchema).array(),z.lazy(() => ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConstructionSiteImageCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConstructionSiteImageUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConstructionSiteImageCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConstructionSiteImageUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConstructionSiteImageUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConstructionSiteImageScalarWhereInputSchema),z.lazy(() => ConstructionSiteImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutBudgetInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutBudgetInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutBudgetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutBudgetInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutBudgetNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutBudgetNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutBudgetInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutBudgetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutBudgetInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutBudgetInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutBudgetInputSchema),z.lazy(() => ProjectUpdateWithoutBudgetInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutBudgetInputSchema) ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutTeamInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutTeamInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTeamInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutTeamInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutTeamNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutTeamInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTeamInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutTeamInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutTeamInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutTeamInputSchema),z.lazy(() => ProjectUpdateWithoutTeamInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTeamInputSchema) ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutUpcomingMilstoneInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutUpcomingMilstoneInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUpcomingMilstoneInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUpcomingMilstoneInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutUpcomingMilstoneInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const EnumStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StatusSchema).optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutUpcomingMilstoneNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutUpcomingMilstoneNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUpcomingMilstoneInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUpcomingMilstoneInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutUpcomingMilstoneInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutUpcomingMilstoneInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutUpcomingMilstoneInputSchema),z.lazy(() => ProjectUpdateWithoutUpcomingMilstoneInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUpcomingMilstoneInputSchema) ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutCheckListInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutCheckListInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutCheckListInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutCheckListInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutCheckListInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const EnumPriorityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPriorityFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PrioritySchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutCheckListNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutCheckListNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutCheckListInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutCheckListInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutCheckListInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutCheckListInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutCheckListInputSchema),z.lazy(() => ProjectUpdateWithoutCheckListInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutCheckListInputSchema) ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutDocumentsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutDocumentsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutDocumentsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutDocumentsInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutDocumentsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutDocumentsInputSchema),z.lazy(() => ProjectUpdateWithoutDocumentsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutDocumentsInputSchema) ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutTheIncomingLetterInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutTheIncomingLetterInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutTheIncomingLetterInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTheIncomingLetterInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutTheIncomingLetterInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const EnumIncomingStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumIncomingStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => IncomingStatusSchema).optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutTheIncomingLetterNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutTheIncomingLetterNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutTheIncomingLetterInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTheIncomingLetterInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutTheIncomingLetterInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutTheIncomingLetterInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutTheIncomingLetterInputSchema),z.lazy(() => ProjectUpdateWithoutTheIncomingLetterInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTheIncomingLetterInputSchema) ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutTheOutgoingLetterInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutTheOutgoingLetterInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutTheOutgoingLetterInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTheOutgoingLetterInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutTheOutgoingLetterInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const EnumOutgoingStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumOutgoingStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => OutgoingStatusSchema).optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutTheOutgoingLetterNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutTheOutgoingLetterNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutTheOutgoingLetterInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTheOutgoingLetterInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutTheOutgoingLetterInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutTheOutgoingLetterInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutTheOutgoingLetterInputSchema),z.lazy(() => ProjectUpdateWithoutTheOutgoingLetterInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTheOutgoingLetterInputSchema) ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutReportInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutReportInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutReportInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const EnumreportStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumreportStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => reportStatusSchema).optional()
}).strict();

export const EnumreportTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumreportTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => reportTypeSchema).optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutReportNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutReportInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutReportInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutReportInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutReportInputSchema),z.lazy(() => ProjectUpdateWithoutReportInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutReportInputSchema) ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutConstructionSiteImageInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutConstructionSiteImageInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutConstructionSiteImageInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutConstructionSiteImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutConstructionSiteImageInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const EnumcategoryFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumcategoryFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => categorySchema).optional()
}).strict();

export const ProjectUpdateOneRequiredWithoutConstructionSiteImageNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutConstructionSiteImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutConstructionSiteImageInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutConstructionSiteImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutConstructionSiteImageInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutConstructionSiteImageInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutConstructionSiteImageInputSchema),z.lazy(() => ProjectUpdateWithoutConstructionSiteImageInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutConstructionSiteImageInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumStatusFilterSchema: z.ZodType<Prisma.NestedEnumStatusFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional()
}).strict();

export const NestedEnumPriorityFilterSchema: z.ZodType<Prisma.NestedEnumPriorityFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPriorityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPriorityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPriorityFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumIncomingStatusFilterSchema: z.ZodType<Prisma.NestedEnumIncomingStatusFilter> = z.object({
  equals: z.lazy(() => IncomingStatusSchema).optional(),
  in: z.lazy(() => IncomingStatusSchema).array().optional(),
  notIn: z.lazy(() => IncomingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => NestedEnumIncomingStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumIncomingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumIncomingStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IncomingStatusSchema).optional(),
  in: z.lazy(() => IncomingStatusSchema).array().optional(),
  notIn: z.lazy(() => IncomingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => NestedEnumIncomingStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIncomingStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIncomingStatusFilterSchema).optional()
}).strict();

export const NestedEnumOutgoingStatusFilterSchema: z.ZodType<Prisma.NestedEnumOutgoingStatusFilter> = z.object({
  equals: z.lazy(() => OutgoingStatusSchema).optional(),
  in: z.lazy(() => OutgoingStatusSchema).array().optional(),
  notIn: z.lazy(() => OutgoingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => NestedEnumOutgoingStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumOutgoingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumOutgoingStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => OutgoingStatusSchema).optional(),
  in: z.lazy(() => OutgoingStatusSchema).array().optional(),
  notIn: z.lazy(() => OutgoingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => NestedEnumOutgoingStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumOutgoingStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumOutgoingStatusFilterSchema).optional()
}).strict();

export const NestedEnumreportStatusFilterSchema: z.ZodType<Prisma.NestedEnumreportStatusFilter> = z.object({
  equals: z.lazy(() => reportStatusSchema).optional(),
  in: z.lazy(() => reportStatusSchema).array().optional(),
  notIn: z.lazy(() => reportStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => NestedEnumreportStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumreportTypeFilterSchema: z.ZodType<Prisma.NestedEnumreportTypeFilter> = z.object({
  equals: z.lazy(() => reportTypeSchema).optional(),
  in: z.lazy(() => reportTypeSchema).array().optional(),
  notIn: z.lazy(() => reportTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => NestedEnumreportTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumreportStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumreportStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => reportStatusSchema).optional(),
  in: z.lazy(() => reportStatusSchema).array().optional(),
  notIn: z.lazy(() => reportStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => NestedEnumreportStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumreportStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumreportStatusFilterSchema).optional()
}).strict();

export const NestedEnumreportTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumreportTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => reportTypeSchema).optional(),
  in: z.lazy(() => reportTypeSchema).array().optional(),
  notIn: z.lazy(() => reportTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => NestedEnumreportTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumreportTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumreportTypeFilterSchema).optional()
}).strict();

export const NestedEnumcategoryFilterSchema: z.ZodType<Prisma.NestedEnumcategoryFilter> = z.object({
  equals: z.lazy(() => categorySchema).optional(),
  in: z.lazy(() => categorySchema).array().optional(),
  notIn: z.lazy(() => categorySchema).array().optional(),
  not: z.union([ z.lazy(() => categorySchema),z.lazy(() => NestedEnumcategoryFilterSchema) ]).optional(),
}).strict();

export const NestedEnumcategoryWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumcategoryWithAggregatesFilter> = z.object({
  equals: z.lazy(() => categorySchema).optional(),
  in: z.lazy(() => categorySchema).array().optional(),
  notIn: z.lazy(() => categorySchema).array().optional(),
  not: z.union([ z.lazy(() => categorySchema),z.lazy(() => NestedEnumcategoryWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumcategoryFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumcategoryFilterSchema).optional()
}).strict();

export const BudgetCreateWithoutProjectInputSchema: z.ZodType<Prisma.BudgetCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  total: z.number(),
  spent: z.number()
}).strict();

export const BudgetUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  total: z.number(),
  spent: z.number()
}).strict();

export const BudgetCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.BudgetCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => BudgetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BudgetCreateWithoutProjectInputSchema),z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const BudgetCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.BudgetCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BudgetCreateManyProjectInputSchema),z.lazy(() => BudgetCreateManyProjectInputSchema).array() ]),
}).strict();

export const TeamCreateWithoutProjectInputSchema: z.ZodType<Prisma.TeamCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  projectManger: z.string(),
  siteManger: z.string(),
  civilManger: z.string(),
  architecturalLoad: z.string(),
  totalWorker: z.number().int()
}).strict();

export const TeamUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  projectManger: z.string(),
  siteManger: z.string(),
  civilManger: z.string(),
  architecturalLoad: z.string(),
  totalWorker: z.number().int()
}).strict();

export const TeamCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutProjectInputSchema),z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const TeamCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.TeamCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TeamCreateManyProjectInputSchema),z.lazy(() => TeamCreateManyProjectInputSchema).array() ]),
}).strict();

export const UpcomingMilstoneCreateWithoutProjectInputSchema: z.ZodType<Prisma.UpcomingMilstoneCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  date: z.coerce.date().optional(),
  status: z.lazy(() => StatusSchema)
}).strict();

export const UpcomingMilstoneUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.UpcomingMilstoneUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  date: z.coerce.date().optional(),
  status: z.lazy(() => StatusSchema)
}).strict();

export const UpcomingMilstoneCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.UpcomingMilstoneCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => UpcomingMilstoneWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UpcomingMilstoneCreateWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const CheckListCreateWithoutProjectInputSchema: z.ZodType<Prisma.CheckListCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  task: z.lazy(() => StatusSchema),
  assignedTo: z.string(),
  dueData: z.coerce.date().optional(),
  priority: z.lazy(() => PrioritySchema),
  completed: z.boolean()
}).strict();

export const CheckListUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.CheckListUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  task: z.lazy(() => StatusSchema),
  assignedTo: z.string(),
  dueData: z.coerce.date().optional(),
  priority: z.lazy(() => PrioritySchema),
  completed: z.boolean()
}).strict();

export const CheckListCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.CheckListCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => CheckListWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckListCreateWithoutProjectInputSchema),z.lazy(() => CheckListUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const CheckListCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.CheckListCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CheckListCreateManyProjectInputSchema),z.lazy(() => CheckListCreateManyProjectInputSchema).array() ]),
}).strict();

export const DocumentsCreateWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  date: z.coerce.date().optional(),
  downloadedUrl: z.string()
}).strict();

export const DocumentsUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  date: z.coerce.date().optional(),
  downloadedUrl: z.string()
}).strict();

export const DocumentsCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => DocumentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentsCreateWithoutProjectInputSchema),z.lazy(() => DocumentsUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const DocumentsCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.DocumentsCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DocumentsCreateManyProjectInputSchema),z.lazy(() => DocumentsCreateManyProjectInputSchema).array() ]),
}).strict();

export const TheIncomingLetterCreateWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  sender: z.string(),
  subject: z.string(),
  priority: z.lazy(() => PrioritySchema),
  status: z.lazy(() => IncomingStatusSchema),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TheIncomingLetterUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  sender: z.string(),
  subject: z.string(),
  priority: z.lazy(() => PrioritySchema),
  status: z.lazy(() => IncomingStatusSchema),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TheIncomingLetterCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TheIncomingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const TheIncomingLetterCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.TheIncomingLetterCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TheIncomingLetterCreateManyProjectInputSchema),z.lazy(() => TheIncomingLetterCreateManyProjectInputSchema).array() ]),
}).strict();

export const TheOutgoingLetterCreateWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  recipent: z.string(),
  subject: z.string(),
  status: z.lazy(() => OutgoingStatusSchema),
  priority: z.lazy(() => PrioritySchema),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string()
}).strict();

export const TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  recipent: z.string(),
  subject: z.string(),
  status: z.lazy(() => OutgoingStatusSchema),
  priority: z.lazy(() => PrioritySchema),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string()
}).strict();

export const TheOutgoingLetterCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TheOutgoingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const TheOutgoingLetterCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.TheOutgoingLetterCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TheOutgoingLetterCreateManyProjectInputSchema),z.lazy(() => TheOutgoingLetterCreateManyProjectInputSchema).array() ]),
}).strict();

export const ReportCreateWithoutProjectInputSchema: z.ZodType<Prisma.ReportCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  publisher: z.string(),
  status: z.lazy(() => reportStatusSchema),
  uploadedDate: z.coerce.date().optional(),
  lastModified: z.coerce.date().optional(),
  version: z.string(),
  downloadedUrl: z.string(),
  reportType: z.lazy(() => reportTypeSchema)
}).strict();

export const ReportUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  publisher: z.string(),
  status: z.lazy(() => reportStatusSchema),
  uploadedDate: z.coerce.date().optional(),
  lastModified: z.coerce.date().optional(),
  version: z.string(),
  downloadedUrl: z.string(),
  reportType: z.lazy(() => reportTypeSchema)
}).strict();

export const ReportCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ReportCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.ReportCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReportCreateManyProjectInputSchema),z.lazy(() => ReportCreateManyProjectInputSchema).array() ]),
}).strict();

export const ConstructionSiteImageCreateWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  imagesrc: z.string(),
  location: z.string(),
  date: z.coerce.date().optional(),
  category: z.lazy(() => categorySchema)
}).strict();

export const ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  imagesrc: z.string(),
  location: z.string(),
  date: z.coerce.date().optional(),
  category: z.lazy(() => categorySchema)
}).strict();

export const ConstructionSiteImageCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConstructionSiteImageCreateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ConstructionSiteImageCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.ConstructionSiteImageCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConstructionSiteImageCreateManyProjectInputSchema),z.lazy(() => ConstructionSiteImageCreateManyProjectInputSchema).array() ]),
}).strict();

export const BudgetUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => BudgetWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BudgetUpdateWithoutProjectInputSchema),z.lazy(() => BudgetUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => BudgetCreateWithoutProjectInputSchema),z.lazy(() => BudgetUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const BudgetUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => BudgetWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BudgetUpdateWithoutProjectInputSchema),z.lazy(() => BudgetUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const BudgetUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => BudgetScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BudgetUpdateManyMutationInputSchema),z.lazy(() => BudgetUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const BudgetScalarWhereInputSchema: z.ZodType<Prisma.BudgetScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BudgetScalarWhereInputSchema),z.lazy(() => BudgetScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BudgetScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BudgetScalarWhereInputSchema),z.lazy(() => BudgetScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  total: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  spent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TeamUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.TeamUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TeamUpdateWithoutProjectInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutProjectInputSchema),z.lazy(() => TeamUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const TeamUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.TeamUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TeamUpdateWithoutProjectInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const TeamUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.TeamUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => TeamScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TeamUpdateManyMutationInputSchema),z.lazy(() => TeamUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const TeamScalarWhereInputSchema: z.ZodType<Prisma.TeamScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectManger: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  siteManger: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  civilManger: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  architecturalLoad: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalWorker: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UpcomingMilstoneUpsertWithoutProjectInputSchema: z.ZodType<Prisma.UpcomingMilstoneUpsertWithoutProjectInput> = z.object({
  update: z.union([ z.lazy(() => UpcomingMilstoneUpdateWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => UpcomingMilstoneCreateWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUncheckedCreateWithoutProjectInputSchema) ]),
  where: z.lazy(() => UpcomingMilstoneWhereInputSchema).optional()
}).strict();

export const UpcomingMilstoneUpdateToOneWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.UpcomingMilstoneUpdateToOneWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => UpcomingMilstoneWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UpcomingMilstoneUpdateWithoutProjectInputSchema),z.lazy(() => UpcomingMilstoneUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const UpcomingMilstoneUpdateWithoutProjectInputSchema: z.ZodType<Prisma.UpcomingMilstoneUpdateWithoutProjectInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UpcomingMilstoneUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.UpcomingMilstoneUncheckedUpdateWithoutProjectInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CheckListUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.CheckListUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => CheckListWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CheckListUpdateWithoutProjectInputSchema),z.lazy(() => CheckListUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => CheckListCreateWithoutProjectInputSchema),z.lazy(() => CheckListUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const CheckListUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.CheckListUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => CheckListWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CheckListUpdateWithoutProjectInputSchema),z.lazy(() => CheckListUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const CheckListUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.CheckListUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => CheckListScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CheckListUpdateManyMutationInputSchema),z.lazy(() => CheckListUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const CheckListScalarWhereInputSchema: z.ZodType<Prisma.CheckListScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CheckListScalarWhereInputSchema),z.lazy(() => CheckListScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckListScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckListScalarWhereInputSchema),z.lazy(() => CheckListScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  task: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  assignedTo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dueData: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const DocumentsUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => DocumentsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentsUpdateWithoutProjectInputSchema),z.lazy(() => DocumentsUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentsCreateWithoutProjectInputSchema),z.lazy(() => DocumentsUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const DocumentsUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => DocumentsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentsUpdateWithoutProjectInputSchema),z.lazy(() => DocumentsUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const DocumentsUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => DocumentsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentsUpdateManyMutationInputSchema),z.lazy(() => DocumentsUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const DocumentsScalarWhereInputSchema: z.ZodType<Prisma.DocumentsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentsScalarWhereInputSchema),z.lazy(() => DocumentsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentsScalarWhereInputSchema),z.lazy(() => DocumentsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TheIncomingLetterUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TheIncomingLetterUpdateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => TheIncomingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const TheIncomingLetterUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => TheIncomingLetterWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TheIncomingLetterUpdateWithoutProjectInputSchema),z.lazy(() => TheIncomingLetterUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const TheIncomingLetterUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => TheIncomingLetterScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TheIncomingLetterUpdateManyMutationInputSchema),z.lazy(() => TheIncomingLetterUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const TheIncomingLetterScalarWhereInputSchema: z.ZodType<Prisma.TheIncomingLetterScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TheIncomingLetterScalarWhereInputSchema),z.lazy(() => TheIncomingLetterScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TheIncomingLetterScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TheIncomingLetterScalarWhereInputSchema),z.lazy(() => TheIncomingLetterScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sender: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumIncomingStatusFilterSchema),z.lazy(() => IncomingStatusSchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TheOutgoingLetterUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TheOutgoingLetterUpdateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => TheOutgoingLetterCreateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const TheOutgoingLetterUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => TheOutgoingLetterWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TheOutgoingLetterUpdateWithoutProjectInputSchema),z.lazy(() => TheOutgoingLetterUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const TheOutgoingLetterUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => TheOutgoingLetterScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TheOutgoingLetterUpdateManyMutationInputSchema),z.lazy(() => TheOutgoingLetterUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const TheOutgoingLetterScalarWhereInputSchema: z.ZodType<Prisma.TheOutgoingLetterScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TheOutgoingLetterScalarWhereInputSchema),z.lazy(() => TheOutgoingLetterScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TheOutgoingLetterScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TheOutgoingLetterScalarWhereInputSchema),z.lazy(() => TheOutgoingLetterScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumOutgoingStatusFilterSchema),z.lazy(() => OutgoingStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ReportUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReportUpdateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ReportUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const ReportUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => ReportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateManyMutationInputSchema),z.lazy(() => ReportUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const ReportScalarWhereInputSchema: z.ZodType<Prisma.ReportScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publisher: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumreportStatusFilterSchema),z.lazy(() => reportStatusSchema) ]).optional(),
  uploadedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastModified: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  downloadedUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportType: z.union([ z.lazy(() => EnumreportTypeFilterSchema),z.lazy(() => reportTypeSchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ConstructionSiteImageUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConstructionSiteImageUpdateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => ConstructionSiteImageCreateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const ConstructionSiteImageUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ConstructionSiteImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConstructionSiteImageUpdateWithoutProjectInputSchema),z.lazy(() => ConstructionSiteImageUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const ConstructionSiteImageUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => ConstructionSiteImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConstructionSiteImageUpdateManyMutationInputSchema),z.lazy(() => ConstructionSiteImageUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const ConstructionSiteImageScalarWhereInputSchema: z.ZodType<Prisma.ConstructionSiteImageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConstructionSiteImageScalarWhereInputSchema),z.lazy(() => ConstructionSiteImageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConstructionSiteImageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConstructionSiteImageScalarWhereInputSchema),z.lazy(() => ConstructionSiteImageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imagesrc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  category: z.union([ z.lazy(() => EnumcategoryFilterSchema),z.lazy(() => categorySchema) ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ProjectCreateWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectCreateWithoutBudgetInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  team: z.lazy(() => TeamCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutBudgetInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  team: z.lazy(() => TeamUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutBudgetInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutBudgetInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutBudgetInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutBudgetInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutBudgetInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutBudgetInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutBudgetInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutBudgetInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutBudgetInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutBudgetInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutBudgetInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutBudgetInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team: z.lazy(() => TeamUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutBudgetInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutBudgetInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  team: z.lazy(() => TeamUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateWithoutTeamInputSchema: z.ZodType<Prisma.ProjectCreateWithoutTeamInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutTeamInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutTeamInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutTeamInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutTeamInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutTeamInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutTeamInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTeamInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutTeamInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTeamInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutTeamInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutTeamInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTeamInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutTeamInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutTeamInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutTeamInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateWithoutUpcomingMilstoneInputSchema: z.ZodType<Prisma.ProjectCreateWithoutUpcomingMilstoneInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedManyWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutUpcomingMilstoneInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutUpcomingMilstoneInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutUpcomingMilstoneInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutUpcomingMilstoneInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutUpcomingMilstoneInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUpcomingMilstoneInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutUpcomingMilstoneInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutUpcomingMilstoneInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutUpcomingMilstoneInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUpcomingMilstoneInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutUpcomingMilstoneInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUpcomingMilstoneInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutUpcomingMilstoneInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutUpcomingMilstoneInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutUpcomingMilstoneInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUpcomingMilstoneInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutUpcomingMilstoneInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutUpcomingMilstoneInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateManyWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutUpcomingMilstoneInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutUpcomingMilstoneInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateWithoutCheckListInputSchema: z.ZodType<Prisma.ProjectCreateWithoutCheckListInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneCreateNestedOneWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutCheckListInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutCheckListInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutCheckListInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutCheckListInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutCheckListInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutCheckListInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutCheckListInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutCheckListInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutCheckListInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutCheckListInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutCheckListInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutCheckListInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutCheckListInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutCheckListInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutCheckListInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutCheckListInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutCheckListInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutCheckListInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUpdateOneWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutCheckListInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutCheckListInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutDocumentsInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutDocumentsInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutDocumentsInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutDocumentsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutDocumentsInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutDocumentsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutDocumentsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutDocumentsInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutDocumentsInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutDocumentsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutDocumentsInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutDocumentsInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutDocumentsInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateWithoutTheIncomingLetterInputSchema: z.ZodType<Prisma.ProjectCreateWithoutTheIncomingLetterInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutTheIncomingLetterInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutTheIncomingLetterInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutTheIncomingLetterInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutTheIncomingLetterInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutTheIncomingLetterInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTheIncomingLetterInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutTheIncomingLetterInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutTheIncomingLetterInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutTheIncomingLetterInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTheIncomingLetterInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutTheIncomingLetterInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTheIncomingLetterInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutTheIncomingLetterInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutTheIncomingLetterInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutTheIncomingLetterInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTheIncomingLetterInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutTheIncomingLetterInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutTheIncomingLetterInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutTheIncomingLetterInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutTheIncomingLetterInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateWithoutTheOutgoingLetterInputSchema: z.ZodType<Prisma.ProjectCreateWithoutTheOutgoingLetterInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutTheOutgoingLetterInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutTheOutgoingLetterInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutTheOutgoingLetterInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutTheOutgoingLetterInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutTheOutgoingLetterInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTheOutgoingLetterInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutTheOutgoingLetterInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutTheOutgoingLetterInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutTheOutgoingLetterInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTheOutgoingLetterInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutTheOutgoingLetterInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTheOutgoingLetterInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutTheOutgoingLetterInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutTheOutgoingLetterInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutTheOutgoingLetterInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTheOutgoingLetterInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutTheOutgoingLetterInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutTheOutgoingLetterInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutTheOutgoingLetterInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutTheOutgoingLetterInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateWithoutReportInputSchema: z.ZodType<Prisma.ProjectCreateWithoutReportInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutReportInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutReportInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutReportInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutReportInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutReportInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutReportInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReportInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutReportInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutReportInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutReportInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutReportInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutReportInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutReportInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutReportInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  constructionSiteImage: z.lazy(() => ConstructionSiteImageUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateWithoutConstructionSiteImageInputSchema: z.ZodType<Prisma.ProjectCreateWithoutConstructionSiteImageInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutConstructionSiteImageInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutConstructionSiteImageInput> = z.object({
  id: z.string().optional(),
  projectName: z.string(),
  clientName: z.string(),
  location: z.string(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  progress: z.number().int(),
  budget: z.lazy(() => BudgetUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedCreateNestedOneWithoutProjectInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutConstructionSiteImageInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutConstructionSiteImageInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutConstructionSiteImageInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutConstructionSiteImageInputSchema) ]),
}).strict();

export const ProjectUpsertWithoutConstructionSiteImageInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutConstructionSiteImageInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutConstructionSiteImageInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutConstructionSiteImageInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutConstructionSiteImageInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutConstructionSiteImageInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutConstructionSiteImageInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutConstructionSiteImageInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutConstructionSiteImageInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutConstructionSiteImageInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutConstructionSiteImageInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutConstructionSiteImageInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutConstructionSiteImageInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutConstructionSiteImageInput> = z.object({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.lazy(() => BudgetUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  team: z.lazy(() => TeamUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  upcomingMilstone: z.lazy(() => UpcomingMilstoneUncheckedUpdateOneWithoutProjectNestedInputSchema).optional(),
  checkList: z.lazy(() => CheckListUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theIncomingLetter: z.lazy(() => TheIncomingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  theOutgoingLetter: z.lazy(() => TheOutgoingLetterUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const BudgetCreateManyProjectInputSchema: z.ZodType<Prisma.BudgetCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  total: z.number(),
  spent: z.number()
}).strict();

export const TeamCreateManyProjectInputSchema: z.ZodType<Prisma.TeamCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  projectManger: z.string(),
  siteManger: z.string(),
  civilManger: z.string(),
  architecturalLoad: z.string(),
  totalWorker: z.number().int()
}).strict();

export const CheckListCreateManyProjectInputSchema: z.ZodType<Prisma.CheckListCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  task: z.lazy(() => StatusSchema),
  assignedTo: z.string(),
  dueData: z.coerce.date().optional(),
  priority: z.lazy(() => PrioritySchema),
  completed: z.boolean()
}).strict();

export const DocumentsCreateManyProjectInputSchema: z.ZodType<Prisma.DocumentsCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  date: z.coerce.date().optional(),
  downloadedUrl: z.string()
}).strict();

export const TheIncomingLetterCreateManyProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  sender: z.string(),
  subject: z.string(),
  priority: z.lazy(() => PrioritySchema),
  status: z.lazy(() => IncomingStatusSchema),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TheOutgoingLetterCreateManyProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  recipent: z.string(),
  subject: z.string(),
  status: z.lazy(() => OutgoingStatusSchema),
  priority: z.lazy(() => PrioritySchema),
  createdAt: z.coerce.date().optional(),
  downloadedUrl: z.string()
}).strict();

export const ReportCreateManyProjectInputSchema: z.ZodType<Prisma.ReportCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  publisher: z.string(),
  status: z.lazy(() => reportStatusSchema),
  uploadedDate: z.coerce.date().optional(),
  lastModified: z.coerce.date().optional(),
  version: z.string(),
  downloadedUrl: z.string(),
  reportType: z.lazy(() => reportTypeSchema)
}).strict();

export const ConstructionSiteImageCreateManyProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  imagesrc: z.string(),
  location: z.string(),
  date: z.coerce.date().optional(),
  category: z.lazy(() => categorySchema)
}).strict();

export const BudgetUpdateWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUpdateWithoutProjectInput> = z.object({
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  spent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BudgetUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUncheckedUpdateWithoutProjectInput> = z.object({
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  spent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BudgetUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.BudgetUncheckedUpdateManyWithoutProjectInput> = z.object({
  total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  spent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamUpdateWithoutProjectInputSchema: z.ZodType<Prisma.TeamUpdateWithoutProjectInput> = z.object({
  projectManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  siteManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  civilManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  architecturalLoad: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalWorker: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutProjectInput> = z.object({
  projectManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  siteManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  civilManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  architecturalLoad: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalWorker: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutProjectInput> = z.object({
  projectManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  siteManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  civilManger: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  architecturalLoad: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalWorker: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CheckListUpdateWithoutProjectInputSchema: z.ZodType<Prisma.CheckListUpdateWithoutProjectInput> = z.object({
  task: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueData: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CheckListUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.CheckListUncheckedUpdateWithoutProjectInput> = z.object({
  task: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueData: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CheckListUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.CheckListUncheckedUpdateManyWithoutProjectInput> = z.object({
  task: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueData: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentsUpdateWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsUpdateWithoutProjectInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentsUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsUncheckedUpdateWithoutProjectInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentsUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.DocumentsUncheckedUpdateManyWithoutProjectInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheIncomingLetterUpdateWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterUpdateWithoutProjectInput> = z.object({
  sender: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheIncomingLetterUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterUncheckedUpdateWithoutProjectInput> = z.object({
  sender: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheIncomingLetterUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.TheIncomingLetterUncheckedUpdateManyWithoutProjectInput> = z.object({
  sender: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IncomingStatusSchema),z.lazy(() => EnumIncomingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheOutgoingLetterUpdateWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterUpdateWithoutProjectInput> = z.object({
  recipent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheOutgoingLetterUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterUncheckedUpdateWithoutProjectInput> = z.object({
  recipent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TheOutgoingLetterUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.TheOutgoingLetterUncheckedUpdateManyWithoutProjectInput> = z.object({
  recipent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OutgoingStatusSchema),z.lazy(() => EnumOutgoingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpdateWithoutProjectInput> = z.object({
  publisher: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => EnumreportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastModified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => EnumreportTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutProjectInput> = z.object({
  publisher: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => EnumreportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastModified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => EnumreportTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutProjectInput> = z.object({
  publisher: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => reportStatusSchema),z.lazy(() => EnumreportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastModified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  downloadedUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.lazy(() => reportTypeSchema),z.lazy(() => EnumreportTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConstructionSiteImageUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageUpdateWithoutProjectInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagesrc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => categorySchema),z.lazy(() => EnumcategoryFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConstructionSiteImageUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageUncheckedUpdateWithoutProjectInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagesrc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => categorySchema),z.lazy(() => EnumcategoryFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConstructionSiteImageUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.ConstructionSiteImageUncheckedUpdateManyWithoutProjectInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imagesrc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => categorySchema),z.lazy(() => EnumcategoryFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ProjectFindFirstArgsSchema: z.ZodType<Prisma.ProjectFindFirstArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectFindManyArgsSchema: z.ZodType<Prisma.ProjectFindManyArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectAggregateArgsSchema: z.ZodType<Prisma.ProjectAggregateArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectGroupByArgsSchema: z.ZodType<Prisma.ProjectGroupByArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithAggregationInputSchema.array(),ProjectOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectScalarFieldEnumSchema.array(),
  having: ProjectScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectFindUniqueArgsSchema: z.ZodType<Prisma.ProjectFindUniqueArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const BudgetFindFirstArgsSchema: z.ZodType<Prisma.BudgetFindFirstArgs> = z.object({
  select: BudgetSelectSchema.optional(),
  include: BudgetIncludeSchema.optional(),
  where: BudgetWhereInputSchema.optional(),
  orderBy: z.union([ BudgetOrderByWithRelationInputSchema.array(),BudgetOrderByWithRelationInputSchema ]).optional(),
  cursor: BudgetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BudgetScalarFieldEnumSchema,BudgetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BudgetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BudgetFindFirstOrThrowArgs> = z.object({
  select: BudgetSelectSchema.optional(),
  include: BudgetIncludeSchema.optional(),
  where: BudgetWhereInputSchema.optional(),
  orderBy: z.union([ BudgetOrderByWithRelationInputSchema.array(),BudgetOrderByWithRelationInputSchema ]).optional(),
  cursor: BudgetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BudgetScalarFieldEnumSchema,BudgetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BudgetFindManyArgsSchema: z.ZodType<Prisma.BudgetFindManyArgs> = z.object({
  select: BudgetSelectSchema.optional(),
  include: BudgetIncludeSchema.optional(),
  where: BudgetWhereInputSchema.optional(),
  orderBy: z.union([ BudgetOrderByWithRelationInputSchema.array(),BudgetOrderByWithRelationInputSchema ]).optional(),
  cursor: BudgetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BudgetScalarFieldEnumSchema,BudgetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BudgetAggregateArgsSchema: z.ZodType<Prisma.BudgetAggregateArgs> = z.object({
  where: BudgetWhereInputSchema.optional(),
  orderBy: z.union([ BudgetOrderByWithRelationInputSchema.array(),BudgetOrderByWithRelationInputSchema ]).optional(),
  cursor: BudgetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BudgetGroupByArgsSchema: z.ZodType<Prisma.BudgetGroupByArgs> = z.object({
  where: BudgetWhereInputSchema.optional(),
  orderBy: z.union([ BudgetOrderByWithAggregationInputSchema.array(),BudgetOrderByWithAggregationInputSchema ]).optional(),
  by: BudgetScalarFieldEnumSchema.array(),
  having: BudgetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BudgetFindUniqueArgsSchema: z.ZodType<Prisma.BudgetFindUniqueArgs> = z.object({
  select: BudgetSelectSchema.optional(),
  include: BudgetIncludeSchema.optional(),
  where: BudgetWhereUniqueInputSchema,
}).strict() ;

export const BudgetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BudgetFindUniqueOrThrowArgs> = z.object({
  select: BudgetSelectSchema.optional(),
  include: BudgetIncludeSchema.optional(),
  where: BudgetWhereUniqueInputSchema,
}).strict() ;

export const TeamFindFirstArgsSchema: z.ZodType<Prisma.TeamFindFirstArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamScalarFieldEnumSchema,TeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeamFindFirstOrThrowArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamScalarFieldEnumSchema,TeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamFindManyArgsSchema: z.ZodType<Prisma.TeamFindManyArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamScalarFieldEnumSchema,TeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamAggregateArgsSchema: z.ZodType<Prisma.TeamAggregateArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TeamGroupByArgsSchema: z.ZodType<Prisma.TeamGroupByArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithAggregationInputSchema.array(),TeamOrderByWithAggregationInputSchema ]).optional(),
  by: TeamScalarFieldEnumSchema.array(),
  having: TeamScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TeamFindUniqueArgsSchema: z.ZodType<Prisma.TeamFindUniqueArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const TeamFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeamFindUniqueOrThrowArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const UpcomingMilstoneFindFirstArgsSchema: z.ZodType<Prisma.UpcomingMilstoneFindFirstArgs> = z.object({
  select: UpcomingMilstoneSelectSchema.optional(),
  include: UpcomingMilstoneIncludeSchema.optional(),
  where: UpcomingMilstoneWhereInputSchema.optional(),
  orderBy: z.union([ UpcomingMilstoneOrderByWithRelationInputSchema.array(),UpcomingMilstoneOrderByWithRelationInputSchema ]).optional(),
  cursor: UpcomingMilstoneWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UpcomingMilstoneScalarFieldEnumSchema,UpcomingMilstoneScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UpcomingMilstoneFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UpcomingMilstoneFindFirstOrThrowArgs> = z.object({
  select: UpcomingMilstoneSelectSchema.optional(),
  include: UpcomingMilstoneIncludeSchema.optional(),
  where: UpcomingMilstoneWhereInputSchema.optional(),
  orderBy: z.union([ UpcomingMilstoneOrderByWithRelationInputSchema.array(),UpcomingMilstoneOrderByWithRelationInputSchema ]).optional(),
  cursor: UpcomingMilstoneWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UpcomingMilstoneScalarFieldEnumSchema,UpcomingMilstoneScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UpcomingMilstoneFindManyArgsSchema: z.ZodType<Prisma.UpcomingMilstoneFindManyArgs> = z.object({
  select: UpcomingMilstoneSelectSchema.optional(),
  include: UpcomingMilstoneIncludeSchema.optional(),
  where: UpcomingMilstoneWhereInputSchema.optional(),
  orderBy: z.union([ UpcomingMilstoneOrderByWithRelationInputSchema.array(),UpcomingMilstoneOrderByWithRelationInputSchema ]).optional(),
  cursor: UpcomingMilstoneWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UpcomingMilstoneScalarFieldEnumSchema,UpcomingMilstoneScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UpcomingMilstoneAggregateArgsSchema: z.ZodType<Prisma.UpcomingMilstoneAggregateArgs> = z.object({
  where: UpcomingMilstoneWhereInputSchema.optional(),
  orderBy: z.union([ UpcomingMilstoneOrderByWithRelationInputSchema.array(),UpcomingMilstoneOrderByWithRelationInputSchema ]).optional(),
  cursor: UpcomingMilstoneWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UpcomingMilstoneGroupByArgsSchema: z.ZodType<Prisma.UpcomingMilstoneGroupByArgs> = z.object({
  where: UpcomingMilstoneWhereInputSchema.optional(),
  orderBy: z.union([ UpcomingMilstoneOrderByWithAggregationInputSchema.array(),UpcomingMilstoneOrderByWithAggregationInputSchema ]).optional(),
  by: UpcomingMilstoneScalarFieldEnumSchema.array(),
  having: UpcomingMilstoneScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UpcomingMilstoneFindUniqueArgsSchema: z.ZodType<Prisma.UpcomingMilstoneFindUniqueArgs> = z.object({
  select: UpcomingMilstoneSelectSchema.optional(),
  include: UpcomingMilstoneIncludeSchema.optional(),
  where: UpcomingMilstoneWhereUniqueInputSchema,
}).strict() ;

export const UpcomingMilstoneFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UpcomingMilstoneFindUniqueOrThrowArgs> = z.object({
  select: UpcomingMilstoneSelectSchema.optional(),
  include: UpcomingMilstoneIncludeSchema.optional(),
  where: UpcomingMilstoneWhereUniqueInputSchema,
}).strict() ;

export const CheckListFindFirstArgsSchema: z.ZodType<Prisma.CheckListFindFirstArgs> = z.object({
  select: CheckListSelectSchema.optional(),
  include: CheckListIncludeSchema.optional(),
  where: CheckListWhereInputSchema.optional(),
  orderBy: z.union([ CheckListOrderByWithRelationInputSchema.array(),CheckListOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckListScalarFieldEnumSchema,CheckListScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CheckListFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CheckListFindFirstOrThrowArgs> = z.object({
  select: CheckListSelectSchema.optional(),
  include: CheckListIncludeSchema.optional(),
  where: CheckListWhereInputSchema.optional(),
  orderBy: z.union([ CheckListOrderByWithRelationInputSchema.array(),CheckListOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckListScalarFieldEnumSchema,CheckListScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CheckListFindManyArgsSchema: z.ZodType<Prisma.CheckListFindManyArgs> = z.object({
  select: CheckListSelectSchema.optional(),
  include: CheckListIncludeSchema.optional(),
  where: CheckListWhereInputSchema.optional(),
  orderBy: z.union([ CheckListOrderByWithRelationInputSchema.array(),CheckListOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckListScalarFieldEnumSchema,CheckListScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CheckListAggregateArgsSchema: z.ZodType<Prisma.CheckListAggregateArgs> = z.object({
  where: CheckListWhereInputSchema.optional(),
  orderBy: z.union([ CheckListOrderByWithRelationInputSchema.array(),CheckListOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CheckListGroupByArgsSchema: z.ZodType<Prisma.CheckListGroupByArgs> = z.object({
  where: CheckListWhereInputSchema.optional(),
  orderBy: z.union([ CheckListOrderByWithAggregationInputSchema.array(),CheckListOrderByWithAggregationInputSchema ]).optional(),
  by: CheckListScalarFieldEnumSchema.array(),
  having: CheckListScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CheckListFindUniqueArgsSchema: z.ZodType<Prisma.CheckListFindUniqueArgs> = z.object({
  select: CheckListSelectSchema.optional(),
  include: CheckListIncludeSchema.optional(),
  where: CheckListWhereUniqueInputSchema,
}).strict() ;

export const CheckListFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CheckListFindUniqueOrThrowArgs> = z.object({
  select: CheckListSelectSchema.optional(),
  include: CheckListIncludeSchema.optional(),
  where: CheckListWhereUniqueInputSchema,
}).strict() ;

export const DocumentsFindFirstArgsSchema: z.ZodType<Prisma.DocumentsFindFirstArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereInputSchema.optional(),
  orderBy: z.union([ DocumentsOrderByWithRelationInputSchema.array(),DocumentsOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentsScalarFieldEnumSchema,DocumentsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DocumentsFindFirstOrThrowArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereInputSchema.optional(),
  orderBy: z.union([ DocumentsOrderByWithRelationInputSchema.array(),DocumentsOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentsScalarFieldEnumSchema,DocumentsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentsFindManyArgsSchema: z.ZodType<Prisma.DocumentsFindManyArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereInputSchema.optional(),
  orderBy: z.union([ DocumentsOrderByWithRelationInputSchema.array(),DocumentsOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentsScalarFieldEnumSchema,DocumentsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentsAggregateArgsSchema: z.ZodType<Prisma.DocumentsAggregateArgs> = z.object({
  where: DocumentsWhereInputSchema.optional(),
  orderBy: z.union([ DocumentsOrderByWithRelationInputSchema.array(),DocumentsOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DocumentsGroupByArgsSchema: z.ZodType<Prisma.DocumentsGroupByArgs> = z.object({
  where: DocumentsWhereInputSchema.optional(),
  orderBy: z.union([ DocumentsOrderByWithAggregationInputSchema.array(),DocumentsOrderByWithAggregationInputSchema ]).optional(),
  by: DocumentsScalarFieldEnumSchema.array(),
  having: DocumentsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DocumentsFindUniqueArgsSchema: z.ZodType<Prisma.DocumentsFindUniqueArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereUniqueInputSchema,
}).strict() ;

export const DocumentsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DocumentsFindUniqueOrThrowArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereUniqueInputSchema,
}).strict() ;

export const TheIncomingLetterFindFirstArgsSchema: z.ZodType<Prisma.TheIncomingLetterFindFirstArgs> = z.object({
  select: TheIncomingLetterSelectSchema.optional(),
  include: TheIncomingLetterIncludeSchema.optional(),
  where: TheIncomingLetterWhereInputSchema.optional(),
  orderBy: z.union([ TheIncomingLetterOrderByWithRelationInputSchema.array(),TheIncomingLetterOrderByWithRelationInputSchema ]).optional(),
  cursor: TheIncomingLetterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TheIncomingLetterScalarFieldEnumSchema,TheIncomingLetterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TheIncomingLetterFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TheIncomingLetterFindFirstOrThrowArgs> = z.object({
  select: TheIncomingLetterSelectSchema.optional(),
  include: TheIncomingLetterIncludeSchema.optional(),
  where: TheIncomingLetterWhereInputSchema.optional(),
  orderBy: z.union([ TheIncomingLetterOrderByWithRelationInputSchema.array(),TheIncomingLetterOrderByWithRelationInputSchema ]).optional(),
  cursor: TheIncomingLetterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TheIncomingLetterScalarFieldEnumSchema,TheIncomingLetterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TheIncomingLetterFindManyArgsSchema: z.ZodType<Prisma.TheIncomingLetterFindManyArgs> = z.object({
  select: TheIncomingLetterSelectSchema.optional(),
  include: TheIncomingLetterIncludeSchema.optional(),
  where: TheIncomingLetterWhereInputSchema.optional(),
  orderBy: z.union([ TheIncomingLetterOrderByWithRelationInputSchema.array(),TheIncomingLetterOrderByWithRelationInputSchema ]).optional(),
  cursor: TheIncomingLetterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TheIncomingLetterScalarFieldEnumSchema,TheIncomingLetterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TheIncomingLetterAggregateArgsSchema: z.ZodType<Prisma.TheIncomingLetterAggregateArgs> = z.object({
  where: TheIncomingLetterWhereInputSchema.optional(),
  orderBy: z.union([ TheIncomingLetterOrderByWithRelationInputSchema.array(),TheIncomingLetterOrderByWithRelationInputSchema ]).optional(),
  cursor: TheIncomingLetterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TheIncomingLetterGroupByArgsSchema: z.ZodType<Prisma.TheIncomingLetterGroupByArgs> = z.object({
  where: TheIncomingLetterWhereInputSchema.optional(),
  orderBy: z.union([ TheIncomingLetterOrderByWithAggregationInputSchema.array(),TheIncomingLetterOrderByWithAggregationInputSchema ]).optional(),
  by: TheIncomingLetterScalarFieldEnumSchema.array(),
  having: TheIncomingLetterScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TheIncomingLetterFindUniqueArgsSchema: z.ZodType<Prisma.TheIncomingLetterFindUniqueArgs> = z.object({
  select: TheIncomingLetterSelectSchema.optional(),
  include: TheIncomingLetterIncludeSchema.optional(),
  where: TheIncomingLetterWhereUniqueInputSchema,
}).strict() ;

export const TheIncomingLetterFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TheIncomingLetterFindUniqueOrThrowArgs> = z.object({
  select: TheIncomingLetterSelectSchema.optional(),
  include: TheIncomingLetterIncludeSchema.optional(),
  where: TheIncomingLetterWhereUniqueInputSchema,
}).strict() ;

export const TheOutgoingLetterFindFirstArgsSchema: z.ZodType<Prisma.TheOutgoingLetterFindFirstArgs> = z.object({
  select: TheOutgoingLetterSelectSchema.optional(),
  include: TheOutgoingLetterIncludeSchema.optional(),
  where: TheOutgoingLetterWhereInputSchema.optional(),
  orderBy: z.union([ TheOutgoingLetterOrderByWithRelationInputSchema.array(),TheOutgoingLetterOrderByWithRelationInputSchema ]).optional(),
  cursor: TheOutgoingLetterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TheOutgoingLetterScalarFieldEnumSchema,TheOutgoingLetterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TheOutgoingLetterFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TheOutgoingLetterFindFirstOrThrowArgs> = z.object({
  select: TheOutgoingLetterSelectSchema.optional(),
  include: TheOutgoingLetterIncludeSchema.optional(),
  where: TheOutgoingLetterWhereInputSchema.optional(),
  orderBy: z.union([ TheOutgoingLetterOrderByWithRelationInputSchema.array(),TheOutgoingLetterOrderByWithRelationInputSchema ]).optional(),
  cursor: TheOutgoingLetterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TheOutgoingLetterScalarFieldEnumSchema,TheOutgoingLetterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TheOutgoingLetterFindManyArgsSchema: z.ZodType<Prisma.TheOutgoingLetterFindManyArgs> = z.object({
  select: TheOutgoingLetterSelectSchema.optional(),
  include: TheOutgoingLetterIncludeSchema.optional(),
  where: TheOutgoingLetterWhereInputSchema.optional(),
  orderBy: z.union([ TheOutgoingLetterOrderByWithRelationInputSchema.array(),TheOutgoingLetterOrderByWithRelationInputSchema ]).optional(),
  cursor: TheOutgoingLetterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TheOutgoingLetterScalarFieldEnumSchema,TheOutgoingLetterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TheOutgoingLetterAggregateArgsSchema: z.ZodType<Prisma.TheOutgoingLetterAggregateArgs> = z.object({
  where: TheOutgoingLetterWhereInputSchema.optional(),
  orderBy: z.union([ TheOutgoingLetterOrderByWithRelationInputSchema.array(),TheOutgoingLetterOrderByWithRelationInputSchema ]).optional(),
  cursor: TheOutgoingLetterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TheOutgoingLetterGroupByArgsSchema: z.ZodType<Prisma.TheOutgoingLetterGroupByArgs> = z.object({
  where: TheOutgoingLetterWhereInputSchema.optional(),
  orderBy: z.union([ TheOutgoingLetterOrderByWithAggregationInputSchema.array(),TheOutgoingLetterOrderByWithAggregationInputSchema ]).optional(),
  by: TheOutgoingLetterScalarFieldEnumSchema.array(),
  having: TheOutgoingLetterScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TheOutgoingLetterFindUniqueArgsSchema: z.ZodType<Prisma.TheOutgoingLetterFindUniqueArgs> = z.object({
  select: TheOutgoingLetterSelectSchema.optional(),
  include: TheOutgoingLetterIncludeSchema.optional(),
  where: TheOutgoingLetterWhereUniqueInputSchema,
}).strict() ;

export const TheOutgoingLetterFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TheOutgoingLetterFindUniqueOrThrowArgs> = z.object({
  select: TheOutgoingLetterSelectSchema.optional(),
  include: TheOutgoingLetterIncludeSchema.optional(),
  where: TheOutgoingLetterWhereUniqueInputSchema,
}).strict() ;

export const ReportFindFirstArgsSchema: z.ZodType<Prisma.ReportFindFirstArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportFindFirstOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportFindManyArgsSchema: z.ZodType<Prisma.ReportFindManyArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportAggregateArgsSchema: z.ZodType<Prisma.ReportAggregateArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportGroupByArgsSchema: z.ZodType<Prisma.ReportGroupByArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithAggregationInputSchema.array(),ReportOrderByWithAggregationInputSchema ]).optional(),
  by: ReportScalarFieldEnumSchema.array(),
  having: ReportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportFindUniqueArgsSchema: z.ZodType<Prisma.ReportFindUniqueArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReportFindUniqueOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ConstructionSiteImageFindFirstArgsSchema: z.ZodType<Prisma.ConstructionSiteImageFindFirstArgs> = z.object({
  select: ConstructionSiteImageSelectSchema.optional(),
  include: ConstructionSiteImageIncludeSchema.optional(),
  where: ConstructionSiteImageWhereInputSchema.optional(),
  orderBy: z.union([ ConstructionSiteImageOrderByWithRelationInputSchema.array(),ConstructionSiteImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ConstructionSiteImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConstructionSiteImageScalarFieldEnumSchema,ConstructionSiteImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConstructionSiteImageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ConstructionSiteImageFindFirstOrThrowArgs> = z.object({
  select: ConstructionSiteImageSelectSchema.optional(),
  include: ConstructionSiteImageIncludeSchema.optional(),
  where: ConstructionSiteImageWhereInputSchema.optional(),
  orderBy: z.union([ ConstructionSiteImageOrderByWithRelationInputSchema.array(),ConstructionSiteImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ConstructionSiteImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConstructionSiteImageScalarFieldEnumSchema,ConstructionSiteImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConstructionSiteImageFindManyArgsSchema: z.ZodType<Prisma.ConstructionSiteImageFindManyArgs> = z.object({
  select: ConstructionSiteImageSelectSchema.optional(),
  include: ConstructionSiteImageIncludeSchema.optional(),
  where: ConstructionSiteImageWhereInputSchema.optional(),
  orderBy: z.union([ ConstructionSiteImageOrderByWithRelationInputSchema.array(),ConstructionSiteImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ConstructionSiteImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConstructionSiteImageScalarFieldEnumSchema,ConstructionSiteImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConstructionSiteImageAggregateArgsSchema: z.ZodType<Prisma.ConstructionSiteImageAggregateArgs> = z.object({
  where: ConstructionSiteImageWhereInputSchema.optional(),
  orderBy: z.union([ ConstructionSiteImageOrderByWithRelationInputSchema.array(),ConstructionSiteImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ConstructionSiteImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ConstructionSiteImageGroupByArgsSchema: z.ZodType<Prisma.ConstructionSiteImageGroupByArgs> = z.object({
  where: ConstructionSiteImageWhereInputSchema.optional(),
  orderBy: z.union([ ConstructionSiteImageOrderByWithAggregationInputSchema.array(),ConstructionSiteImageOrderByWithAggregationInputSchema ]).optional(),
  by: ConstructionSiteImageScalarFieldEnumSchema.array(),
  having: ConstructionSiteImageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ConstructionSiteImageFindUniqueArgsSchema: z.ZodType<Prisma.ConstructionSiteImageFindUniqueArgs> = z.object({
  select: ConstructionSiteImageSelectSchema.optional(),
  include: ConstructionSiteImageIncludeSchema.optional(),
  where: ConstructionSiteImageWhereUniqueInputSchema,
}).strict() ;

export const ConstructionSiteImageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ConstructionSiteImageFindUniqueOrThrowArgs> = z.object({
  select: ConstructionSiteImageSelectSchema.optional(),
  include: ConstructionSiteImageIncludeSchema.optional(),
  where: ConstructionSiteImageWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProjectCreateArgsSchema: z.ZodType<Prisma.ProjectCreateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
}).strict() ;

export const ProjectUpsertArgsSchema: z.ZodType<Prisma.ProjectUpsertArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
  create: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
  update: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProjectCreateManyArgsSchema: z.ZodType<Prisma.ProjectCreateManyArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema,ProjectCreateManyInputSchema.array() ]),
}).strict() ;

export const ProjectDeleteArgsSchema: z.ZodType<Prisma.ProjectDeleteArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectUpdateArgsSchema: z.ZodType<Prisma.ProjectUpdateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectUpdateManyArgsSchema: z.ZodType<Prisma.ProjectUpdateManyArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema,ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProjectDeleteManyArgsSchema: z.ZodType<Prisma.ProjectDeleteManyArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BudgetCreateArgsSchema: z.ZodType<Prisma.BudgetCreateArgs> = z.object({
  select: BudgetSelectSchema.optional(),
  include: BudgetIncludeSchema.optional(),
  data: z.union([ BudgetCreateInputSchema,BudgetUncheckedCreateInputSchema ]),
}).strict() ;

export const BudgetUpsertArgsSchema: z.ZodType<Prisma.BudgetUpsertArgs> = z.object({
  select: BudgetSelectSchema.optional(),
  include: BudgetIncludeSchema.optional(),
  where: BudgetWhereUniqueInputSchema,
  create: z.union([ BudgetCreateInputSchema,BudgetUncheckedCreateInputSchema ]),
  update: z.union([ BudgetUpdateInputSchema,BudgetUncheckedUpdateInputSchema ]),
}).strict() ;

export const BudgetCreateManyArgsSchema: z.ZodType<Prisma.BudgetCreateManyArgs> = z.object({
  data: z.union([ BudgetCreateManyInputSchema,BudgetCreateManyInputSchema.array() ]),
}).strict() ;

export const BudgetDeleteArgsSchema: z.ZodType<Prisma.BudgetDeleteArgs> = z.object({
  select: BudgetSelectSchema.optional(),
  include: BudgetIncludeSchema.optional(),
  where: BudgetWhereUniqueInputSchema,
}).strict() ;

export const BudgetUpdateArgsSchema: z.ZodType<Prisma.BudgetUpdateArgs> = z.object({
  select: BudgetSelectSchema.optional(),
  include: BudgetIncludeSchema.optional(),
  data: z.union([ BudgetUpdateInputSchema,BudgetUncheckedUpdateInputSchema ]),
  where: BudgetWhereUniqueInputSchema,
}).strict() ;

export const BudgetUpdateManyArgsSchema: z.ZodType<Prisma.BudgetUpdateManyArgs> = z.object({
  data: z.union([ BudgetUpdateManyMutationInputSchema,BudgetUncheckedUpdateManyInputSchema ]),
  where: BudgetWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BudgetDeleteManyArgsSchema: z.ZodType<Prisma.BudgetDeleteManyArgs> = z.object({
  where: BudgetWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TeamCreateArgsSchema: z.ZodType<Prisma.TeamCreateArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  data: z.union([ TeamCreateInputSchema,TeamUncheckedCreateInputSchema ]),
}).strict() ;

export const TeamUpsertArgsSchema: z.ZodType<Prisma.TeamUpsertArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
  create: z.union([ TeamCreateInputSchema,TeamUncheckedCreateInputSchema ]),
  update: z.union([ TeamUpdateInputSchema,TeamUncheckedUpdateInputSchema ]),
}).strict() ;

export const TeamCreateManyArgsSchema: z.ZodType<Prisma.TeamCreateManyArgs> = z.object({
  data: z.union([ TeamCreateManyInputSchema,TeamCreateManyInputSchema.array() ]),
}).strict() ;

export const TeamDeleteArgsSchema: z.ZodType<Prisma.TeamDeleteArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const TeamUpdateArgsSchema: z.ZodType<Prisma.TeamUpdateArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  data: z.union([ TeamUpdateInputSchema,TeamUncheckedUpdateInputSchema ]),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const TeamUpdateManyArgsSchema: z.ZodType<Prisma.TeamUpdateManyArgs> = z.object({
  data: z.union([ TeamUpdateManyMutationInputSchema,TeamUncheckedUpdateManyInputSchema ]),
  where: TeamWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TeamDeleteManyArgsSchema: z.ZodType<Prisma.TeamDeleteManyArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UpcomingMilstoneCreateArgsSchema: z.ZodType<Prisma.UpcomingMilstoneCreateArgs> = z.object({
  select: UpcomingMilstoneSelectSchema.optional(),
  include: UpcomingMilstoneIncludeSchema.optional(),
  data: z.union([ UpcomingMilstoneCreateInputSchema,UpcomingMilstoneUncheckedCreateInputSchema ]),
}).strict() ;

export const UpcomingMilstoneUpsertArgsSchema: z.ZodType<Prisma.UpcomingMilstoneUpsertArgs> = z.object({
  select: UpcomingMilstoneSelectSchema.optional(),
  include: UpcomingMilstoneIncludeSchema.optional(),
  where: UpcomingMilstoneWhereUniqueInputSchema,
  create: z.union([ UpcomingMilstoneCreateInputSchema,UpcomingMilstoneUncheckedCreateInputSchema ]),
  update: z.union([ UpcomingMilstoneUpdateInputSchema,UpcomingMilstoneUncheckedUpdateInputSchema ]),
}).strict() ;

export const UpcomingMilstoneCreateManyArgsSchema: z.ZodType<Prisma.UpcomingMilstoneCreateManyArgs> = z.object({
  data: z.union([ UpcomingMilstoneCreateManyInputSchema,UpcomingMilstoneCreateManyInputSchema.array() ]),
}).strict() ;

export const UpcomingMilstoneDeleteArgsSchema: z.ZodType<Prisma.UpcomingMilstoneDeleteArgs> = z.object({
  select: UpcomingMilstoneSelectSchema.optional(),
  include: UpcomingMilstoneIncludeSchema.optional(),
  where: UpcomingMilstoneWhereUniqueInputSchema,
}).strict() ;

export const UpcomingMilstoneUpdateArgsSchema: z.ZodType<Prisma.UpcomingMilstoneUpdateArgs> = z.object({
  select: UpcomingMilstoneSelectSchema.optional(),
  include: UpcomingMilstoneIncludeSchema.optional(),
  data: z.union([ UpcomingMilstoneUpdateInputSchema,UpcomingMilstoneUncheckedUpdateInputSchema ]),
  where: UpcomingMilstoneWhereUniqueInputSchema,
}).strict() ;

export const UpcomingMilstoneUpdateManyArgsSchema: z.ZodType<Prisma.UpcomingMilstoneUpdateManyArgs> = z.object({
  data: z.union([ UpcomingMilstoneUpdateManyMutationInputSchema,UpcomingMilstoneUncheckedUpdateManyInputSchema ]),
  where: UpcomingMilstoneWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UpcomingMilstoneDeleteManyArgsSchema: z.ZodType<Prisma.UpcomingMilstoneDeleteManyArgs> = z.object({
  where: UpcomingMilstoneWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CheckListCreateArgsSchema: z.ZodType<Prisma.CheckListCreateArgs> = z.object({
  select: CheckListSelectSchema.optional(),
  include: CheckListIncludeSchema.optional(),
  data: z.union([ CheckListCreateInputSchema,CheckListUncheckedCreateInputSchema ]),
}).strict() ;

export const CheckListUpsertArgsSchema: z.ZodType<Prisma.CheckListUpsertArgs> = z.object({
  select: CheckListSelectSchema.optional(),
  include: CheckListIncludeSchema.optional(),
  where: CheckListWhereUniqueInputSchema,
  create: z.union([ CheckListCreateInputSchema,CheckListUncheckedCreateInputSchema ]),
  update: z.union([ CheckListUpdateInputSchema,CheckListUncheckedUpdateInputSchema ]),
}).strict() ;

export const CheckListCreateManyArgsSchema: z.ZodType<Prisma.CheckListCreateManyArgs> = z.object({
  data: z.union([ CheckListCreateManyInputSchema,CheckListCreateManyInputSchema.array() ]),
}).strict() ;

export const CheckListDeleteArgsSchema: z.ZodType<Prisma.CheckListDeleteArgs> = z.object({
  select: CheckListSelectSchema.optional(),
  include: CheckListIncludeSchema.optional(),
  where: CheckListWhereUniqueInputSchema,
}).strict() ;

export const CheckListUpdateArgsSchema: z.ZodType<Prisma.CheckListUpdateArgs> = z.object({
  select: CheckListSelectSchema.optional(),
  include: CheckListIncludeSchema.optional(),
  data: z.union([ CheckListUpdateInputSchema,CheckListUncheckedUpdateInputSchema ]),
  where: CheckListWhereUniqueInputSchema,
}).strict() ;

export const CheckListUpdateManyArgsSchema: z.ZodType<Prisma.CheckListUpdateManyArgs> = z.object({
  data: z.union([ CheckListUpdateManyMutationInputSchema,CheckListUncheckedUpdateManyInputSchema ]),
  where: CheckListWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CheckListDeleteManyArgsSchema: z.ZodType<Prisma.CheckListDeleteManyArgs> = z.object({
  where: CheckListWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DocumentsCreateArgsSchema: z.ZodType<Prisma.DocumentsCreateArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  data: z.union([ DocumentsCreateInputSchema,DocumentsUncheckedCreateInputSchema ]),
}).strict() ;

export const DocumentsUpsertArgsSchema: z.ZodType<Prisma.DocumentsUpsertArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereUniqueInputSchema,
  create: z.union([ DocumentsCreateInputSchema,DocumentsUncheckedCreateInputSchema ]),
  update: z.union([ DocumentsUpdateInputSchema,DocumentsUncheckedUpdateInputSchema ]),
}).strict() ;

export const DocumentsCreateManyArgsSchema: z.ZodType<Prisma.DocumentsCreateManyArgs> = z.object({
  data: z.union([ DocumentsCreateManyInputSchema,DocumentsCreateManyInputSchema.array() ]),
}).strict() ;

export const DocumentsDeleteArgsSchema: z.ZodType<Prisma.DocumentsDeleteArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereUniqueInputSchema,
}).strict() ;

export const DocumentsUpdateArgsSchema: z.ZodType<Prisma.DocumentsUpdateArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  data: z.union([ DocumentsUpdateInputSchema,DocumentsUncheckedUpdateInputSchema ]),
  where: DocumentsWhereUniqueInputSchema,
}).strict() ;

export const DocumentsUpdateManyArgsSchema: z.ZodType<Prisma.DocumentsUpdateManyArgs> = z.object({
  data: z.union([ DocumentsUpdateManyMutationInputSchema,DocumentsUncheckedUpdateManyInputSchema ]),
  where: DocumentsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DocumentsDeleteManyArgsSchema: z.ZodType<Prisma.DocumentsDeleteManyArgs> = z.object({
  where: DocumentsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TheIncomingLetterCreateArgsSchema: z.ZodType<Prisma.TheIncomingLetterCreateArgs> = z.object({
  select: TheIncomingLetterSelectSchema.optional(),
  include: TheIncomingLetterIncludeSchema.optional(),
  data: z.union([ TheIncomingLetterCreateInputSchema,TheIncomingLetterUncheckedCreateInputSchema ]),
}).strict() ;

export const TheIncomingLetterUpsertArgsSchema: z.ZodType<Prisma.TheIncomingLetterUpsertArgs> = z.object({
  select: TheIncomingLetterSelectSchema.optional(),
  include: TheIncomingLetterIncludeSchema.optional(),
  where: TheIncomingLetterWhereUniqueInputSchema,
  create: z.union([ TheIncomingLetterCreateInputSchema,TheIncomingLetterUncheckedCreateInputSchema ]),
  update: z.union([ TheIncomingLetterUpdateInputSchema,TheIncomingLetterUncheckedUpdateInputSchema ]),
}).strict() ;

export const TheIncomingLetterCreateManyArgsSchema: z.ZodType<Prisma.TheIncomingLetterCreateManyArgs> = z.object({
  data: z.union([ TheIncomingLetterCreateManyInputSchema,TheIncomingLetterCreateManyInputSchema.array() ]),
}).strict() ;

export const TheIncomingLetterDeleteArgsSchema: z.ZodType<Prisma.TheIncomingLetterDeleteArgs> = z.object({
  select: TheIncomingLetterSelectSchema.optional(),
  include: TheIncomingLetterIncludeSchema.optional(),
  where: TheIncomingLetterWhereUniqueInputSchema,
}).strict() ;

export const TheIncomingLetterUpdateArgsSchema: z.ZodType<Prisma.TheIncomingLetterUpdateArgs> = z.object({
  select: TheIncomingLetterSelectSchema.optional(),
  include: TheIncomingLetterIncludeSchema.optional(),
  data: z.union([ TheIncomingLetterUpdateInputSchema,TheIncomingLetterUncheckedUpdateInputSchema ]),
  where: TheIncomingLetterWhereUniqueInputSchema,
}).strict() ;

export const TheIncomingLetterUpdateManyArgsSchema: z.ZodType<Prisma.TheIncomingLetterUpdateManyArgs> = z.object({
  data: z.union([ TheIncomingLetterUpdateManyMutationInputSchema,TheIncomingLetterUncheckedUpdateManyInputSchema ]),
  where: TheIncomingLetterWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TheIncomingLetterDeleteManyArgsSchema: z.ZodType<Prisma.TheIncomingLetterDeleteManyArgs> = z.object({
  where: TheIncomingLetterWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TheOutgoingLetterCreateArgsSchema: z.ZodType<Prisma.TheOutgoingLetterCreateArgs> = z.object({
  select: TheOutgoingLetterSelectSchema.optional(),
  include: TheOutgoingLetterIncludeSchema.optional(),
  data: z.union([ TheOutgoingLetterCreateInputSchema,TheOutgoingLetterUncheckedCreateInputSchema ]),
}).strict() ;

export const TheOutgoingLetterUpsertArgsSchema: z.ZodType<Prisma.TheOutgoingLetterUpsertArgs> = z.object({
  select: TheOutgoingLetterSelectSchema.optional(),
  include: TheOutgoingLetterIncludeSchema.optional(),
  where: TheOutgoingLetterWhereUniqueInputSchema,
  create: z.union([ TheOutgoingLetterCreateInputSchema,TheOutgoingLetterUncheckedCreateInputSchema ]),
  update: z.union([ TheOutgoingLetterUpdateInputSchema,TheOutgoingLetterUncheckedUpdateInputSchema ]),
}).strict() ;

export const TheOutgoingLetterCreateManyArgsSchema: z.ZodType<Prisma.TheOutgoingLetterCreateManyArgs> = z.object({
  data: z.union([ TheOutgoingLetterCreateManyInputSchema,TheOutgoingLetterCreateManyInputSchema.array() ]),
}).strict() ;

export const TheOutgoingLetterDeleteArgsSchema: z.ZodType<Prisma.TheOutgoingLetterDeleteArgs> = z.object({
  select: TheOutgoingLetterSelectSchema.optional(),
  include: TheOutgoingLetterIncludeSchema.optional(),
  where: TheOutgoingLetterWhereUniqueInputSchema,
}).strict() ;

export const TheOutgoingLetterUpdateArgsSchema: z.ZodType<Prisma.TheOutgoingLetterUpdateArgs> = z.object({
  select: TheOutgoingLetterSelectSchema.optional(),
  include: TheOutgoingLetterIncludeSchema.optional(),
  data: z.union([ TheOutgoingLetterUpdateInputSchema,TheOutgoingLetterUncheckedUpdateInputSchema ]),
  where: TheOutgoingLetterWhereUniqueInputSchema,
}).strict() ;

export const TheOutgoingLetterUpdateManyArgsSchema: z.ZodType<Prisma.TheOutgoingLetterUpdateManyArgs> = z.object({
  data: z.union([ TheOutgoingLetterUpdateManyMutationInputSchema,TheOutgoingLetterUncheckedUpdateManyInputSchema ]),
  where: TheOutgoingLetterWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TheOutgoingLetterDeleteManyArgsSchema: z.ZodType<Prisma.TheOutgoingLetterDeleteManyArgs> = z.object({
  where: TheOutgoingLetterWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReportCreateArgsSchema: z.ZodType<Prisma.ReportCreateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  data: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
}).strict() ;

export const ReportUpsertArgsSchema: z.ZodType<Prisma.ReportUpsertArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
  create: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
  update: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReportCreateManyArgsSchema: z.ZodType<Prisma.ReportCreateManyArgs> = z.object({
  data: z.union([ ReportCreateManyInputSchema,ReportCreateManyInputSchema.array() ]),
}).strict() ;

export const ReportDeleteArgsSchema: z.ZodType<Prisma.ReportDeleteArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportUpdateArgsSchema: z.ZodType<Prisma.ReportUpdateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  data: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportUpdateManyArgsSchema: z.ZodType<Prisma.ReportUpdateManyArgs> = z.object({
  data: z.union([ ReportUpdateManyMutationInputSchema,ReportUncheckedUpdateManyInputSchema ]),
  where: ReportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReportDeleteManyArgsSchema: z.ZodType<Prisma.ReportDeleteManyArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ConstructionSiteImageCreateArgsSchema: z.ZodType<Prisma.ConstructionSiteImageCreateArgs> = z.object({
  select: ConstructionSiteImageSelectSchema.optional(),
  include: ConstructionSiteImageIncludeSchema.optional(),
  data: z.union([ ConstructionSiteImageCreateInputSchema,ConstructionSiteImageUncheckedCreateInputSchema ]),
}).strict() ;

export const ConstructionSiteImageUpsertArgsSchema: z.ZodType<Prisma.ConstructionSiteImageUpsertArgs> = z.object({
  select: ConstructionSiteImageSelectSchema.optional(),
  include: ConstructionSiteImageIncludeSchema.optional(),
  where: ConstructionSiteImageWhereUniqueInputSchema,
  create: z.union([ ConstructionSiteImageCreateInputSchema,ConstructionSiteImageUncheckedCreateInputSchema ]),
  update: z.union([ ConstructionSiteImageUpdateInputSchema,ConstructionSiteImageUncheckedUpdateInputSchema ]),
}).strict() ;

export const ConstructionSiteImageCreateManyArgsSchema: z.ZodType<Prisma.ConstructionSiteImageCreateManyArgs> = z.object({
  data: z.union([ ConstructionSiteImageCreateManyInputSchema,ConstructionSiteImageCreateManyInputSchema.array() ]),
}).strict() ;

export const ConstructionSiteImageDeleteArgsSchema: z.ZodType<Prisma.ConstructionSiteImageDeleteArgs> = z.object({
  select: ConstructionSiteImageSelectSchema.optional(),
  include: ConstructionSiteImageIncludeSchema.optional(),
  where: ConstructionSiteImageWhereUniqueInputSchema,
}).strict() ;

export const ConstructionSiteImageUpdateArgsSchema: z.ZodType<Prisma.ConstructionSiteImageUpdateArgs> = z.object({
  select: ConstructionSiteImageSelectSchema.optional(),
  include: ConstructionSiteImageIncludeSchema.optional(),
  data: z.union([ ConstructionSiteImageUpdateInputSchema,ConstructionSiteImageUncheckedUpdateInputSchema ]),
  where: ConstructionSiteImageWhereUniqueInputSchema,
}).strict() ;

export const ConstructionSiteImageUpdateManyArgsSchema: z.ZodType<Prisma.ConstructionSiteImageUpdateManyArgs> = z.object({
  data: z.union([ ConstructionSiteImageUpdateManyMutationInputSchema,ConstructionSiteImageUncheckedUpdateManyInputSchema ]),
  where: ConstructionSiteImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ConstructionSiteImageDeleteManyArgsSchema: z.ZodType<Prisma.ConstructionSiteImageDeleteManyArgs> = z.object({
  where: ConstructionSiteImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;