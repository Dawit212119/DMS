"use client";

import { useProjectForm } from "../project-form-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Users,
  Calendar,
  FileText,
  ImageIcon,
  Mail,
  MailPlus,
  FileBarChart,
} from "lucide-react";
import Image from "next/image";

interface FormPreviewProps {
  onSubmit: () => void;
}

export default function FormPreview({ onSubmit }: FormPreviewProps) {
  const { formData, setCurrentStep, getDocumentsByType } = useProjectForm();

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "ontrack") {
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 flex items-center gap-1"
        >
          <CheckCircle className="h-3 w-3" /> On Track
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-amber-100 text-amber-800 flex items-center gap-1"
        >
          <AlertTriangle className="h-3 w-3" /> At Risk
        </Badge>
      );
    }
  };

  // Get document counts by type
  const documents = getDocumentsByType("document");
  const images = getDocumentsByType("image");
  const incomingLetters = getDocumentsByType("incoming");
  const outgoingLetters = getDocumentsByType("outgoing");
  const reports = getDocumentsByType("report");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Review Your Project</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentStep(1)}>
            Edit Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Project Details */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Project Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Project Name:</span>
              <p className="font-medium">
                {formData.projectName || "Not specified"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Client:</span>
              <p>{formData.clientName || "Not specified"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Location:</span>
              <p>{formData.location || "Not specified"}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500">Start Date:</span>
                <p>{formatDate(formData.startDate)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Due Date:</span>
                <p>{formatDate(formData.dueDate)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Budget Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Total Budget:</span>
              <p className="font-medium">${formData.total.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Amount Spent:</span>
              <p>${formData.spent.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Remaining:</span>
              <p
                className={`font-medium ${
                  formData.total - formData.spent < 0 ? "text-red-500" : ""
                }`}
              >
                ${(formData.total - formData.spent).toFixed(2)}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Budget Utilization:</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                  className={`h-2.5 rounded-full ${
                    formData.spent > formData.total
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (formData.spent / formData.total) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              Team Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Project Manager:</span>
              <p className="font-medium">
                {formData.projectManager || "Not assigned"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Site Manager:</span>
              <p>{formData.siteManager || "Not assigned"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Civil Manager:</span>
              <p>{formData.civilManager || "Not assigned"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Architectural Load:</span>
              <p>{formData.architecturalLoad || "Not specified"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Workers:</span>
              <p>{formData.totalWorker}</p>
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              Upcoming Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.milestones.length === 0 ? (
              <p className="text-gray-500">No milestones added</p>
            ) : (
              <div className="space-y-3">
                {formData.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="pb-2">
                    {index > 0 && <Separator className="mb-2" />}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {milestone.title || "Untitled Milestone"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(milestone.date)}
                        </p>
                      </div>
                      {getStatusBadge(milestone.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Checklist Items */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Checklist Items</CardTitle>
        </CardHeader>
        <CardContent>
          {formData.checklistItems.length === 0 ? (
            <p className="text-gray-500">No checklist items added</p>
          ) : (
            <div className="space-y-4">
              {formData.checklistItems.map((item, index) => (
                <div key={item.id} className="flex items-start gap-3 pb-3">
                  {index > 0 && <Separator className="mb-3" />}
                  <div
                    className={`w-full ${item.completed ? "opacity-70" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            item.completed
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100"
                          }`}
                        >
                          {item.completed && (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </div>
                        <p
                          className={`font-medium ${
                            item.completed ? "line-through" : ""
                          }`}
                        >
                          Task #{index + 1}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {getPriorityBadge(item.priority)}
                        {getStatusBadge(item.task)}
                      </div>
                    </div>
                    <div className="mt-1 ml-7 text-sm text-gray-600">
                      <div className="flex gap-4">
                        <span>
                          Assigned to:{" "}
                          <strong>{item.assignedTo || "Unassigned"}</strong>
                        </span>
                        <span>
                          Due: <strong>{formatDate(item.dueDate)}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Documents Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Project Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-gray-50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <FileText className="h-8 w-8 text-blue-500 mb-2" />
                <p className="font-medium">{documents.length}</p>
                <p className="text-sm text-gray-500">Documents</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <ImageIcon className="h-8 w-8 text-green-500 mb-2" />
                <p className="font-medium">{images.length}</p>
                <p className="text-sm text-gray-500">Images</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Mail className="h-8 w-8 text-amber-500 mb-2" />
                <p className="font-medium">{incomingLetters.length}</p>
                <p className="text-sm text-gray-500">Incoming Letters</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <MailPlus className="h-8 w-8 text-indigo-500 mb-2" />
                <p className="font-medium">{outgoingLetters.length}</p>
                <p className="text-sm text-gray-500">Outgoing Letters</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <FileBarChart className="h-8 w-8 text-purple-500 mb-2" />
                <p className="font-medium">{reports.length}</p>
                <p className="text-sm text-gray-500">Reports</p>
              </CardContent>
            </Card>
          </div>

          {formData.documents.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">
                Recently added documents:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.documents.slice(-4).map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-2 p-2 border rounded-md"
                  >
                    {doc.type === "image" && doc.thumbnailUrl ? (
                      <div className="relative h-10 w-10 rounded-md overflow-hidden">
                        <Image
                          src={doc.thumbnailUrl || "/placeholder.svg"}
                          alt={doc.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                        {doc.type === "document" && (
                          <FileText className="h-5 w-5 text-blue-500" />
                        )}
                        {doc.type === "incoming" && (
                          <Mail className="h-5 w-5 text-amber-500" />
                        )}
                        {doc.type === "outgoing" && (
                          <MailPlus className="h-5 w-5 text-indigo-500" />
                        )}
                        {doc.type === "report" && (
                          <FileBarChart className="h-5 w-5 text-purple-500" />
                        )}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(doc.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4">
        <Button size="lg" onClick={onSubmit} className="px-8">
          Submit Project
        </Button>
      </div>
    </div>
  );
}
