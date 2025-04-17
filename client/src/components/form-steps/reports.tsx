"use client";

import type React from "react";

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
import { Camera, File, Plus, Trash2, Upload } from "lucide-react";

interface ReportsProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Reports({ formData, updateFormData }: ReportsProps) {
  // Update the state to include isUploading
  const [newReport, setNewReport] = useState({
    title: "",
    publisher: "",
    reportType: "daily" as
      | "daily"
      | "weekly"
      | "monthly"
      | "quarterly"
      | "annually",
    version: "",
    status: "approved" as "approved" | "rejected",
    file: null as File | null,
    isUploading: false,
  });

  // This function would upload the file to your storage service
  const uploadFile = async (
    file: File
  ): Promise<{ url: string; fileName: string }> => {
    // In a real implementation, you would:
    // 1. Create a FormData object
    // 2. Append the file to it
    // 3. Send it to your backend API
    // 4. Get the URL back

    // For now, we'll simulate this with a timeout
    setNewReport((prev) => ({ ...prev, isUploading: true }));

    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be the URL returned from your storage service
        const mockUrl = `https://storage.example.com/${file.name}`;
        resolve({ url: mockUrl, fileName: file.name });
        setNewReport((prev) => ({ ...prev, isUploading: false }));
      }, 1000);
    });
  };

  // Update the addReport function
  const addReport = async () => {
    if (
      newReport.title &&
      newReport.publisher &&
      newReport.version &&
      newReport.file
    ) {
      try {
        // Upload the file and get the URL
        const { url, fileName } = await uploadFile(newReport.file);

        // Add the report with the URL to the form data
        const updatedReports = [
          ...formData.reports,
          {
            id: Date.now().toString(),
            title: newReport.title,
            publisher: newReport.publisher,
            reportType: newReport.reportType,
            version: newReport.version,
            status: newReport.status,
            fileUrl: url,
            fileName: fileName,
          },
        ];

        updateFormData({ reports: updatedReports });

        // Reset the form
        setNewReport({
          title: "",
          publisher: "",
          reportType: "daily",
          version: "",
          status: "approved",
          file: null,
          isUploading: false,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      }
    }
  };

  const removeReport = (id: string) => {
    const updatedReports = formData.reports.filter(
      (report) => report.id !== id
    );
    updateFormData({ reports: updatedReports });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewReport({ ...newReport, file: e.target.files[0] });
    }
  };

  // This would be implemented with a camera API in a real application
  const handleCameraCapture = () => {
    alert(
      "Camera functionality would be implemented here to capture report documents."
    );
    // In a real implementation, you would:
    // 1. Access the device camera
    // 2. Allow capturing multiple images
    // 3. Convert images to PDF
    // 4. Set the resulting file to newReport.file
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Project Reports</h3>
      <p className="text-sm text-muted-foreground">
        Upload and manage reports for your construction project.
      </p>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reportTitle">Report Title</Label>
              <Input
                id="reportTitle"
                value={newReport.title}
                onChange={(e) =>
                  setNewReport({ ...newReport, title: e.target.value })
                }
                placeholder="Enter report title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                value={newReport.publisher}
                onChange={(e) =>
                  setNewReport({ ...newReport, publisher: e.target.value })
                }
                placeholder="Enter publisher name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select
                value={newReport.reportType}
                onValueChange={(value) =>
                  setNewReport({
                    ...newReport,
                    reportType: value as
                      | "daily"
                      | "weekly"
                      | "monthly"
                      | "quarterly"
                      | "annually",
                  })
                }
              >
                <SelectTrigger id="reportType">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={newReport.version}
                onChange={(e) =>
                  setNewReport({ ...newReport, version: e.target.value })
                }
                placeholder="Enter version (e.g., 1.0)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportStatus">Status</Label>
              <Select
                value={newReport.status}
                onValueChange={(value) =>
                  setNewReport({
                    ...newReport,
                    status: value as "approved" | "rejected",
                  })
                }
              >
                <SelectTrigger id="reportStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Report File</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="file"
                    id="reportFile"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                  />
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                  </Button>
                </div>

                <Button variant="outline" onClick={handleCameraCapture}>
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              {newReport.file && (
                <p className="text-sm text-muted-foreground mt-1">
                  Selected: {newReport.file.name}
                </p>
              )}
            </div>
          </div>

          {/* Update the button state to show uploading state */}
          <Button
            onClick={addReport}
            className="mt-4"
            disabled={
              !newReport.title ||
              !newReport.publisher ||
              !newReport.version ||
              !newReport.file ||
              newReport.isUploading
            }
          >
            {newReport.isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {formData.reports.length > 0 && (
        <div className="space-y-4 mt-6">
          <h4 className="font-medium">Added Reports</h4>

          {formData.reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <File className="h-8 w-8 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm">Publisher: {report.publisher}</p>
                      <div className="flex items-center gap-2 mt-1">
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

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeReport(report.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
