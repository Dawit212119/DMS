"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useProjectForm, type ProjectDocument } from "../project-form-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  FileBarChart,
  Upload,
  Trash2,
  FileIcon,
  Camera,
  PlusCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ReportsStep() {
  const { formData, addDocument, removeDocument, getDocumentsByType } =
    useProjectForm();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [reportType, setReportType] = useState("monthly");
  const [status, setStatus] = useState("approved");
  const [version, setVersion] = useState("");
  const [cameraActive, setCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reports = getDocumentsByType("report");

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  // Remove a file from the selection
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Reset form after upload
  const resetForm = () => {
    setFiles([]);
    setTitle("");
    setPublisher("");
    setVersion("");
    setProgress(0);
    setIsUploading(false);
    if (cameraActive) stopCamera();

    // Reset file input
    const fileInput = document.getElementById(
      "report-file"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  // Start camera for image capture
  const startCamera = async () => {
    try {
      setCameraActive(true);
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please check permissions.");
      setCameraActive(false);
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File(
                [blob],
                `report-photo-${Date.now()}.jpg`,
                { type: "image/jpeg" }
              );
              setFiles([...files, newFile]);
            }
          },
          "image/jpeg",
          0.9
        );
      }
    }
  };

  // Upload reports
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file to upload");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a report title");
      return;
    }

    setIsUploading(true);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        return newProgress >= 90 ? 90 : newProgress;
      });
    }, 200);

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Process each file
      for (const file of files) {
        const objectUrl = URL.createObjectURL(file);
        const isImage = file.type.startsWith("image/");

        const newDocument: ProjectDocument = {
          id: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: "report",
          name: title || file.name,
          date: new Date().toISOString(),
          url: objectUrl,
          thumbnailUrl: isImage ? objectUrl : undefined,
          metadata: {
            publisher,
            reportType,
            status,
            version,
            size: file.size,
            type: file.type,
          },
        };

        addDocument(newDocument);
      }

      // Complete progress
      clearInterval(progressInterval);
      setProgress(100);

      // Reset form
      setTimeout(() => {
        resetForm();
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload reports. Please try again.");
      clearInterval(progressInterval);
      setIsUploading(false);
      setProgress(0);
    }
  };

  // Add another report
  const handleAddAnother = () => {
    resetForm();
  };

  // Get report type display name
  const getReportTypeDisplay = (type: string) => {
    switch (type) {
      case "daily":
        return "Daily Report";
      case "weekly":
        return "Weekly Report";
      case "monthly":
        return "Monthly Report";
      case "quarterly":
        return "Quarterly Report";
      case "annually":
        return "Annual Report";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Project Reports</h3>
        <p className="text-sm text-gray-500 mb-6">
          Upload project reports or take photos of physical report documents.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-title">Report Title</Label>
              <Input
                id="report-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter report title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-publisher">Publisher</Label>
              <Input
                id="report-publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Enter publisher name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Report</SelectItem>
                    <SelectItem value="weekly">Weekly Report</SelectItem>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                    <SelectItem value="quarterly">Quarterly Report</SelectItem>
                    <SelectItem value="annually">Annual Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="report-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-version">Version</Label>
                <Input
                  id="report-version"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="Enter version (e.g., 1.0)"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Label>Report Source</Label>
              <Button
                type="button"
                variant={cameraActive ? "destructive" : "outline"}
                size="sm"
                onClick={cameraActive ? stopCamera : startCamera}
              >
                <Camera className="h-4 w-4 mr-2" />
                {cameraActive ? "Stop Camera" : "Use Camera"}
              </Button>
            </div>

            {cameraActive ? (
              <div className="space-y-3">
                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-h-[300px] object-contain mx-auto"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>

                <Button type="button" onClick={captureImage} className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Report Photo
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <FileBarChart className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    Drag and drop your files here, or click to browse
                  </p>
                  <input
                    id="report-file"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("report-file")?.click()
                    }
                  >
                    Browse Files
                  </Button>
                </div>
              </div>
            )}

            {files.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm text-gray-500">
                  {files.length} {files.length === 1 ? "file" : "files"}{" "}
                  selected
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        {file.type.startsWith("image/") ? (
                          <div className="relative h-10 w-10 rounded-md overflow-hidden">
                            <Image
                              src={
                                URL.createObjectURL(file) || "/placeholder.svg"
                              }
                              alt={file.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <FileIcon className="h-5 w-5 text-blue-500" />
                        )}
                        <span className="text-sm truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => removeFile(index)}
                        disabled={isUploading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              {files.length > 0 && !isUploading && (
                <Button type="button" onClick={handleUpload} className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Report
                </Button>
              )}

              {reports.length > 0 && !isUploading && (
                <Button
                  type="button"
                  onClick={handleAddAnother}
                  variant="outline"
                  className="flex-1"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Another Report
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          Uploaded Reports ({reports.length})
        </h3>

        {reports.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
            No reports uploaded yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => (
              <Card key={report.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      {report.thumbnailUrl ? (
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                          <Image
                            src={report.thumbnailUrl || "/placeholder.svg"}
                            alt={report.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
                          <FileBarChart className="h-6 w-6 text-purple-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h4 className="font-medium truncate">{report.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 ml-2"
                          onClick={() => removeDocument(report.id)}
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>

                      {report.metadata.publisher && (
                        <p className="text-xs text-gray-500">
                          Publisher: {report.metadata.publisher}
                        </p>
                      )}

                      {report.metadata.version && (
                        <p className="text-xs text-gray-500">
                          Version: {report.metadata.version}
                        </p>
                      )}

                      <p className="text-xs text-gray-500">
                        {new Date(report.date).toLocaleDateString()}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {getReportTypeDisplay(report.metadata.reportType)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            report.metadata.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {report.metadata.status}
                        </Badge>
                      </div>

                      <div className="mt-2">
                        <a
                          href={report.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View Report
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
