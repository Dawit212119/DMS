"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import SiteImages from "./form-steps/site-images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectInfo from "./form-steps/project-info";
import Checklist from "./form-steps/checklist";
import Milestones from "./form-steps/milestones";
import TeamInfo from "./form-steps/team-info";
import BudgetInfo from "./form-steps/budget-info";
import ProjectDocuments from "./form-steps/project-documents";
import Letters from "./form-steps/letters";
import Reports from "./form-steps/reports";
import ReviewForm from "./form-steps/review-form";
import { toast } from "sonner";

// FormData type remains the same as in the previous version
export type FormData = {
  // Project Info
  projectName: string;
  clientName: string;
  location: string;
  startDate: string;
  endDate: string;
  coverImage: string;

  // Budget Info
  budget: { totalBudget: string; amountSpent: string };

  // Team Info
  team: {
    projectManager: string;
    siteManager: string;
    civilManager: string;
    architecturalLead: string;
    totalWorkers: number;
  };

  // Milestones
  milestones: Array<{
    id: string;
    name: string;
    date: string;
    status: "ontrack" | "atrisk";
  }>;

  // Checklist
  checklist: Array<{
    id: string;
    task: string;
    assignedTo: string;
    dueDate: string;
    status: "ontrack" | "atrisk";
    priority: "high" | "medium" | "low";
    milestoneId: string;
  }>;

  // Project Documents
  documents: Array<{
    id: string;
    title: string;
    fileUrl: string;
    fileName: string;
  }>;

  // Site Images
  siteImages: Array<{
    id: string;
    title: string;
    location: string;
    category:
      | "foundation"
      | "structural"
      | "electrical"
      | "plumbing"
      | "exterior"
      | "aerial";
    imageUrl: string;
    fileName: string;
  }>;

  // Letters
  outgoingLetters: Array<{
    id: string;
    recipient: string;
    subject: string;
    priority: "high" | "medium" | "low";
    status: "draft" | "sent";
    fileUrl: File[];
    fileName: string;
  }>;
  incomingLetters: Array<{
    id: string;
    sender: string;
    subject: string;
    priority: "high" | "medium" | "low";
    status: "read" | "unread";
    fileUrl: File[];
    fileName: string;
  }>;

  // Reports
  reports: Array<{
    id: string;
    title: string;
    publisher: string;
    reportType: "daily" | "weekly" | "monthly" | "quarterly" | "annually";
    version: string;
    status: "approved" | "rejected";
    fileUrl: File[];
    fileName: string;
  }>;
};

const initialFormData: FormData = {
  projectName: "",
  clientName: "",
  location: "",
  startDate: "",
  endDate: "",
  coverImage: "",
  budget: {
    totalBudget: "0",
    amountSpent: "0",
  },
  team: {
    projectManager: "",
    siteManager: "",
    civilManager: "",
    architecturalLead: "",
    totalWorkers: 0,
  },
  milestones: [],
  checklist: [],
  documents: [],
  siteImages: [],
  outgoingLetters: [],
  incomingLetters: [],
  reports: [],
};

const steps = [
  { id: 1, name: "Project Info", icon: "📋" },
  { id: 2, name: "Budget Info", icon: "💰" },
  { id: 3, name: "Team Info", icon: "👥" },
  { id: 4, name: "Milestones", icon: "🏁" },
  { id: 5, name: "Checklist", icon: "✅" },
  { id: 6, name: "Documents", icon: "📄" },
  { id: 7, name: "Site Images", icon: "📷" },
  { id: 8, name: "Letters", icon: "✉️" },
  { id: 9, name: "Reports", icon: "📊" },
  { id: 10, name: "Review", icon: "🔍" },
];

