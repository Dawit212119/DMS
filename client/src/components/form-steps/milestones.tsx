"use client";

import { useState } from "react";
import type { FormData } from "../project-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface MilestonesProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Milestones({
  formData,
  updateFormData,
}: MilestonesProps) {
  const [newMilestone, setNewMilestone] = useState({
    name: "",
    date: "",
    status: "on track" as "on track" | "at risk",
  });

  const addMilestone = () => {
    if (newMilestone.name && newMilestone.date) {
      const updatedMilestones = [
        ...formData.milestones,
        {
          id: Date.now().toString(),
          ...newMilestone,
        },
      ];
      updateFormData({ milestones: updatedMilestones });
      setNewMilestone({
        name: "",
        date: "",
        status: "on track",
      });
    }
  };

  const removeMilestone = (id: string) => {
    const updatedMilestones = formData.milestones.filter(
      (milestone) => milestone.id !== id
    );
    updateFormData({ milestones: updatedMilestones });
  };

  const updateMilestone = (id: string, field: string, value: string) => {
    const updatedMilestones = formData.milestones.map((milestone) => {
      if (milestone.id === id) {
        return { ...milestone, [field]: value };
      }
      return milestone;
    });
    updateFormData({ milestones: updatedMilestones });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Project Milestones</h3>
      <p className="text-sm text-muted-foreground">
        Add key milestones for your construction project.
      </p>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="milestoneName">Milestone Name</Label>
              <Input
                id="milestoneName"
                value={newMilestone.name}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, name: e.target.value })
                }
                placeholder="Enter milestone name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="milestoneDate">Target Date</Label>
              <Input
                id="milestoneDate"
                type="date"
                value={newMilestone.date}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="milestoneStatus">Status</Label>
              <Select
                value={newMilestone.status}
                onValueChange={(value) =>
                  setNewMilestone({
                    ...newMilestone,
                    status: value as "on track" | "at risk",
                  })
                }
              >
                <SelectTrigger id="milestoneStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on track">On Track</SelectItem>
                  <SelectItem value="at risk">At Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={addMilestone}
            className="mt-4"
            disabled={!newMilestone.name || !newMilestone.date}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Milestone
          </Button>
        </CardContent>
      </Card>

      {formData.milestones.length > 0 && (
        <div className="space-y-4 mt-6">
          <h4 className="font-medium">Added Milestones</h4>

          {formData.milestones.map((milestone) => (
            <Card key={milestone.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Name</Label>
                    <Input
                      value={milestone.name}
                      onChange={(e) =>
                        updateMilestone(milestone.id, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs">Date</Label>
                    <Input
                      type="date"
                      value={milestone.date}
                      onChange={(e) =>
                        updateMilestone(milestone.id, "date", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs">Status</Label>
                    <Select
                      value={milestone.status}
                      onValueChange={(value) =>
                        updateMilestone(milestone.id, "status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on track">On Track</SelectItem>
                        <SelectItem value="at risk">At Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-4"
                  onClick={() => removeMilestone(milestone.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
