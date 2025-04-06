"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  File,
  X,
  Camera,
  ImageIcon,
  FileText,
  FileIcon as FilePdf,
  FileImage,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

interface FileUploaderProps {
  onUpload: (files: File[]) => Promise<void>;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  allowCamera?: boolean;
  title?: string;
}

export default function FileUploader({
  onUpload,
  accept = "*/*",
  multiple = true,
  maxFiles = 10,
  allowCamera = false,
  title = "Upload Files",
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const totalFiles = [...files, ...newFiles];

      if (totalFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files at once.`);
        return;
      }

      setFiles(totalFiles);
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
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
              const newFile = new File([blob], `photo-${Date.now()}.jpg`, {
                type: "image/jpeg",
              });
              setFiles([...files, newFile]);
            }
          },
          "image/jpeg",
          0.9
        );
      }
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file to upload");
      return;
    }

    try {
      setIsUploading(true);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 200);

      // Call the provided upload function
      await onUpload(files);

      // Complete progress and reset
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setFiles([]);
        setProgress(0);
        setIsUploading(false);
        if (cameraActive) stopCamera();
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
      setIsUploading(false);
      setProgress(0);
    }
  };

  // Get appropriate icon for file type
  const getFileIcon = (file: File) => {
    const type = file.type;

    if (type.startsWith("image/"))
      return <FileImage className="h-6 w-6 text-blue-500" />;
    if (type === "application/pdf")
      return <FilePdf className="h-6 w-6 text-red-500" />;
    if (type.includes("document") || type.includes("text"))
      return <FileText className="h-6 w-6 text-green-500" />;
    return <File className="h-6 w-6 text-gray-500" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>

        <div className="flex gap-2">
          {allowCamera && (
            <Button
              type="button"
              variant={cameraActive ? "destructive" : "outline"}
              size="sm"
              onClick={cameraActive ? stopCamera : startCamera}
            >
              <Camera className="h-4 w-4 mr-2" />
              {cameraActive ? "Stop Camera" : "Use Camera"}
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Browse Files
          </Button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      {cameraActive && (
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
            Capture Photo
          </Button>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm text-gray-500">
            {files.length} {files.length === 1 ? "file" : "files"} selected
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {files.map((file, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {file.type.startsWith("image/") ? (
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
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
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
                          {getFileIcon(file)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => removeFile(index)}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {files.length === 0 && !cameraActive && (
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <div className="mx-auto flex flex-col items-center justify-center">
            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-1">
              Drag and drop your files here, or click "Browse Files"
            </p>
            <p className="text-xs text-gray-400">
              Supports {accept.replace(/\*/g, "all")} files
            </p>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {files.length > 0 && (
        <Button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? "Uploading..." : "Upload Files"}
        </Button>
      )}
    </div>
  );
}
