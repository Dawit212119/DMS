"use client";

import type React from "react";

import { useState } from "react";
import type { FormData } from "../project-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, File, Plus, Trash2, Upload } from "lucide-react";

interface ProjectDocumentsProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function ProjectDocuments({
  formData,
  updateFormData,
}: ProjectDocumentsProps) {
  const [newDocument, setNewDocument] = useState({
    title: "",
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
    setNewDocument((prev) => ({ ...prev, isUploading: true }));

    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be the URL returned from your storage service
        const mockUrl = `https://storage.example.com/${file.name}`;
        resolve({ url: mockUrl, fileName: file.name });
        setNewDocument((prev) => ({ ...prev, isUploading: false }));
      }, 1000);
    });
  };

  const addDocument = async () => {
    if (newDocument.title && newDocument.file) {
      try {
        // Upload the file and get the URL
        const { url, fileName } = await uploadFile(newDocument.file);

        // Add the document with the URL to the form data
        const updatedDocuments = [
          ...formData.documents,
          {
            id: Date.now().toString(),
            title: newDocument.title,
            fileUrl: url,
            fileName: fileName,
          },
        ];

        updateFormData({ documents: updatedDocuments });

        // Reset the form
        setNewDocument({
          title: "",
          file: null,
          isUploading: false,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      }
    }
  };

  const removeDocument = (id: string) => {
    const updatedDocuments = formData.documents.filter((doc) => doc.id !== id);
    updateFormData({ documents: updatedDocuments });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDocument({ ...newDocument, file: e.target.files[0] });
    }
  };

  // This would be implemented with a camera API in a real application
  const handleCameraCapture = () => {
    alert(
      "Camera functionality would be implemented here. This would allow capturing multiple pages and converting to PDF."
    );
    // In a real implementation, you would:
    // 1. Access the device camera
    // 2. Allow capturing multiple images
    // 3. Convert images to PDF
    // 4. Set the resulting file to newDocument.file
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-blue-green-gradient inline-block">
          Project Documents
        </h3>
        <p className="text-gray-600">
          Upload important documents related to your construction project.
        </p>
      </div>

      <Card className="border border-blue-100 overflow-hidden">
        <div className="h-1 bg-blue-green-gradient w-full"></div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="documentTitle" className="text-blue-700">
                Document Title
              </Label>
              <Input
                id="documentTitle"
                value={newDocument.title}
                onChange={(e) =>
                  setNewDocument({ ...newDocument, title: e.target.value })
                }
                placeholder="Enter document title"
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Document File</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="file"
                    id="documentFile"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    disabled={newDocument.isUploading}
                  />
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center border-blue-300 text-blue-600 hover:bg-blue-50"
                    disabled={newDocument.isUploading}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={handleCameraCapture}
                  disabled={newDocument.isUploading}
                  className="border-green-300 text-green-600 hover:bg-green-50"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              {newDocument.file && (
                <p className="text-sm text-blue-600 mt-1 flex items-center">
                  <File className="h-4 w-4 mr-1" /> {newDocument.file.name}
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={addDocument}
            className="mt-6 bg-blue-green-gradient hover:opacity-90 transition-opacity animate-gradient"
            disabled={
              !newDocument.title || !newDocument.file || newDocument.isUploading
            }
          >
            {newDocument.isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add Document
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {formData.documents.length > 0 && (
        <div className="space-y-4 mt-8">
          <h4 className="font-medium text-lg text-blue-700">Added Documents</h4>

          <div className="grid grid-cols-1 gap-4">
            {formData.documents.map((document) => (
              <Card
                key={document.id}
                className="overflow-hidden border border-blue-100 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <File className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-800">
                          {document.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {document.fileName}
                        </p>
                        <p className="text-xs text-blue-500 truncate mt-1">
                          {document.fileUrl}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeDocument(document.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
