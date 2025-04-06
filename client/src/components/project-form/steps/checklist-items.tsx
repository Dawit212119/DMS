"use client";

import { useProjectForm, type ChecklistItem } from "../project-form-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ChecklistItems() {
  const {
    formData,
    addChecklistItem,
    updateChecklistItem,
    removeChecklistItem,
  } = useProjectForm();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Checklist Items</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addChecklistItem}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {formData.checklistItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No checklist items added yet. Click "Add Item" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {formData.checklistItems.map((item, index) => (
            <ChecklistItemCard
              key={item.id}
              item={item}
              index={index}
              updateItem={updateChecklistItem}
              removeItem={removeChecklistItem}
              getPriorityColor={getPriorityColor}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ChecklistItemCardProps {
  item: ChecklistItem;
  index: number;
  updateItem: (id: string, data: Partial<ChecklistItem>) => void;
  removeItem: (id: string) => void;
  getPriorityColor: (priority: string) => string;
}

function ChecklistItemCard({
  item,
  index,
  updateItem,
  removeItem,
  getPriorityColor,
}: ChecklistItemCardProps) {
  return (
    <Card
      className={`border-l-4 ${
        item.completed
          ? "border-l-green-500"
          : item.task === "atrisk"
          ? "border-l-amber-500"
          : "border-l-blue-500"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Checkbox
              id={`completed-${item.id}`}
              checked={item.completed}
              onCheckedChange={(checked) =>
                updateItem(item.id, { completed: checked as boolean })
              }
            />
            <div
              className={`text-lg font-medium ${
                item.completed ? "line-through text-gray-400" : ""
              }`}
            >
              Task #{index + 1}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor={`assignedTo-${item.id}`}>Assigned To</Label>
            <Input
              id={`assignedTo-${item.id}`}
              value={item.assignedTo}
              onChange={(e) =>
                updateItem(item.id, { assignedTo: e.target.value })
              }
              placeholder="Enter person's name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`dueDate-${item.id}`}>Due Date</Label>
            <Input
              id={`dueDate-${item.id}`}
              type="date"
              value={item.dueDate}
              onChange={(e) => updateItem(item.id, { dueDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`task-${item.id}`}>Status</Label>
            <Select
              value={item.task}
              onValueChange={(value) =>
                updateItem(item.id, { task: value as "ontrack" | "atrisk" })
              }
            >
              <SelectTrigger id={`task-${item.id}`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ontrack">On Track</SelectItem>
                <SelectItem value="atrisk">At Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`priority-${item.id}`}>Priority</Label>
            <Select
              value={item.priority}
              onValueChange={(value) =>
                updateItem(item.id, {
                  priority: value as "high" | "medium" | "low",
                })
              }
            >
              <SelectTrigger id={`priority-${item.id}`}>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Badge className={getPriorityColor(item.priority)}>
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}{" "}
            Priority
          </Badge>
          <Badge variant={item.task === "ontrack" ? "outline" : "secondary"}>
            {item.task === "ontrack" ? "On Track" : "At Risk"}
          </Badge>
          {item.completed && (
            <Badge variant="outline" className="bg-green-100 text-green-800">
              Completed
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
