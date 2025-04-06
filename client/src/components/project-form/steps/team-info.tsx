"use client";

import { useProjectForm } from "../project-form-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

export default function TeamInfo() {
  const { formData, updateFormData } = useProjectForm();

  const handleTotalWorkerChange = (value: string) => {
    const numValue = value === "" ? 0 : Number.parseInt(value);
    updateFormData({ totalWorker: numValue });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="projectManager">Project Manager</Label>
        <Input
          id="projectManager"
          value={formData.projectManager}
          onChange={(e) => updateFormData({ projectManager: e.target.value })}
          placeholder="Enter project manager name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="siteManager">Site Manager</Label>
        <Input
          id="siteManager"
          value={formData.siteManager}
          onChange={(e) => updateFormData({ siteManager: e.target.value })}
          placeholder="Enter site manager name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="civilManager">Civil Manager</Label>
        <Input
          id="civilManager"
          value={formData.civilManager}
          onChange={(e) => updateFormData({ civilManager: e.target.value })}
          placeholder="Enter civil manager name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="architecturalLoad">Architectural Load</Label>
        <Input
          id="architecturalLoad"
          value={formData.architecturalLoad}
          onChange={(e) =>
            updateFormData({ architecturalLoad: e.target.value })
          }
          placeholder="Enter architectural load"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="totalWorker">Total Workers</Label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            id="totalWorker"
            type="number"
            min="0"
            value={formData.totalWorker || ""}
            onChange={(e) => handleTotalWorkerChange(e.target.value)}
            placeholder="Enter total number of workers"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
