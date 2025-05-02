"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  // Budget Info
  totalBudget: string;
  amountSpent: string;

  // Team Info
  projectManager: string;
  siteManager: string;
  civilManager: string;
  architecturalLead: string;
  totalWorkers: number;

  // Milestones
  milestones: Array<{
    id: string;
    name: string;
    date: string;
    status: "on track" | "at risk";
  }>;

  // Checklist
  checklist: Array<{
    id: string;
    task: string;
    assignedTo: string;
    dueDate: string;
    status: "on track" | "at risk";
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
  totalBudget: "",
  amountSpent: "",
  projectManager: "",
  siteManager: "",
  civilManager: "",
  architecturalLead: "",
  totalWorkers: 0,
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
    },
    budget: {
      total: parseFloat(raw.totalBudget),
      spent: parseFloat(raw.amountSpent),
    },
    team: {
      projectManager: raw.projectManager,
      siteManager: raw.siteManager,
      civilManager: raw.civilManager,
      architecturalLead: raw.architecturalLead,
      totalWorkers: raw.totalWorkers,
    },
    milestones: (raw.milestones || []).map((m) => ({
      name: m.name,
      date: new Date(m.date).toISOString(),
      status: m.status?.replace(/\s/g, "").toLowerCase(),
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
    documents: (raw.documents || []).map((d) => ({
      title: d.title,
      fileUrl: d.fileUrl,
      fileName: d.fileName,
    })),
  };
}

export default function ProjectForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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
      console.log("the form data>>>>>>>>>>>>.", formData);

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
    const structuredData = transformProjectData(formData);
    console.log(
      "the form data to submit is +++++======>>>>>>>>>>>>.",
      structuredData
    );
    const res = await fetch("http://localhost:8000/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(structuredData),
    });
    if (res.ok) {
      toast("Project submitted successfully!");
    }
    // This is where you would handle the form submission to your backend
    console.log("Form submitted:", formData);

    // Reset form after submission
    setFormData(initialFormData);
    setCurrentStep(1);
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
          {renderStep()}

          <div className="flex justify-between mt-10">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center border-blue-400 text-blue-600 hover:bg-blue-50"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {currentStep === steps.length ? (
              <Button
                onClick={handleSubmit}
                className="flex items-center bg-blue-green-gradient hover:opacity-90 transition-opacity animate-gradient"
              >
                Submit Project
              </Button>
            ) : (
              <Button
                onClick={handleNext}
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
