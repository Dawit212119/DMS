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
  FileText,
  Upload,
  Trash2,
  FileIcon,
  PlusCircle,
  Camera,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useImageUploader from "@/app/action/useImageuploader";
import useFileUploader from "@/app/action/useFileuploader";

export default function DocumentsStep() {
  const { formData, addDocument, removeDocument, getDocumentsByType } =
    useProjectForm();
  const [files, setFiles] = useState<File[]>([]);
  const [imageFile, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [category, setCategory] = useState("general");

  const documents = getDocumentsByType("document");
  const { uploadFiles: UploadFile } = useFileUploader();

  // Add these state variables and refs inside the DocumentsStep component
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { uploadFiles, error } = useImageUploader();
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  // Remove a file from the selection
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Add these camera-related functions inside the DocumentsStep component

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
              const newFile = new File([blob], `doc-photo-${Date.now()}.jpg`, {
                type: "image/jpeg",
              });
              setImageFiles([...imageFile, newFile]);
            }
          },
          "image/jpeg",
          0.9
        );
      }
    }
  };

  // Reset form after upload
  const resetForm = () => {
    setFiles([]);
    setImageFiles([]);
    setTitle("");
    setCategory("general");
    setProgress(0);
    setIsUploading(false);
    if (cameraActive) stopCamera();

    // Reset file input
    const fileInput = document.getElementById("doc-file") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  // Upload documents
  const handleUpload = async () => {
    // Check if at least one file or image is selected
    if (
      (!imageFile || imageFile.length === 0) &&
      (!files || files.length === 0)
    ) {
      alert("Please select at least one file or capture an image to upload");
      return;
    }

    // Check if title is provided
    if (!title.trim()) {
      alert("Please enter a document title");
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      // Upload images (if any)
      if (imageFile && imageFile.length > 0) {
        const imageFormData = new FormData();
        imageFile.forEach((img) => imageFormData.append("images", img));
        const res = await uploadFiles(imageFormData);
        console.log("Image upload result:", res);
        setPdfUrl(res.pdfUrl!);
      }

      // Upload files (if any)
      if (files && files.length > 0) {
        const fileFormData = new FormData();
        files.forEach((file) => fileFormData.append("files", file));
        const res = await UploadFile(fileFormData);
        console.log("File upload result:", res);
      }

      // Simulate progress (optional, can be replaced with real progress tracking)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 200);

      // Simulate processing delay (replace with actual API calls)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add documents to state (for UI update)
      if (files && files.length > 0) {
        files.forEach((file) => {
          const newDocument: ProjectDocument = {
            id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: "document",
            name: title || file.name,
            date: new Date().toISOString(),
            url: URL.createObjectURL(file),
            metadata: {
              category,
              size: file.size,
              type: file.type,
            },
          };
          addDocument(newDocument);
        });
      }

      // Complete progress
      clearInterval(progressInterval);
      setProgress(100);

      // Reset form after successful upload
      setTimeout(() => {
        resetForm();
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload documents. Please try again.");
      setIsUploading(false);
      setProgress(0);
    }
  };

  // Add another document
  const handleAddAnother = () => {
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Project Documents</h3>
        <p className="text-sm text-gray-500 mb-6">
          Upload important project documents such as contracts, specifications,
          permits, and other files.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doc-title">Document Title</Label>
              <Input
                id="doc-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doc-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="doc-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="specification">Specification</SelectItem>
                  <SelectItem value="permit">Permit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Label htmlFor="doc-file">Document Source</Label>
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
                <Button onClick={startCamera}>start camera</Button>

                <Button type="button" onClick={captureImage} className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Document Photo
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    Drag and drop your files here, or click to browse
                  </p>
                  <input
                    id="doc-file"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("doc-file")?.click()}
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

                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-5 w-5 text-blue-500" />
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
              <Button type="button" onClick={handleUpload} className="flex-1">
                <Upload className="h-4 w-4 mr-2 bg-black" />
                Upload Document
              </Button>

              {documents.length > 0 && !isUploading && (
                <Button
                  type="button"
                  onClick={handleAddAnother}
                  variant="outline"
                  className="flex-1"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Another Document
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          Uploaded Documents ({documents.length})
        </h3>

        {documents.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
            No documents uploaded yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
                        <FileText className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h4 className="font-medium truncate">{doc.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 ml-2"
                          onClick={() => removeDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>

                      <p className="text-xs text-gray-500">
                        {new Date(doc.date).toLocaleDateString()}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.metadata.category && (
                          <Badge variant="outline" className="text-xs">
                            {doc.metadata.category}
                          </Badge>
                        )}
                      </div>

                      <div className="mt-2">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View Document
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
