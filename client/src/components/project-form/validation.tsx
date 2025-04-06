import type { ProjectFormData } from "./project-form-provider";

export function validateStep(
  step: number,
  formData: ProjectFormData
): string[] {
  const errors: string[] = [];

  switch (step) {
    case 1: // Project Details
      if (!formData.projectName.trim()) errors.push("Project name is required");
      if (!formData.clientName.trim()) errors.push("Client name is required");
      if (!formData.location.trim()) errors.push("Location is required");
      if (!formData.startDate) errors.push("Start date is required");
      if (!formData.dueDate) errors.push("Due date is required");
      if (
        formData.startDate &&
        formData.dueDate &&
        new Date(formData.startDate) > new Date(formData.dueDate)
      ) {
        errors.push("Start date cannot be after due date");
      }
      break;

    case 2: // Budget Info
      if (formData.total <= 0)
        errors.push("Total budget must be greater than zero");
      if (formData.spent < 0) errors.push("Spent amount cannot be negative");
      if (formData.spent > formData.total)
        errors.push("Spent amount cannot exceed total budget");
      break;

    case 3: // Team Info
      if (!formData.projectManager.trim())
        errors.push("Project manager is required");
      if (formData.totalWorker <= 0)
        errors.push("Total workers must be greater than zero");
      break;

    case 4: // Upcoming Milestones
      if (formData.milestones.length === 0) {
        errors.push("At least one milestone is required");
      } else {
        formData.milestones.forEach((milestone, index) => {
          if (!milestone.title.trim()) {
            errors.push(`Milestone #${index + 1}: Title is required`);
          }
          if (!milestone.date) {
            errors.push(`Milestone #${index + 1}: Date is required`);
          }
        });
      }
      break;

    case 5: // Checklist Items
      if (formData.checklistItems.length === 0) {
        errors.push("At least one checklist item is required");
      } else {
        formData.checklistItems.forEach((item, index) => {
          if (!item.assignedTo.trim()) {
            errors.push(
              `Checklist item #${index + 1}: Assigned to is required`
            );
          }
          if (!item.dueDate) {
            errors.push(`Checklist item #${index + 1}: Due date is required`);
          }
        });
      }
      break;

    // Document steps (6-9) are optional, so no validation required

    case 10: // Preview
      // No validation needed for preview step
      break;
  }

  return errors;
}
