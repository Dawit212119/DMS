"use client";

import { useProjectForm, type Milestone } from "../project-form-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  Trash2,
} from "lucide-react";

export default function UpcomingMilestone() {
  const { formData, addMilestone, updateMilestone, removeMilestone } =
    useProjectForm();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Upcoming Milestones</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addMilestone}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Milestone
        </Button>
      </div>

      {formData.milestones.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No milestones added yet. Click "Add Milestone" to create one.
        </div>
      ) : (
        <div className="space-y-6">
          {formData.milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
              updateMilestone={updateMilestone}
              removeMilestone={removeMilestone}
              isOnly={formData.milestones.length === 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
  updateMilestone: (id: string, data: Partial<Milestone>) => void;
  removeMilestone: (id: string) => void;
  isOnly: boolean;
}

function MilestoneCard({
  milestone,
  index,
  updateMilestone,
  removeMilestone,
  isOnly,
}: MilestoneCardProps) {
  return (
    <Card className="border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <h4 className="text-md font-medium">Milestone #{index + 1}</h4>
          {!isOnly && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeMilestone(milestone.id)}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`milestone-title-${milestone.id}`}>
              Milestone Title
            </Label>
            <Input
              id={`milestone-title-${milestone.id}`}
              value={milestone.title}
              onChange={(e) =>
                updateMilestone(milestone.id, { title: e.target.value })
              }
              placeholder="Enter milestone title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`milestone-date-${milestone.id}`}>
              Milestone Date
            </Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id={`milestone-date-${milestone.id}`}
                type="date"
                value={milestone.date}
                onChange={(e) =>
                  updateMilestone(milestone.id, { date: e.target.value })
                }
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Milestone Status</Label>
            <RadioGroup
              value={milestone.status}
              onValueChange={(value) =>
                updateMilestone(milestone.id, {
                  status: value as "ontrack" | "atrisk",
                })
              }
              className="flex flex-col space-y-3"
            >
              <Card
                className={`border-2 ${
                  milestone.status === "ontrack"
                    ? "border-green-500"
                    : "border-transparent"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="ontrack"
                      id={`ontrack-${milestone.id}`}
                    />
                    <Label
                      htmlFor={`ontrack-${milestone.id}`}
                      className="flex items-center cursor-pointer"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="font-medium">On Track</p>
                        <p className="text-sm text-gray-500">
                          Milestone is progressing as planned
                        </p>
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`border-2 ${
                  milestone.status === "atrisk"
                    ? "border-amber-500"
                    : "border-transparent"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="atrisk"
                      id={`atrisk-${milestone.id}`}
                    />
                    <Label
                      htmlFor={`atrisk-${milestone.id}`}
                      className="flex items-center cursor-pointer"
                    >
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      <div>
                        <p className="font-medium">At Risk</p>
                        <p className="text-sm text-gray-500">
                          Milestone may not be completed on time
                        </p>
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
