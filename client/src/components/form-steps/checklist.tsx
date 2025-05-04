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

interface ChecklistProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  milestones: FormData["milestones"];
}

export default function Checklist({
  formData,
  updateFormData,
  milestones,
}: ChecklistProps) {
  const [newTask, setNewTask] = useState({
    task: "",
    assignedTo: "",
    dueDate: "",
    status: "ontrack" as "ontrack" | "atrisk" | "completed",
    priority: "medium" as "high" | "medium" | "low",
    milestoneId: "",
  });

  const addTask = () => {
    if (
      newTask.task &&
      newTask.assignedTo &&
      newTask.dueDate &&
      newTask.milestoneId
    ) {
      const updatedChecklist = [
        ...formData.checklist,
        {
          id: Date.now().toString(),
          ...newTask,
        },
      ];
      updateFormData({ checklist: updatedChecklist });
      setNewTask({
        task: "",
        assignedTo: "",
        dueDate: "",
        status: "ontrack",
        priority: "medium",
        milestoneId: "",
      });
    }
  };

  const removeTask = (id: string) => {
    const updatedChecklist = formData.checklist.filter(
      (task) => task.id !== id
    );
    updateFormData({ checklist: updatedChecklist });
  };

  const updateTask = (id: string, field: string, value: string) => {
    const updatedChecklist = formData.checklist.map((task) => {
      if (task.id === id) {
        return { ...task, [field]: value };
      }
      return task;
    });
    updateFormData({ checklist: updatedChecklist });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Project Checklist</h3>
      <p className="text-sm text-muted-foreground">
        Add tasks and to-do items for your construction project.
      </p>

      {milestones.length === 0 ? (
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
          Please add at least one milestone before creating checklist items.
        </div>
      ) : (
        <>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taskName">Task</Label>
                  <Input
                    id="taskName"
                    value={newTask.task}
                    onChange={(e) =>
                      setNewTask({ ...newTask, task: e.target.value })
                    }
                    placeholder="Enter task description"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    value={newTask.assignedTo}
                    onChange={(e) =>
                      setNewTask({ ...newTask, assignedTo: e.target.value })
                    }
                    placeholder="Enter person responsible"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taskStatus">Status</Label>
                  <Select
                    value={newTask.status}
                    onValueChange={(value) =>
                      setNewTask({
                        ...newTask,
                        status: value as "ontrack" | "atrisk" | "completed",
                      })
                    }
                  >
                    <SelectTrigger id="taskStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ontrack">On Track</SelectItem>
                      <SelectItem value="atrisk">At Risk</SelectItem>
                      <SelectItem value="atrisk">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) =>
                      setNewTask({
                        ...newTask,
                        priority: value as "high" | "medium" | "low",
                      })
                    }
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="milestone">Related Milestone</Label>
                  <Select
                    value={newTask.milestoneId}
                    onValueChange={(value) =>
                      setNewTask({ ...newTask, milestoneId: value })
                    }
                  >
                    <SelectTrigger id="milestone">
                      <SelectValue placeholder="Select milestone" />
                    </SelectTrigger>
                    <SelectContent>
                      {milestones.map((milestone) => (
                        <SelectItem key={milestone.id} value={milestone.id}>
                          {milestone.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={addTask}
                className="mt-4"
                disabled={
                  !newTask.task ||
                  !newTask.assignedTo ||
                  !newTask.dueDate ||
                  !newTask.milestoneId
                }
              >
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </CardContent>
          </Card>

          {formData.checklist.length > 0 && (
            <div className="space-y-4 mt-6">
              <h4 className="font-medium">Added Tasks</h4>

              {formData.checklist.map((task) => {
                const relatedMilestone = milestones.find(
                  (m) => m.id === task.milestoneId
                );

                return (
                  <Card key={task.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Task</Label>
                          <Input
                            value={task.task}
                            onChange={(e) =>
                              updateTask(task.id, "task", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Assigned To</Label>
                          <Input
                            value={task.assignedTo}
                            onChange={(e) =>
                              updateTask(task.id, "assignedTo", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Due Date</Label>
                          <Input
                            type="date"
                            value={task.dueDate}
                            onChange={(e) =>
                              updateTask(task.id, "dueDate", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Status</Label>
                          <Select
                            value={task.status}
                            onValueChange={(value) =>
                              updateTask(task.id, "status", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ontrack">On Track</SelectItem>
                              <SelectItem value="atrisk">At Risk</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Priority</Label>
                          <Select
                            value={task.priority}
                            onValueChange={(value) =>
                              updateTask(task.id, "priority", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Milestone</Label>
                          <Select
                            value={task.milestoneId}
                            onValueChange={(value) =>
                              updateTask(task.id, "milestoneId", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {milestones.map((milestone) => (
                                <SelectItem
                                  key={milestone.id}
                                  value={milestone.id}
                                >
                                  {milestone.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-medium">Related to: </span>
                          {relatedMilestone?.name || "Unknown milestone"}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
