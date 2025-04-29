"use client";

import type { FormData } from "../project-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TeamInfoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function TeamInfo({ formData, updateFormData }: TeamInfoProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Team Information</h3>
      <p className="text-sm text-muted-foreground">
        Enter details about the project team members and workforce.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="projectManager">Project Manager</Label>
          <Input
            id="projectManager"
            value={formData.team.projectManager}
            onChange={(e) =>
              updateFormData({
                team: {
                  ...formData.team,
                  projectManager: e.target.value,
                },
              })
            }
            placeholder="Enter project manager name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="siteManager">Site Manager</Label>
          <Input
            id="siteManager"
            value={formData.team.siteManager}
            onChange={(e) =>
              updateFormData({
                team: {
                  ...formData.team,
                  siteManager: e.target.value,
                },
              })
            }
            placeholder="Enter site manager name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="civilManager">Civil Manager</Label>
          <Input
            id="civilManager"
            value={formData.team.civilManager}
            onChange={(e) =>
              updateFormData({
                team: {
                  ...formData.team,
                  civilManager: e.target.value,
                },
              })
            }
            placeholder="Enter civil manager name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="architecturalLead">Architectural Lead</Label>
          <Input
            id="architecturalLead"
            value={formData.team.architecturalLead}
            onChange={(e) =>
              updateFormData({
                team: {
                  ...formData.team,
                  architecturalLead: e.target.value,
                },
              })
            }
            placeholder="Enter architectural lead name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalWorkers">Total Workers</Label>
          <Input
            id="totalWorkers"
            type="number"
            min="0"
            value={formData.team.totalWorkers}
            onChange={(e) =>
              updateFormData({
                team: {
                  ...formData.team,

                  totalWorkers: Number(e.target.value),
                },
              })
            }
            placeholder="Enter total number of workers"
            required
          />
        </div>
      </div>
    </div>
  );
}
