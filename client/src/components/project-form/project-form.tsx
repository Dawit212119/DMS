"use client";

import { useProjectForm } from "./project-form-provider";
import StepNavigation from "./step-navigation";
import ProjectDetails from "./steps/project-details";
import BudgetInfo from "./steps/budget-info";
import TeamInfo from "./steps/team-info";
import UpcomingMilestone from "./steps/upcoming-milestone";
import ChecklistItems from "./steps/checklist-items";
import FormPreview from "./steps/form-preview";
import DocumentsStep from "./steps/documents-step";
import ImagesStep from "./steps/images-step";
import LettersStep from "./steps/letters-step";
import ReportsStep from "./steps/reports-step";
import SuccessScreen from "./steps/success-screen";
import { useState } from "react";
import UploadModal from "./upload-modal";

export default function ProjectForm() {
  const { currentStep, formData, mode } = useProjectForm();
  const [isComplete, setIsComplete] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSubmitSuccess = () => {
    console.log("Form submitted with data:", formData);
    setIsComplete(true);
  };

  const renderStep = () => {
    if (isComplete) {
      return <SuccessScreen onUpload={() => setShowUploadModal(true)} />;
    }

    switch (currentStep) {
      case 1:
        return <ProjectDetails />;
      case 2:
        return <BudgetInfo />;
      case 3:
        return <TeamInfo />;
      case 4:
        return <UpcomingMilestone />;
      case 5:
        return <ChecklistItems />;
      case 6:
        return <DocumentsStep />;
      case 7:
        return <ImagesStep />;
      case 8:
        return <LettersStep />;
      case 9:
        return <ReportsStep />;
      case 10:
        return <FormPreview onSubmit={handleSubmitSuccess} />;
      default:
        return <ProjectDetails />;
    }
  };

  // Calculate total steps including document management steps
  const totalSteps = 10;
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {!isComplete && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Step {currentStep} of {totalSteps}: {getStepTitle(currentStep)}
            </h2>
            <span className="text-sm text-gray-500">
              {progressPercentage}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="min-h-[400px]">{renderStep()}</div>

      {!isComplete && currentStep < 10 && (
        <StepNavigation
          onSubmit={() => {}}
          submitLabel={mode === "create" ? "Submit" : "Update"}
        />
      )}

      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
}

function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return "Project Details";
    case 2:
      return "Budget Information";
    case 3:
      return "Team Information";
    case 4:
      return "Upcoming Milestones";
    case 5:
      return "Checklist Items";
    case 6:
      return "Project Documents";
    case 7:
      return "Site Images";
    case 8:
      return "Project Letters";
    case 9:
      return "Project Reports";
    case 10:
      return "Preview & Submit";
    default:
      return "";
  }
}
