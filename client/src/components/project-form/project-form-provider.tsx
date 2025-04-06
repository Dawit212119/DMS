"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type ChecklistItem = {
  id: string;
  task: "ontrack" | "atrisk";
  assignedTo: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
};

export type Milestone = {
  id: string;
  title: string;
  date: string;
  status: "ontrack" | "atrisk";
};

export type ProjectDocument = {
  id: string;
  type: "document" | "image" | "incoming" | "outgoing" | "report";
  name: string;
  date: string;
  url: string;
  thumbnailUrl?: string;
  metadata: Record<string, any>;
};

export type ProjectFormData = {
  // Step 1: Project Details
  projectName: string;
  clientName: string;
  location: string;
  startDate: string;
  dueDate: string;
  progress: number;

  // Step 2: Budget Info
  total: number;
  spent: number;

  // Step 3: Team Info
  projectManager: string;
  siteManager: string;
  civilManager: string;
  architecturalLoad: string;
  totalWorker: number;

  // Step 4: Upcoming Milestones
  milestones: Milestone[];

  // Step 5: Checklist Items
  checklistItems: ChecklistItem[];

  // Steps 6-9: Project Documents
  documents: ProjectDocument[];
};

const initialFormData: ProjectFormData = {
  projectName: "",
  clientName: "",
  location: "",
  startDate: "",
  dueDate: "",
  progress: 0,

  total: 0,
  spent: 0,

  projectManager: "",
  siteManager: "",
  civilManager: "",
  architecturalLoad: "",
  totalWorker: 0,

  milestones: [
    {
      id: "1",
      title: "",
      date: "",
      status: "ontrack",
    },
  ],

  checklistItems: [
    {
      id: "1",
      task: "ontrack",
      assignedTo: "",
      dueDate: "",
      priority: "medium",
      completed: false,
    },
  ],

  documents: [],
};

type ProjectFormContextType = {
  formData: ProjectFormData;
  updateFormData: (data: Partial<ProjectFormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  addChecklistItem: () => void;
  updateChecklistItem: (id: string, data: Partial<ChecklistItem>) => void;
  removeChecklistItem: (id: string) => void;
  addMilestone: () => void;
  updateMilestone: (id: string, data: Partial<Milestone>) => void;
  removeMilestone: (id: string) => void;
  addDocument: (document: ProjectDocument) => void;
  removeDocument: (id: string) => void;
  getDocumentsByType: (type: ProjectDocument["type"]) => ProjectDocument[];
  mode: "create" | "update";
  projectId?: string;
};

const ProjectFormContext = createContext<ProjectFormContextType | undefined>(
  undefined
);

export function useProjectForm() {
  const context = useContext(ProjectFormContext);
  if (!context) {
    throw new Error("useProjectForm must be used within a ProjectFormProvider");
  }
  return context;
}

interface ProjectFormProviderProps {
  children: ReactNode;
  initialProject?: Partial<ProjectFormData>;
  mode?: "create" | "update";
  projectId?: string;
}

export default function ProjectFormProvider({
  children,
  initialProject = {},
  mode = "create",
  projectId,
}: ProjectFormProviderProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    ...initialFormData,
    ...initialProject,
  });
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (data: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const addChecklistItem = () => {
    setFormData((prev) => ({
      ...prev,
      checklistItems: [
        ...prev.checklistItems,
        {
          id: Date.now().toString(),
          task: "ontrack",
          assignedTo: "",
          dueDate: "",
          priority: "medium",
          completed: false,
        },
      ],
    }));
  };

  const updateChecklistItem = (id: string, data: Partial<ChecklistItem>) => {
    setFormData((prev) => ({
      ...prev,
      checklistItems: prev.checklistItems.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  };

  const removeChecklistItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      checklistItems: prev.checklistItems.filter((item) => item.id !== id),
    }));
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          id: Date.now().toString(),
          title: "",
          date: "",
          status: "ontrack",
        },
      ],
    }));
  };

  const updateMilestone = (id: string, data: Partial<Milestone>) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, ...data } : milestone
      ),
    }));
  };

  const removeMilestone = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((milestone) => milestone.id !== id),
    }));
  };

  const addDocument = (document: ProjectDocument) => {
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, document],
    }));
  };

  const removeDocument = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((doc) => doc.id !== id),
    }));
  };

  const getDocumentsByType = (type: ProjectDocument["type"]) => {
    return formData.documents.filter((doc) => doc.type === type);
  };

  return (
    <ProjectFormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        addChecklistItem,
        updateChecklistItem,
        removeChecklistItem,
        addMilestone,
        updateMilestone,
        removeMilestone,
        addDocument,
        removeDocument,
        getDocumentsByType,
        mode,
        projectId,
      }}
    >
      {children}
    </ProjectFormContext.Provider>
  );
}
