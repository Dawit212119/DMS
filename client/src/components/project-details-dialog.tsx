"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  FileText,
  MapPin,
  Milestone,
  Users,
  ImageIcon,
  Mail,
  FileInput,
  ClipboardList,
} from "lucide-react";

interface ProjectDetailsDialogProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsDialog({
  project,
  isOpen,
  onClose,
}: ProjectDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.projectName}</DialogTitle>
          <DialogDescription>
            Client: {project.clientName} | Location: {project.location}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span>{formatDate(project.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date:</span>
                      <span>{formatDate(project.endDate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.location}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
                  Project Team
                </CardTitle>
                <CardDescription>
                  Key personnel assigned to this project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Project Manager</h4>
                      <p>{project.team.projectManager}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Site Manager</h4>
                      <p>{project.team.siteManager}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Civil Manager</h4>
                      <p>{project.team.civilManager}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Architectural Lead</h4>
                      <p>{project.team.architecturalLead}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Total Workers</h4>
                      <span className="text-lg font-semibold">
                        {project.team.totalWorkers}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Milestone className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
                  Project Milestones
                </CardTitle>
                <CardDescription>
                  Key project milestones and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.milestones && project.milestones.length > 0 ? (
                  <div className="space-y-4">
                    {project.milestones.map((milestone: any) => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between border-b pb-3"
                      >
                        <div>
                          <h4 className="font-medium">{milestone.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(milestone.date)}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              milestone.status === "ontrack"
                                ? "bg-green-100 text-green-800"
                                : milestone.status === "delayed"
                                ? "bg-amber-100 text-amber-800"
                                : milestone.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {milestone.status === "ontrack"
                              ? "On Track"
                              : milestone.status === "delayed"
                              ? "Delayed"
                              : milestone.status === "completed"
                              ? "Completed"
                              : "Unknown"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No milestones have been added to this project.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
                  Project Documents
                </CardTitle>
                <CardDescription>
                  Important files and documents related to this project
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.documents && project.documents.length > 0 ? (
                  <div className="space-y-4">
                    {project.documents.map((doc: any) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between border-b pb-3"
                      >
                        <div className="flex items-center">
                          <FileInput className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{doc.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {doc.fileName}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No documents have been added to this project.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
                  Site Images
                </CardTitle>
                <CardDescription>
                  Photos and images from the project site
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.siteImages && project.siteImages?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.siteImages.map((image: any) => (
                      <div
                        key={image.id}
                        className="border rounded-md overflow-hidden"
                      >
                        <div className="aspect-video bg-muted relative">
                          {/* In a real app, you would display the actual image here */}
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            Image Preview
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium truncate">
                            {image.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {image.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No images have been added to this project.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
                  Outgoing Letters
                </CardTitle>
              </CardHeader>
              <CardContent>
                {project.outgoingLetters &&
                project.outgoingLetters.length > 0 ? (
                  <div className="space-y-4">
                    {project.outgoingLetters.map((letter: any) => (
                      <div
                        key={letter.id}
                        className="flex items-center justify-between border-b pb-3"
                      >
                        <div>
                          <h4 className="font-medium">{letter.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            To: {letter.recipient}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              letter.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : letter.priority === "medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {letter.priority.charAt(0).toUpperCase() +
                              letter.priority.slice(1)}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              letter.status === "draft"
                                ? "bg-gray-100 text-gray-800"
                                : letter.status === "sent"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {letter.status.charAt(0).toUpperCase() +
                              letter.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No outgoing letters have been added to this project.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
                  Incoming Letters
                </CardTitle>
              </CardHeader>
              <CardContent>
                {project.incomingLetters &&
                project.incomingLetters.length > 0 ? (
                  <div className="space-y-4">
                    {project.incomingLetters.map((letter: any) => (
                      <div
                        key={letter.id}
                        className="flex items-center justify-between border-b pb-3"
                      >
                        <div>
                          <h4 className="font-medium">{letter.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            From: {letter.recipient}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              letter.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : letter.priority === "medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {letter.priority.charAt(0).toUpperCase() +
                              letter.priority.slice(1)}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              letter.status === "unread"
                                ? "bg-red-100 text-red-800"
                                : letter.status === "read"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {letter.status.charAt(0).toUpperCase() +
                              letter.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No incoming letters have been added to this project.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardList className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
                  Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                {project.reports && project.reports.length > 0 ? (
                  <div className="space-y-4">
                    {project.reports.map((report: any) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between border-b pb-3"
                      >
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {report.reportType.charAt(0).toUpperCase() +
                              report.reportType.slice(1)}{" "}
                            Report | Publisher: {report.publisher}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : report.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : report.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {report.status.charAt(0).toUpperCase() +
                              report.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No reports have been added to this project.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