function transformProjectData(formData: FormData) {
  const raw = formData;
  return {
    project: {
      projectName: raw.projectName,
      clientName: raw.clientName,
      location: raw.location,
      startDate: new Date(raw.startDate).toISOString(),
      endDate: new Date(raw.endDate).toISOString(),
      coverImage: raw.coverImage,
    },
    budget: {
      total: Number.parseFloat(raw.budget.totalBudget),
      spent: Number.parseFloat(raw.budget.amountSpent),
    },
    team: {
      projectManager: raw.team.projectManager,
      siteManager: raw.team.siteManager,
      civilManager: raw.team.civilManager,
      architecturalLead: raw.team.architecturalLead,
      totalWorkers: raw.team.totalWorkers,
    },
    milestones: (raw.milestones || []).map((m) => ({
      name: m.name,
      date: new Date(m.date).toISOString(),
      status: m.status?.replace(/\s/g, "").toLowerCase(),
    })),
    checklist: raw.checklist,
    documents: (raw.documents || []).map((r) => ({
      fileName: r.fileName,
      fileUrl: r.fileUrl,
      id: r.id,
      title: r.title,
    })),
    reports: (raw.reports || []).map((r) => ({
      title: r.title,
      publisher: r.publisher,
      version: r.version,
      fileUrl: r.fileUrl?.[0] || "",
      fileName: r.fileName,
      uploadedDate: new Date().toISOString(), // use actual upload date if available
      reportType: r.reportType,
      status: r.status,
    })),
    outgoingLetters: (raw.outgoingLetters || []).map((l) => ({
      recipient: l.recipient,
      subject: l.subject,
      priority: l.priority,
      fileUrl: l.fileUrl?.[0] || "",
      fileName: l.fileName,
      status: l.status,
    })),
    incomingLetters: (raw.incomingLetters || []).map((l) => ({
      sender: l.sender,
      subject: l.subject,
      priority: l.priority,
      fileUrl: l.fileUrl?.[0] || "",
      fileName: l.fileName,
      status: l.status,
    })),
    siteImages: (raw.siteImages || []).map((l) => ({
      id: l.id,
      category: l.category,
      fileName: l.fileName,
      imageUrl: l.imageUrl,
      location: l.location,
      title: l.title,
    })),
  };
}

// Helper function to transform API data to form data format
function transformApiDataToFormData(apiData: any): FormData {
  if (!apiData) return initialFormData;

  try {
    return {
      projectName: apiData?.projectName || "",
      clientName: apiData?.clientName || "",
      location: apiData?.location || "",
      coverImage: apiData?.coverImage || "",
      startDate: apiData?.startDate
        ? new Date(apiData.startDate).toISOString().split("T")[0]
        : "",
      endDate: apiData?.endDate
        ? new Date(apiData.endDate).toISOString().split("T")[0]
        : "",
      budget: {
        totalBudget: apiData.budget?.total?.toString() || "",
        amountSpent: apiData.budget?.spent?.toString() || "",
      },
      team: {
        projectManager: apiData.team?.projectManager || "",
        siteManager: apiData.team?.siteManager || "",
        civilManager: apiData.team?.civilManager || "",
        architecturalLead: apiData.team?.architecturalLead || "",
        totalWorkers: apiData.team?.totalWorkers || 0,
      },
      milestones: Array.isArray(apiData.milestones)
        ? apiData.milestones.map((m: any, index: number) => ({
            id: m.id || `milestone-${index}`,
            name: m.name || "",
            date: m.date ? new Date(m.date).toISOString().split("T")[0] : "",
            status: m.status || "ontrack",
          }))
        : [],
      checklist: Array.isArray(apiData.checklist)
        ? apiData.checklist.map((c: any, index: number) => ({
            id: c.id || `checklist-${index}`,
            task: c.task || "",
            assignedTo: c.assignedTo || "",
            dueDate: c.dueDate
              ? new Date(c.dueDate).toISOString().split("T")[0]
              : "",
            status: c.status || "ontrack",
            priority: c.priority || "medium",
            milestoneId: c.milestoneId || "",
          }))
        : [],
      documents: Array.isArray(apiData.documents)
        ? apiData.documents.map((d: any, index: number) => ({
            id: d.id || `document-${index}`,
            title: d.title || "",
            fileUrl: d.fileUrl || "",
            fileName: d.fileName || "",
          }))
        : [],
      siteImages: Array.isArray(apiData.siteImages)
        ? apiData.siteImages.map((i: any, index: number) => ({
            id: i.id || `image-${index}`,
            title: i.title || "",
            location: i.location || "",
            category: i.category || "foundation",
            imageUrl: i.imageUrl || "",
            fileName: i.fileName || "",
          }))
        : [],
      outgoingLetters: Array.isArray(apiData.outgoingLetters)
        ? apiData.outgoingLetters.map((l: any, index: number) => ({
            id: l.id || `outgoing-${index}`,
            recipient: l.recipient || "",
            subject: l.subject || "",
            priority: l.priority || "medium",
            status: l.status || "draft",
            fileUrl: l.fileUrl ? [l.fileUrl] : [],
            fileName: l.fileName || "",
          }))
        : [],
      incomingLetters: Array.isArray(apiData.incomingLetters)
        ? apiData.incomingLetters.map((l: any, index: number) => ({
            id: l.id || `incoming-${index}`,
            sender: l.sender || "",
            subject: l.subject || "",
            priority: l.priority || "medium",
            status: l.status || "unread",
            fileUrl: l.fileUrl ? [l.fileUrl] : [],
            fileName: l.fileName || "",
          }))
        : [],
      reports: Array.isArray(apiData.reports)
        ? apiData.reports.map((r: any, index: number) => ({
            id: r.id || `report-${index}`,
            title: r.title || "",
            publisher: r.publisher || "",
            reportType: r.reportType || "daily",
            version: r.version || "",
            status: r.status || "approved",
            fileUrl: r.fileUrl ? [r.fileUrl] : [],
            fileName: r.fileName || "",
          }))
        : [],
    };
  } catch (error) {
    console.log("Error transforming API data:", error);
    return initialFormData;
  }
}

