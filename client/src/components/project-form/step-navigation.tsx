"use client";

import { Button } from "@/components/ui/button";
import { useProjectForm } from "./project-form-provider";
import { validateStep } from "./validation";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StepNavigationProps {
  onSubmit: () => void;
  submitLabel?: string;
}

export default function StepNavigation({
  onSubmit,
  submitLabel = "Submit",
}: StepNavigationProps) {
  const { currentStep, setCurrentStep, formData, mode } = useProjectForm();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const totalSteps = 10;

  const handleNext = () => {
    const errors = validateStep(currentStep, formData);

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit();
    }
  };

  const handlePrevious = () => {
    setValidationErrors([]);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finalButtonText =
    currentStep === totalSteps
      ? mode === "create"
        ? submitLabel
        : "Update Project"
      : "Next";

  return (
    <div className="mt-8">
      {validationErrors.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc pl-5">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        <Button onClick={handleNext}>{finalButtonText}</Button>
      </div>
    </div>
  );
}
