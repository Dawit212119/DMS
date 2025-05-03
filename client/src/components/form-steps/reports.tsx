"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import type { FormData as ProjectFormData } from "../project-form";
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
import {
  Camera,
  File,
  Plus,
  Trash2,
  Upload,
  ExternalLink,
  Check,
  X,
} from "lucide-react";
import useFileUploader from "@/app/action/useFileuploader";
import Image from "next/image";
import useImageUploader from "@/app/action/useImageuploader";
import { Badge } from "@/components/ui/badge";

interface ReportsProps {
  formData: ProjectFormData;
  updateFormData: (data: Partial<ProjectFormData>) => void;
}

export default function Reports({ formData, updateFormData }: ReportsProps) {
  const { uploadFiles } = useFileUploader();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [fileSystemImages, setFileSystemImages] = useState<File[]>([]);
  const { uploadFiles: uploadImageFiles } = useImageUploader();

  // State to track which existing reports to keep
  const [reportsToKeep, setReportsToKeep] = useState<string[]>(
    formData.reports.map((report) => report.id)
  );

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
    files: [] as File[],
    isUploading: false,
  });

  // Update reportsToKeep when formData.reports changes
  useEffect(() => {
    setReportsToKeep(formData.reports.map((report) => report.id));
  }, [formData.reports]);

  const toggleKeepReport = (id: string) => {
    setReportsToKeep((prev) =>
      prev.includes(id)
        ? prev.filter((reportId) => reportId !== id)
        : [...prev, id]
    );
  };

  // Update the addReport function to better handle file uploads and get URLs
  const addReport = async () => {
    if (
      newReport.title &&
      newReport.publisher &&
      newReport.version &&
      (newReport.files.length > 0 || fileSystemImages.length > 0)
    ) {
      try {
        setNewReport((prev) => ({ ...prev, isUploading: true }));

        const upload: any[] = [];

        // Handle non-image files upload
        if (newReport.files.length > 0) {
          const fileData = new FormData();
          newReport.files.forEach((file) => fileData.append("files", file));
          const fileRes = await uploadFiles(fileData);

          if (fileRes?.success && Array.isArray(fileRes.upload)) {
            const uploadedFiles = {
              id: `${Date.now()}`,
              title: newReport.title,
              publisher: newReport.publisher,
              reportType: newReport.reportType,
              version: newReport.version,
              status: newReport.status,
              fileUrl: fileRes.upload.map(
                (item: any) => item.value?.qrPDFURL || ""
              ),
              fileName: newReport.files.map((file) => file.name).join(", "),
            };
            upload.push(uploadedFiles);
          }
        }

        // Handle image files upload
        if (fileSystemImages.length > 0) {
          const imgForm = new FormData();
          fileSystemImages.forEach((img) => imgForm.append("images", img));
          const imageRes = await uploadImageFiles(imgForm);

          if (imageRes?.fileURL) {
            const uploadedImages = {
              id: `${Date.now()}-img`,
              title: newReport.title,
              publisher: newReport.publisher,
              reportType: newReport.reportType,
              version: newReport.version,
              status: newReport.status,
              fileUrl: imageRes.fileURL,
              fileName: fileSystemImages.map((file) => file.name).join(", "),
            };
            upload.push(uploadedImages);
          }
        }

        // Get existing reports that should be kept
        const keptReports = formData.reports.filter((report) =>
          reportsToKeep.includes(report.id)
        );

        // Update form data with the uploaded files and kept reports
        updateFormData({
          reports: [...keptReports, ...upload],
        });

        // Reset form state
        setNewReport({
          title: "",
          publisher: "",
          reportType: "daily",
          version: "",
          status: "approved",
          files: [],
          isUploading: false,
        });
        setFileSystemImages([]);
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("Failed to upload files. Please try again.");
        setNewReport((prev) => ({ ...prev, isUploading: false }));
      }
    }
  };

  const removeReport = (id: string) => {
    // Remove from reportsToKeep
    setReportsToKeep((prev) => prev.filter((reportId) => reportId !== id));

    // Remove from formData
    const updatedReports = formData.reports.filter(
      (report) => report.id !== id
    );
    updateFormData({ reports: updatedReports });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setNewReport((prev) => ({
        ...prev,
        files: [...prev.files, ...filesArray],
      }));
    }
  };

  const removeSelectedFile = (index: number) => {
    setNewReport((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = async () => {
    if (newReport.isUploading) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (newReport.isUploading) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new window.File(
            [blob],
            `camera-capture-${Date.now()}.png`,
            {
              type: "image/png",
            }
          );
          setFileSystemImages((prev) => [...prev, file]);
          stopCamera();
        }
      }, "image/png");
    }
  };

  const handleFileSystemImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (newReport.isUploading) return;

    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFileSystemImages((prev) => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    if (newReport.isUploading) return;
    setFileSystemImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-blue-green-gradient">
          Project Reports
        </h3>
        <p className="text-gray-600">
          Upload and manage reports for your construction project.
        </p>
      </div>

      {/* Existing Reports Section */}
      {formData.reports.length > 0 && (
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-gray-800">
              Existing Reports
            </h4>
            <Badge variant="outline">
              {reportsToKeep.length} of {formData.reports.length} selected
            </Badge>
          </div>

          <div className="space-y-3">
            {formData.reports.map((report) => (
              <Card
                key={report.id}
                className={`overflow-hidden transition-colors ${
                  reportsToKeep.includes(report.id)
                    ? "border-green-200"
                    : "border-red-200 bg-red-50"
                }`}
              >
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
                          <Badge
                            variant="outline"
                            className={
                              reportsToKeep.includes(report.id)
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {reportsToKeep.includes(report.id)
                              ? "Keep"
                              : "Remove"}
                          </Badge>
                        </div>
                        {typeof report.fileUrl === "string" && (
                          <a
                            href={report.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 mt-1"
                          >
                            <ExternalLink className="h-3 w-3" /> View report
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant={
                          reportsToKeep.includes(report.id)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => toggleKeepReport(report.id)}
                        className={
                          reportsToKeep.includes(report.id)
                            ? "bg-green-600"
                            : ""
                        }
                      >
                        {reportsToKeep.includes(report.id) ? (
                          <Check className="h-4 w-4 mr-1" />
                        ) : (
                          <X className="h-4 w-4 mr-1" />
                        )}
                        {reportsToKeep.includes(report.id) ? "Keep" : "Remove"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeReport(report.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* New Report Form */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newReport.title}
                  onChange={(e) =>
                    setNewReport((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter report title"
                  disabled={newReport.isUploading}
                />
              </div>

              {/* Publisher Input */}
              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  value={newReport.publisher}
                  onChange={(e) =>
                    setNewReport((prev) => ({
                      ...prev,
                      publisher: e.target.value,
                    }))
                  }
                  placeholder="Enter publisher name"
                  disabled={newReport.isUploading}
                />
              </div>

              {/* Report Type Select */}
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select
                  value={newReport.reportType}
                  onValueChange={(value) =>
                    setNewReport((prev) => ({
                      ...prev,
                      reportType: value as typeof newReport.reportType,
                    }))
                  }
                  disabled={newReport.isUploading}
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

              {/* Version Input */}
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={newReport.version}
                  onChange={(e) =>
                    setNewReport((prev) => ({
                      ...prev,
                      version: e.target.value,
                    }))
                  }
                  placeholder="Enter version"
                  disabled={newReport.isUploading}
                />
              </div>

              {/* Status Select */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newReport.status}
                  onValueChange={(value) =>
                    setNewReport((prev) => ({
                      ...prev,
                      status: value as typeof newReport.status,
                    }))
                  }
                  disabled={newReport.isUploading}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Report Files</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="file"
                    id="reportFiles"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept="*/"
                    multiple
                    disabled={newReport.isUploading}
                  />
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    disabled={newReport.isUploading}
                  >
                    {newReport.isUploading ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> Upload Files
                      </>
                    )}
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    type="file"
                    id="reportImages"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileSystemImageUpload}
                    accept="image/*"
                    multiple
                    disabled={newReport.isUploading}
                  />
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    disabled={newReport.isUploading}
                  >
                    {newReport.isUploading ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> Upload Images
                      </>
                    )}
                  </Button>
                  {fileSystemImages.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {fileSystemImages.map((img, index) => (
                        <div key={`file-${index}`} className="relative">
                          <Image
                            width={80}
                            height={80}
                            src={URL.createObjectURL(img) || "/placeholder.svg"}
                            alt={`Uploaded ${index}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            disabled={newReport.isUploading}
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    startCamera();
                    setTimeout(() => capturePhoto(), 2000); // Capture after 2 seconds
                  }}
                  disabled={newReport.isUploading}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              {isCameraActive && (
                <div className="mt-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    className="border transform scale-x-[-1]" // Flip horizontally
                    width="300"
                    height="300"
                  />
                  <canvas
                    ref={canvasRef}
                    className="hidden"
                    width="300"
                    height="300"
                  />
                </div>
              )}

              {newReport.files.length > 0 && (
                <div className="mt-2 space-y-2">
                  {newReport.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm truncate max-w-xs">
                        {file.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSelectedFile(index)}
                        disabled={newReport.isUploading}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={addReport}
            className="mt-4"
            disabled={
              !newReport.title ||
              !newReport.publisher ||
              !newReport.version ||
              (newReport.files.length === 0 && fileSystemImages.length === 0) ||
              newReport.isUploading
            }
          >
            {newReport.isUploading ? (
              <>
                <span className="animate-spin mr-2">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
                Uploading...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Summary for reports */}
      {formData.reports.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-700 mb-2">Reports Summary</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50">
                {reportsToKeep.length}
              </Badge>
              <span>Reports to keep</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="outline" className="bg-red-50">
                {formData.reports.length - reportsToKeep.length}
              </Badge>
              <span>Reports to remove</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50">
                {newReport.files.length + fileSystemImages.length}
              </Badge>
              <span>New files to upload</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