interface ProjectFormProps {
  mode?: "create" | "update";
  existingData?: any;
  projectId?: string | null;
}

export default function ProjectForm({
  mode = "create",
  existingData = null,
  projectId = null,
}: ProjectFormProps) {
  // console.log("Existing data", existingData.data);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with existing data if in update mode
  useEffect(() => {
    if (mode === "update" && existingData) {
      console.log("say hello if this is true");
      const transformedData = transformApiDataToFormData(existingData);

      console.log("transformed data>>>", transformedData);
      setFormData(transformedData);
    }
  }, [mode, existingData]);
  console.log("form data>>>", formData);
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const validateFirstStep = (): boolean => {
    const errors: string[] = [];

    if (!formData.projectName.trim()) errors.push("Project Name is required");
    if (!formData.clientName.trim()) errors.push("Client Name is required");
    if (!formData.location.trim()) errors.push("Location is required");
    if (!formData.startDate) errors.push("Start Date is required");
    if (!formData.endDate) errors.push("End Date is required");

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      // For the first step, validate all required fields
      if (currentStep === 1) {
        const isValid = validateFirstStep();
        if (!isValid) {
          // Scroll to top to show validation errors
          window.scrollTo(0, 0);
          return;
        }
      }

      // If validation passes or we're not on the first step, proceed
      setValidationErrors([]);
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const structuredData = transformProjectData(formData);

    try {
      const url =
        mode === "create"
          ? "http://localhost:8000/project"
          : `http://localhost:8000/project/${projectId}`;

      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(structuredData),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to ${mode} project`);
      }

      toast(
        `Project ${mode === "create" ? "created" : "updated"} successfully!`
      );

      // Redirect to projects list after successful submission
      setTimeout(() => {
        router.push("/projects");
      }, 1500);
    } catch (error) {
      console.error(`Error ${mode}ing project:`, error);
      toast.error(`Failed to ${mode} project. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectInfo formData={formData} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <BudgetInfo formData={formData} updateFormData={updateFormData} />
        );
      case 3:
        return <TeamInfo formData={formData} updateFormData={updateFormData} />;
      case 4:
        return (
          <Milestones formData={formData} updateFormData={updateFormData} />
        );
      case 5:
        return (
          <Checklist
            formData={formData}
            updateFormData={updateFormData}
            milestones={formData.milestones}
          />
        );
      case 6:
        return (
          <ProjectDocuments
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 7:
        return (
          <SiteImages formData={formData} updateFormData={updateFormData} />
        );
      case 8:
        return <Letters formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <Reports formData={formData} updateFormData={updateFormData} />;
      case 10:
        return <ReviewForm formData={formData} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    // Make validation errors available to child components
    window.validationErrors = validationErrors;
  }, [validationErrors]);

  // Display validation errors if any
  const renderValidationErrors = () => {
    if (validationErrors.length === 0) return null;

    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
        <p className="font-medium mb-1">Please fix the following errors:</p>
        <ul className="list-disc pl-5">
          {validationErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <span className="bg-blue-green-gradient text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
              {steps[currentStep - 1].icon}
            </span>
            <span>
              Step {currentStep} of {steps.length}:{" "}
              {steps[currentStep - 1].name}
            </span>
          </h2>
          <div className="text-sm text-gray-600 font-medium">
            {Math.round((currentStep / steps.length) * 100)}% Complete
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-green-gradient h-3 rounded-full transition-all duration-500 animate-gradient"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card className="border-none shadow-lg card-hover-effect overflow-hidden">
        <div className="h-2 bg-blue-green-gradient w-full"></div>
        <CardContent className="pt-6 p-8">
          {renderValidationErrors()}
          {renderStep()}

          <div className="flex justify-between mt-10">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1 || isSubmitting}
              className="flex items-center border-blue-400 text-blue-600 hover:bg-blue-50"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {currentStep === steps.length ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center bg-blue-green-gradient hover:opacity-90 transition-opacity animate-gradient"
              >
                {isSubmitting
                  ? "Submitting..."
                  : mode === "create"
                  ? "Create Project"
                  : "Update Project"}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center bg-teal-500 hover:bg-teal-600 text-white transition-colors"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
