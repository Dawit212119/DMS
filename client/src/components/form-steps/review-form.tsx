"use client";

import { useState } from "react";
import type { FormData } from "../project-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, ChevronRight, File, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewFormProps {
  formData: FormData;
}

export default function ReviewForm({ formData }: ReviewFormProps) {
  // Add pagination state for documents
  const [documentsPage, setDocumentsPage] = useState(1);
  const [siteImagesPage, setSiteImagesPage] = useState(1);
  const [lettersPage, setLettersPage] = useState(1);
  const [reportsPage, setReportsPage] = useState(1);

  // Items per page
  const itemsPerPage = 5;

  // Calculate pagination for documents
  const totalDocumentsPages = Math.ceil(
    formData.documents.length / itemsPerPage
  );
  const paginatedDocuments = formData.documents.slice(
    (documentsPage - 1) * itemsPerPage,
    documentsPage * itemsPerPage
  );

  // Calculate pagination for site images
  const totalSiteImagesPages = Math.ceil(
    formData.siteImages.length / itemsPerPage
  );
  const paginatedSiteImages = formData.siteImages.slice(
    (siteImagesPage - 1) * itemsPerPage,
    siteImagesPage * itemsPerPage
  );

  // Calculate pagination for letters
  const totalOutgoingLettersPages = Math.ceil(
    formData.outgoingLetters.length / itemsPerPage
  );
  const paginatedOutgoingLetters = formData.outgoingLetters.slice(
    (lettersPage - 1) * itemsPerPage,
    lettersPage * itemsPerPage
  );

  const totalIncomingLettersPages = Math.ceil(
    formData.incomingLetters.length / itemsPerPage
  );
  const paginatedIncomingLetters = formData.incomingLetters.slice(
    (lettersPage - 1) * itemsPerPage,
    lettersPage * itemsPerPage
  );

  // Calculate pagination for reports
  const totalReportsPages = Math.ceil(formData.reports.length / itemsPerPage);
  const paginatedReports = formData.reports.slice(
    (reportsPage - 1) * itemsPerPage,
    reportsPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Review Project Information</h3>
      <p className="text-sm text-muted-foreground">
        Please review all the information you&apos;ve entered before submitting.
      </p>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="project-info">
          <AccordionTrigger>Project Information</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Project Name</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.projectName || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Client Name</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.clientName || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.location || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.startDate || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.endDate || "Not provided"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="budget-info">
          <AccordionTrigger>Budget Information</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Total Budget</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.totalBudget
                        ? `$${formData.totalBudget}`
                        : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Amount Spent</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.amountSpent
                        ? `$${formData.amountSpent}`
                        : "Not provided"}
                    </p>
                  </div>
                  {formData.totalBudget && formData.amountSpent && (
                    <>
                      <div>
                        <p className="text-sm font-medium">Remaining Budget</p>
                        <p className="text-sm text-muted-foreground">
                          $
                          {Number(formData.totalBudget) -
                            Number(formData.amountSpent)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Percentage Used</p>
                        <p className="text-sm text-muted-foreground">
                          {Number(formData.totalBudget) > 0
                            ? Math.round(
                                (Number(formData.amountSpent) /
                                  Number(formData.totalBudget)) *
                                  100
                              )
                            : 0}
                          %
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="team-info">
          <AccordionTrigger>Team Information</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Project Manager</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.projectManager || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Site Manager</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.siteManager || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Civil Manager</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.civilManager || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Architectural Lead</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.architecturalLead || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Workers</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.totalWorkers || "Not provided"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="milestones">
          <AccordionTrigger>
            Milestones ({formData.milestones.length})
          </AccordionTrigger>
          <AccordionContent>
            {formData.milestones.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No milestones added
              </p>
            ) : (
              <div className="space-y-4">
                {formData.milestones.map((milestone) => (
                  <Card key={milestone.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Name</p>
                          <p className="text-sm text-muted-foreground">
                            {milestone.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Date</p>
                          <p className="text-sm text-muted-foreground">
                            {milestone.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Status</p>
                          <p className="text-sm text-muted-foreground">
                            {milestone.status.charAt(0).toUpperCase() +
                              milestone.status.slice(1)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="checklist">
          <AccordionTrigger>
            Checklist Items ({formData.checklist.length})
          </AccordionTrigger>
          <AccordionContent>
            {formData.checklist.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No checklist items added
              </p>
            ) : (
              <div className="space-y-4">
                {formData.checklist.map((task) => {
                  const relatedMilestone = formData.milestones.find(
                    (m) => m.id === task.milestoneId
                  );

                  return (
                    <Card key={task.id}>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Task</p>
                            <p className="text-sm text-muted-foreground">
                              {task.task}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Assigned To</p>
                            <p className="text-sm text-muted-foreground">
                              {task.assignedTo}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Due Date</p>
                            <p className="text-sm text-muted-foreground">
                              {task.dueDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Status</p>
                            <p className="text-sm text-muted-foreground">
                              {task.status.charAt(0).toUpperCase() +
                                task.status.slice(1)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Priority</p>
                            <p className="text-sm text-muted-foreground">
                              {task.priority.charAt(0).toUpperCase() +
                                task.priority.slice(1)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Related Milestone
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {relatedMilestone?.name || "Unknown milestone"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="documents">
          <AccordionTrigger>
            Documents ({formData.documents.length})
          </AccordionTrigger>
          <AccordionContent>
            {formData.documents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No documents added
              </p>
            ) : (
              <div className="space-y-4">
                {paginatedDocuments.map((document) => (
                  <Card key={document.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <File className="h-8 w-8 mr-3 text-primary shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">
                            {document.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {document.fileName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-full">
                            {document.fileUrl}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination controls for documents */}
                {formData.documents.length > itemsPerPage && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Page {documentsPage} of {totalDocumentsPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setDocumentsPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={documentsPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setDocumentsPage((prev) =>
                            Math.min(prev + 1, totalDocumentsPages)
                          )
                        }
                        disabled={documentsPage === totalDocumentsPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="site-images">
          <AccordionTrigger>
            Site Images ({formData.siteImages.length})
          </AccordionTrigger>
          <AccordionContent>
            {formData.siteImages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No site images added
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {paginatedSiteImages.map((image) => (
                    <Card key={image.id}>
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                        {/* In a real app, you would display the image here */}
                        {/* <img src={image.imageUrl || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" /> */}
                      </div>
                      <CardContent className="pt-6">
                        <div>
                          <p className="text-sm font-medium">{image.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {image.location}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-full">
                            {image.imageUrl}
                          </p>
                          <p className="text-xs mt-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full inline-block">
                            {image.category.charAt(0).toUpperCase() +
                              image.category.slice(1)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination controls for site images */}
                {formData.siteImages.length > itemsPerPage && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Page {siteImagesPage} of {totalSiteImagesPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSiteImagesPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={siteImagesPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSiteImagesPage((prev) =>
                            Math.min(prev + 1, totalSiteImagesPages)
                          )
                        }
                        disabled={siteImagesPage === totalSiteImagesPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="letters">
          <AccordionTrigger>
            Letters (Outgoing: {formData.outgoingLetters.length}, Incoming:{" "}
            {formData.incomingLetters.length})
          </AccordionTrigger>
          <AccordionContent>
            {formData.outgoingLetters.length === 0 &&
            formData.incomingLetters.length === 0 ? (
              <p className="text-sm text-muted-foreground">No letters added</p>
            ) : (
              <div className="space-y-6">
                {formData.outgoingLetters.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Outgoing Letters
                    </h4>
                    <div className="space-y-4">
                      {paginatedOutgoingLetters.map((letter) => (
                        <Card key={letter.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-center">
                              <File className="h-8 w-8 mr-3 text-primary shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">
                                  {letter.subject}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  To: {letter.recipient}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {letter.fileName}
                                </p>
                                <p className="text-xs text-muted-foreground truncate max-w-full">
                                  {letter.fileUrl}
                                </p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      letter.priority === "high"
                                        ? "bg-red-100 text-red-800"
                                        : letter.priority === "medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {letter.priority.charAt(0).toUpperCase() +
                                      letter.priority.slice(1)}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      letter.status === "draft"
                                        ? "bg-gray-100 text-gray-800"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {letter.status.charAt(0).toUpperCase() +
                                      letter.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination for outgoing letters */}
                    {formData.outgoingLetters.length > itemsPerPage && (
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                          Page {lettersPage} of {totalOutgoingLettersPages}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setLettersPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={lettersPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setLettersPage((prev) =>
                                Math.min(prev + 1, totalOutgoingLettersPages)
                              )
                            }
                            disabled={lettersPage === totalOutgoingLettersPages}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {formData.incomingLetters.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Incoming Letters
                    </h4>
                    <div className="space-y-4">
                      {paginatedIncomingLetters.map((letter) => (
                        <Card key={letter.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-center">
                              <File className="h-8 w-8 mr-3 text-primary shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">
                                  {letter.subject}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  From: {letter.sender}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {letter.fileName}
                                </p>
                                <p className="text-xs text-muted-foreground truncate max-w-full">
                                  {letter.fileUrl}
                                </p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      letter.priority === "high"
                                        ? "bg-red-100 text-red-800"
                                        : letter.priority === "medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {letter.priority.charAt(0).toUpperCase() +
                                      letter.priority.slice(1)}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      letter.status === "unread"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {letter.status.charAt(0).toUpperCase() +
                                      letter.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination for incoming letters */}
                    {formData.incomingLetters.length > itemsPerPage && (
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                          Page {lettersPage} of {totalIncomingLettersPages}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setLettersPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={lettersPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setLettersPage((prev) =>
                                Math.min(prev + 1, totalIncomingLettersPages)
                              )
                            }
                            disabled={lettersPage === totalIncomingLettersPages}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reports">
          <AccordionTrigger>
            Reports ({formData.reports.length})
          </AccordionTrigger>
          <AccordionContent>
            {formData.reports.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reports added</p>
            ) : (
              <div className="space-y-4">
                {paginatedReports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <File className="h-8 w-8 mr-3 text-primary shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{report.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Publisher: {report.publisher}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {report.fileName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-full">
                            {report.fileUrl}
                          </p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                              {report.reportType.charAt(0).toUpperCase() +
                                report.reportType.slice(1)}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">
                              v{report.version}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                report.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {report.status.charAt(0).toUpperCase() +
                                report.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination for reports */}
                {formData.reports.length > itemsPerPage && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Page {reportsPage} of {totalReportsPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setReportsPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={reportsPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setReportsPage((prev) =>
                            Math.min(prev + 1, totalReportsPages)
                          )
                        }
                        disabled={reportsPage === totalReportsPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
