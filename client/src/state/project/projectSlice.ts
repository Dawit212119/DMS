import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// ==================== ENUMS ====================
enum Status {
  ONTRACK = "ontrack",
  ATRISK = "atrisk",
}

enum Priority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

enum IncomingStatus {
  READ = "read",
  UNREAD = "unread",
}

enum OutgoingStatus {
  DRAFT = "draft",
  SENT = "sent",
}

enum ReportStatus {
  APPROVED = "approved",
  REJECTED = "rejected",
}

enum ReportType {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  ANNUALLY = "annually",
}

enum Category {
  FOUNDATION = "foundation",
  STRUCTURAL = "structural",
  ELECTRICAL = "electrical",
  PLUMBING = "plumbing",
  EXTERIOR = "exterior",
  AERIAL = "aerial",
}

// ==================== INTERFACES ====================
interface Budget {
  id: string;
  total: number;
  spent: number;
  projectId: string;
}

interface Team {
  id: string;
  projectManager: string;
  siteManager: string;
  civilManager: string;
  architecturalLead: string;
  totalWorkers: number;
  projectId: string;
}

interface Milestone {
  id: string;
  name: string;
  date: Date;
  status: Status;
  projectId: string;
}

interface ChecklistItem {
  id: string;
  task: string;
  assignedTo: string;
  dueDate: Date;
  status: Status;
  priority: Priority;
  milestoneId: string;
  projectId: string;
}

interface Document {
  id: string;
  title: string;
  fileUrl: string;
  fileName: string;
  date: Date;
  projectId: string;
}

interface SiteImage {
  id: string;
  title: string;
  location: string;
  category: Category;
  imageUrl: string;
  fileName: string;
  date: Date;
  projectId: string;
}

interface OutgoingLetter {
  id: string;
  recipient: string;
  subject: string;
  priority: Priority;
  status: OutgoingStatus;
  fileUrl: string;
  fileName: string;
  createdAt: Date;
  projectId: string;
}

interface IncomingLetter {
  id: string;
  sender: string;
  subject: string;
  priority: Priority;
  status: IncomingStatus;
  fileUrl: string;
  fileName: string;
  createdAt: Date;
  projectId: string;
}

export interface Report {
  id: string;
  title: string;
  publisher: string;
  reportType: ReportType;
  version: string;
  status: ReportStatus;
  fileUrl: string;
  fileName: string;
  uploadedDate: Date;
  projectId: string;
}

// Main Project interface with all relations
export interface Project {
  id: string;
  projectName: string;
  clientName: string;
  location: string;
  startDate: Date;
  endDate: Date;
  budget?: Budget;
  team?: Team;
  milestones: Milestone[];
  checklist: ChecklistItem[];
  documents: Document[];
  outgoingLetters: OutgoingLetter[];
  incomingLetters: IncomingLetter[];
  reports: Report[];
  siteImages: SiteImage[];
  createdAt: Date;
  updatedAt: Date;
}
// ==================== REDUX STATE ====================
export interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  totalPages: number;
  currentPage: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  totalPages: 1,
  currentPage: 1,
  status: "idle",
  error: null,
};

// ==================== ASYNC THUNKS ====================
export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8000/project?page=1", {
        credentials: "include",
      });

      console.log("response:", response);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Request failed");
      }

      return await response.json();
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (id: string) => {
    const response = await fetch(`/api/projects/${id}`);
    if (!response.ok) throw new Error("Failed to fetch project");
    const data = await response.json();
    console.log("data:", data);
    return data;
  }
);

export const addProject = createAsyncThunk(
  "project/addProject",
  async (project: Omit<Project, "id">) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error("Failed to add project");
    return await response.json();
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (project: Project) => {
    const response = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error("Failed to update project");
    return await response.json();
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id: string) => {
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete project");
    return id;
  }
);

// ==================== SLICE ====================
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    resetCurrentProject: (state) => {
      state.currentProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        console.log(action.payload?.totalPages);
        state.status = "succeeded";
        state.projects = action.payload?.data.projects || [];
        state.totalPages = action.payload?.totalPages || 1;
        state.currentPage = action.payload?.currentPage || 1;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        console.log(action.error);
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch projects";
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProject = action.payload?.project || null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch project details";
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.projects[index] = action.payload;
        if (
          typeof state.currentProject !== "string" &&
          state.currentProject?.id === action.payload.id
        ) {
          state.currentProject = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
        if (
          typeof state.currentProject !== "string" &&
          state.currentProject?.id === action.payload
        ) {
          state.currentProject = null;
        }
      });
  },
});

export const {
  setCurrentPage,
  setProjects,
  setCurrentProject,
  resetCurrentProject,
} = projectSlice.actions;

export default projectSlice.reducer;
