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
  SENT = "sent",
  DRAFT = "draft",
}

enum ReportStatus {
  APPROVED = "approved",
  REJECTED = "rejected",
}

enum ReportType {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  ANNUALLY = "annually",
  QUARTERLY = "quarterly",
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
  projectManger: string;
  siteManger: string;
  civilManger: string;
  architecturalLoad: string;
  totalWorker: number;
  projectId: string;
}

interface UpcomingMilstone {
  id: string;
  title: string;
  date: string;
  status: Status;
  projectId: string;
}

interface CheckList {
  id: string;
  task: Status;
  assignedTo: string;
  dueData: string;
  priority: Priority;
  completed: boolean;
  projectId: string;
}

interface Documents {
  id: string;
  name: string;
  date: string;
  projectId: string;
  downloadedUrl: string;
}

interface TheIncomingLetter {
  id: string;
  sender: string;
  subject: string;
  priority: Priority;
  status: IncomingStatus;
  projectId: string;
  createdAt: string;
  downloadedUrl: string;
  updatedAt: string;
}

interface TheOutgoingLetter {
  id: string;
  recipent: string;
  subject: string;
  status: OutgoingStatus;
  priority: Priority;
  createdAt: string;
  downloadedUrl: string;
  projectId: string;
}

interface Report {
  id: string;
  publisher: string;
  status: ReportStatus;
  uploadedDate: string;
  lastModified: string;
  version: string;
  downloadedUrl: string;
  reportType: ReportType;
  projectId: string;
}

interface ConstructionSiteImage {
  id: string;
  title: string;
  imagesrc: string;
  location: string;
  date: string;
  category: Category;
  projectId: string;
}

// Main Project interface with all relations
interface Project {
  id: string;
  projectName: string;
  clientName: string;
  location: string;
  startDate: string;
  dueDate: string;
  progress: number;
  budget: Budget[];
  team: Team[];
  upcomingMilstone?: UpcomingMilstone;
  checkList: CheckList[];
  documents: Documents[];
  theIncomingLetter: TheIncomingLetter[];
  theOutgoingLetter: TheOutgoingLetter[];
  report: Report[];
  constructionSiteImage: ConstructionSiteImage[];
}

// ==================== REDUX STATE ====================
interface ProjectState {
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
      const response = await fetch(`https://www.google.com/`);
      console.log(response);

      if (!response.ok) {
        console.log("get");
        const error = await response.text();
        throw new Error(error || "Request failed");
      }

      return await response.json();
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (id: string) => {
    const response = await fetch(`/api/projects/${id}`);
    if (!response.ok) throw new Error("Failed to fetch project");
    return await response.json();
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
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
        if (state.currentProject?.id === action.payload) {
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
