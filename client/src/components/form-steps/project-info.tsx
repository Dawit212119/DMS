"use client";

import type { FormData } from "../project-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// Add TypeScript declaration for the window object to avoid TypeScript errors
declare global {
  interface Window {
    validationErrors: string[];
  }
}

interface ProjectInfoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function ProjectInfo({
  formData,
  updateFormData,
}: ProjectInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-blue-green-gradient inline-block">
          Project Information
        </h3>
        <p className="text-gray-600">
          Enter the basic details about your construction project.
        </p>
        <p className="text-red-500 text-sm font-medium">
          * All fields are required
        </p>
      </div>

      {/* Add this section to display validation errors
      {window.validationErrors && window.validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Please fix the following errors:</p>
          <ul className="list-disc pl-5 mt-1 text-sm">
            {window.validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )} */}

      <Card className="p-6 border border-blue-100 bg-blue-50/50">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-blue-700">
              Project Name
            </Label>
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={(e) => updateFormData({ projectName: e.target.value })}
              placeholder="Enter project name"
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              required={true}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-blue-700">
              Client Name
            </Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => updateFormData({ clientName: e.target.value })}
              placeholder="Enter client name"
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              required={true}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-blue-700">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              placeholder="Enter project location"
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              required={true}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-blue-700">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => updateFormData({ startDate: e.target.value })}
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              required={true}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-blue-700">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => updateFormData({ endDate: e.target.value })}
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              required={true}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
