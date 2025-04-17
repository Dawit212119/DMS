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
import { Camera, ImageIcon, Plus, Trash2, Upload } from "lucide-react";

interface SiteImagesProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function SiteImages({
  formData,
  updateFormData,
}: SiteImagesProps) {
  const [newImage, setNewImage] = useState({
    title: "",
    location: "",
    category: "foundation" as
      | "foundation"
      | "structural"
      | "electrical"
      | "plumbing"
      | "exterior"
      | "aerial",
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
    setNewImage((prev) => ({ ...prev, isUploading: true }));

    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be the URL returned from your storage service
        const mockUrl = `https://storage.example.com/${file.name}`;
        resolve({ url: mockUrl, fileName: file.name });
        setNewImage((prev) => ({ ...prev, isUploading: false }));
      }, 1000);
    });
  };

  const addImage = async () => {
    if (newImage.title && newImage.location && newImage.file) {
      try {
        // Upload the file and get the URL
        const { url, fileName } = await uploadFile(newImage.file);

        // Add the image with the URL to the form data
        const updatedImages = [
          ...formData.siteImages,
          {
            id: Date.now().toString(),
            title: newImage.title,
            location: newImage.location,
            category: newImage.category,
            imageUrl: url,
            fileName: fileName,
          },
        ];

        updateFormData({ siteImages: updatedImages });

        // Reset the form
        setNewImage({
          title: "",
          location: "",
          category: "foundation",
          file: null,
          isUploading: false,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      }
    }
  };

  const removeImage = (id: string) => {
    const updatedImages = formData.siteImages.filter(
      (image) => image.id !== id
    );
    updateFormData({ siteImages: updatedImages });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage({ ...newImage, file: e.target.files[0] });
    }
  };

  // This would be implemented with a camera API in a real application
  const handleCameraCapture = () => {
    alert(
      "Camera functionality would be implemented here to capture site images."
    );
    // In a real implementation, you would:
    // 1. Access the device camera
    // 2. Allow capturing an image
    // 3. Set the resulting file to newImage.file
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-blue-green-gradient inline-block">
          Site Images
        </h3>
        <p className="text-gray-600">
          Upload images from your construction site.
        </p>
      </div>

      <Card className="border border-blue-100 overflow-hidden">
        <div className="h-1 bg-blue-green-gradient w-full"></div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imageTitle" className="text-blue-700">
                Image Title
              </Label>
              <Input
                id="imageTitle"
                value={newImage.title}
                onChange={(e) =>
                  setNewImage({ ...newImage, title: e.target.value })
                }
                placeholder="Enter image title"
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageLocation" className="text-blue-700">
                Location
              </Label>
              <Input
                id="imageLocation"
                value={newImage.location}
                onChange={(e) =>
                  setNewImage({ ...newImage, location: e.target.value })
                }
                placeholder="Enter location within site"
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageCategory" className="text-blue-700">
                Category
              </Label>
              <Select
                value={newImage.category}
                onValueChange={(value) =>
                  setNewImage({
                    ...newImage,
                    category: value as
                      | "foundation"
                      | "structural"
                      | "electrical"
                      | "plumbing"
                      | "exterior"
                      | "aerial",
                  })
                }
              >
                <SelectTrigger
                  id="imageCategory"
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foundation">Foundation</SelectItem>
                  <SelectItem value="structural">Structural</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="exterior">Exterior</SelectItem>
                  <SelectItem value="aerial">Aerial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Image File</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="file"
                    id="imageFile"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={newImage.isUploading}
                  />
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center border-blue-300 text-blue-600 hover:bg-blue-50"
                    disabled={newImage.isUploading}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Image
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={handleCameraCapture}
                  disabled={newImage.isUploading}
                  className="border-green-300 text-green-600 hover:bg-green-50"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              {newImage.file && (
                <p className="text-sm text-blue-600 mt-1 flex items-center">
                  <ImageIcon className="h-4 w-4 mr-1" /> {newImage.file.name}
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={addImage}
            className="mt-6 bg-blue-green-gradient hover:opacity-90 transition-opacity animate-gradient"
            disabled={
              !newImage.title ||
              !newImage.location ||
              !newImage.file ||
              newImage.isUploading
            }
          >
            {newImage.isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add Image
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {formData.siteImages.length > 0 && (
        <div className="space-y-4 mt-8">
          <h4 className="font-medium text-lg text-blue-700">Added Images</h4>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {formData.siteImages.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden border border-blue-100 hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <ImageIcon className="h-12 w-12 absolute inset-0 m-auto text-blue-300" />
                    {/* In a real app, you would display the image here */}
                    {/* <img src={image.imageUrl || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" /> */}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div>
                    <h5 className="font-medium text-blue-800 truncate">
                      {image.title}
                    </h5>
                    <p className="text-sm text-gray-600 truncate">
                      {image.location}
                    </p>
                    <p className="text-xs text-blue-500 truncate mt-1">
                      {image.imageUrl}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs px-2 py-1 bg-blue-green-gradient text-white rounded-full">
                        {image.category.charAt(0).toUpperCase() +
                          image.category.slice(1)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeImage(image.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
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
    </div>
  );
}
