"use client";

import type React from "react";
import { useRef, useState } from "react";
import type { FormData as ProjectFormData } from "../project-form";

interface Report {
  id: string;
  title: string;
  publisher: string;
  reportType: "daily" | "weekly" | "monthly" | "quarterly" | "annually";
  version: string;
  status: "approved" | "rejected";
  fileUrl: any;
  fileName: string;
}

interface ExtendedFormData extends ProjectFormData {
  reports?: Report[];
}
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
import useFileUploader from "@/app/action/useFileuploader";
import Image from "next/image";
interface ReportsProps {
  formData: ProjectFormData;
  updateFormData: (data: Partial<ExtendedFormData>) => void;
}

export default function Reports({ formData, updateFormData }: ReportsProps) {
  const { uploadFiles } = useFileUploader();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [fileSystemImages, setFileSystemImages] = useState<File[]>([]);
  const { uploadFiles: uploadImageFiles } = useFileUploader();
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

  // const uploadFilesToServer = async (files: File[]) => {
  //   try {
  //     setNewReport((prev) => ({ ...prev, isUploading: true }));
  //     const fileData=
  //     const response = await uploadFiles(files);
  //     return response.map(
  //       (res: PromiseSettledResult<{ fileURL: string }>, index: number) => ({
  //         url: res.status === "fulfilled" ? res.value.fileURL : "",
  //         fileName: files[index].name,
  //       })
  //     );
  //   } finally {
  //     setNewReport((prev) => ({ ...prev, isUploading: false }));
  //   }
  // };

  const addReport = async () => {
    if (
      newReport.title &&
      newReport.publisher &&
      newReport.version &&
      newReport.files.length > 0
    ) {
      try {
        interface Report {
          id: string;
          title: string;
          publisher: string;
          reportType: "daily" | "weekly" | "monthly" | "quarterly" | "annually";
          version: string;
          status: "approved" | "rejected";
          fileUrl: any;
          fileName: string;
        }

        let upload: Report[] = [];

        // Handle PDF files upload
        if (newReport.files.length > 0) {
          const fileData = new FormData();
          newReport.files.forEach((file) => fileData.append("files", file));

          const fileres = await uploadFiles(fileData);
          console.log("File upload response:", fileres);

          if (fileres && fileres.upload) {
            const updatedReports: Report[] = [
              {
                id: `${Date.now()}`,
                title: newReport.title,
                publisher: newReport.publisher,
                reportType: newReport.reportType,
                version: newReport.version,
                status: newReport.status,
                fileUrl: fileres.upload.map((url: any) => url.qrPDFURL || url),
                fileName: newReport.files.map((file) => file.name).join(", "),
              },
            ];
            upload = [...updatedReports];
          }
        }

        // Handle image files upload
        if (fileSystemImages.length > 0) {
          const formDataobj = new FormData();
          fileSystemImages.forEach((file) =>
            formDataobj.append("images", file)
          );

          const uploadResult = await uploadImageFiles(formDataobj);
          console.log("Image upload response:", uploadResult);

          if (uploadResult && uploadResult.fileURL) {
            const updatedReports: Report[] = [
              {
                id: `${Date.now()}`,
                title: newReport.title,
                publisher: newReport.publisher,
                reportType: newReport.reportType,
                version: newReport.version,
                status: newReport.status,
                fileUrl: uploadResult.fileURL,
                fileName: fileSystemImages.map((file) => file.name).join(", "),
              },
            ];
            upload = [...upload, ...updatedReports];
          }
        }

        console.log("Final upload data:", upload);
        updateFormData({ reports: [...(formData.reports || []), ...upload] });

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
      }
    }
  };

  const removeReport = (id: string) => {
    const updatedReports = (formData.reports || []).filter(
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

  const handleCameraCapture = () => {
    alert(
      "Camera functionality would be implemented here to capture report documents."
    );
  };
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = async () => {
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
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFileSystemImages((prev) => [...prev, ...files]);
    }
  };
  const removeImage = (index: number, isCameraImage: boolean) => {
    setFileSystemImages((prev) => prev.filter((_, i) => i !== index));
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
            {/* Form fields remain the same */}
            {/* ... */}
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
                    accept=".pdf,application/pdf"
                    multiple
                  />
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Files
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    type="file"
                    id="outgoingImages"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileSystemImageUpload}
                    accept="image/*"
                    multiple
                  />
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Images
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
                            onClick={() => removeImage(index, false)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
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
              newReport.files.length === 0 ||
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

      {(formData.reports?.length ?? 0) > 0 && (
        <div className="space-y-4 mt-6">
          <h4 className="font-medium">Added Reports</h4>

          {(formData.reports ?? []).map((report) => (
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
                      <a
                        href={
                          Array.isArray(report.fileUrl)
                            ? report.fileUrl[0] || "#"
                            : report.fileUrl || "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline mt-1 block"
                      >
                        {report.fileName || "View File"}
                      </a>
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
