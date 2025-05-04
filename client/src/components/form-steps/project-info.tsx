"use client";

import type React from "react";

import type { FormData } from "../project-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

declare global {
  interface Window {
    validationErrors?: string[];
  }
}

interface ProjectInfoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function ProjectInfo({
  formData,
  updateFormData,
}: ProjectInfoProps) {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.validationErrors) {
      setValidationErrors(window.validationErrors);
    }
  }, []);

  // Clean up object URL when component unmounts or when a new image is selected
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clean up previous preview if exists
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    // Create a preview URL for the selected file
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    setSelectedFile(file);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // from Cloudinary
    formData.append("folder", "project_covers");

    try {
      const res = await fetch("http://localhost:8000/upload/coverimg", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Upload failed with status: ${res.status}`);
      }

      const data = await res.json();
      console.log("data>>>>>>>", data);
      if (data.url) {
        updateFormData({ coverImage: data.url });
        // Clear the preview and selected file after successful upload
        setPreviewImage(null);
        setSelectedFile(null);
      } else {
        throw new Error("No secure URL returned from server");
      }
    } catch (err) {
      console.log("Image upload failed", err);
      // You might want to show an error message to the user here
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    // If there's a preview, remove it
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
      setSelectedFile(null);
    }

    // If there's an uploaded image, remove it from form data
    if (formData.coverImage) {
      updateFormData({ coverImage: "" });
    }
  };

  // Add this function after handleImageSelect
  const autoUploadImage = (file: File) => {
    if (!file) return;

    // Create a new FormData instance
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "YOUR_UPLOAD_PRESET");
    uploadData.append("folder", "project_covers");

    setUploading(true);

    fetch("http://localhost:8000/upload/coverimg", {
      method: "POST",
      body: uploadData,
      credentials: "include",
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error("Upload failed");
        return response.json();
      })
      .then((data) => {
        console.log("data>>>.", data);
        if (data.url) {
          updateFormData({ coverImage: data.url });
          setPreviewImage(null);
          setSelectedFile(null);
        }
      })
      .catch((error) => {
        console.log("Auto upload failed:", error);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-blue-green-gradient inline-block">
          Project Information
        </h3>
        <p className="text-gray-600">
          Enter the basic details about your construction project.
        </p>
        <p className="text-red-500 text-sm font-medium">
          * All fields are required
        </p>
      </div>

      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Please fix the following errors:</p>
          <ul className="list-disc pl-5 mt-1 text-sm">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <Card className="p-6 border border-blue-100 bg-blue-50/50 space-y-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Text Fields */}
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-blue-700">
              Project Name
            </Label>
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={(e) => updateFormData({ projectName: e.target.value })}
              placeholder="Enter project name"
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-blue-700">
              Client Name
            </Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => updateFormData({ clientName: e.target.value })}
              placeholder="Enter client name"
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-blue-700">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              placeholder="Enter project location"
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-blue-700">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => updateFormData({ startDate: e.target.value })}
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-blue-700">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => updateFormData({ endDate: e.target.value })}
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Cover Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="coverImage" className="text-blue-700">
            Project Cover Image
          </Label>

          <div className="space-y-4">
            <Input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
            />

            {/* Image Preview Section */}
            {(previewImage || formData.coverImage) && (
              <div className="relative mt-3 inline-block">
                <div className="relative">
                  {previewImage ? (
                    <>
                      <div className="relative w-full max-w-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={previewImage || "/placeholder.svg"}
                          alt="Preview"
                          className="max-h-48 rounded-lg border border-blue-200 shadow-sm object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={handleRemoveImage}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove image</span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">
                        Preview (not uploaded yet)
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Button
                          type="button"
                          onClick={handleImageUpload}
                          disabled={uploading}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {uploading ? "Uploading..." : "Upload Image"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleRemoveImage}
                          className="border-blue-200 text-blue-700"
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : formData.coverImage ? (
                    <>
                      <div className="relative w-full max-w-md">
                        {/* Using img tag instead of Next.js Image for better control */}
                        <Image
                          src={formData.coverImage || "/placeholder.svg"}
                          alt="Cover"
                          className="max-h-48 w-full rounded-lg border border-blue-200 shadow-sm object-cover"
                          width={300}
                          height={200}
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={handleRemoveImage}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove image</span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        Uploaded successfully
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {uploading && !previewImage && (
              <p className="text-sm text-blue-600">Uploading...</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
