"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Trash2, Upload, ExternalLink } from "lucide-react";
import useImageUploader from "@/app/action/useImageuploader";
import useFileUploader from "@/app/action/useFileuploader";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ExtendedFormData extends FormData {
  documents: {
    id: string;
    title: string;
    fileUrl: string;
    fileName: string;
  }[];
}

interface ProjectDocumentsProps {
  formData: ExtendedFormData;
  updateFormData: (data: Partial<ExtendedFormData>) => void;
}

interface DocumentInProgress {
  documentName: string;
  title: string;
  file: File | null;
  isUploading: boolean;
}

export default function ProjectDocuments({
  formData,
  updateFormData,
}: ProjectDocumentsProps) {
  const [newDocuments, setNewDocuments] = useState<DocumentInProgress[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [nonImageFiles, setNonImageFiles] = useState<File[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [canAddMoreFiles, setCanAddMoreFiles] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { uploadFiles: uploadImageFiles } = useImageUploader();
  const { uploadFiles: uploadNonImageFiles } = useFileUploader();

  // State to track which existing documents to keep
  const [documentsToKeep, setDocumentsToKeep] = useState<string[]>(
    formData.documents.map((doc) => doc.id)
  );

  useEffect(() => {
    // Update documentsToKeep when formData.documents changes (e.g., on initial load)
    setDocumentsToKeep(formData.documents.map((doc) => doc.id));
  }, [formData.documents]);

  useEffect(() => {
    if (!cameraActive) return;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.log("Camera access denied:", err);
        alert("Camera access denied. Please check your permissions.");
      });
  }, [cameraActive]);

  const classifyFiles = (files: File[]) => {
    const imageTypes = ["image/jpeg", "image/png", "image/jpg"];
    const images: File[] = [];
    const others: File[] = [];

    files.forEach((file) =>
      imageTypes.includes(file.type) ? images.push(file) : others.push(file)
    );

    setImageFiles((prev) => [...prev, ...images]);
    setNonImageFiles((prev) => [...prev, ...others]);

    const allDocs = [...images, ...others].map((file) => ({
      documentName: "New Document",
      title: file.name.split(".")[0],
      file,
      isUploading: false,
    }));
    setNewDocuments((prev) => [...prev, ...allDocs]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) classifyFiles(Array.from(e.target.files));
  };

  const handleStopCapture = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop()); // Stop previous stream
    }
    setCameraActive(false); // Move this outside the if statement to ensure it always runs
  };

  const handleCameraCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (!context) return;
      context.drawImage(videoRef.current, 0, 0, 400, 400);
      canvasRef.current.toBlob((blob) => {
        if (!blob) return;
        const imgFile = new window.File([blob], `photo-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });

        setImageFiles((prev) => [...prev, imgFile]);
        setNewDocuments((prev) => [
          ...prev,
          {
            documentName: "Captured Image",
            title: `Captured-${Date.now()}`,
            file: imgFile,
            isUploading: false,
          },
        ]);
      }, "image/jpeg");
    }
  };

  const handleTitleChange = (index: number, value: string) => {
    setNewDocuments((prev) =>
      prev.map((doc, i) => (i === index ? { ...doc, title: value } : doc))
    );
  };

  const handleDocumentNameChange = (index: number, value: string) => {
    setNewDocuments((prev) =>
      prev.map((doc, i) =>
        i === index ? { ...doc, documentName: value } : doc
      )
    );
  };

  const removeNewDocument = (index: number) => {
    const removed = newDocuments[index];
    if (!removed.file) return;
    setNewDocuments((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((f) => f !== removed.file));
    setNonImageFiles((prev) => prev.filter((f) => f !== removed.file));
  };

  const toggleKeepDocument = (id: string) => {
    setDocumentsToKeep((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const removeDocument = (id: string) => {
    // Remove from documentsToKeep
    setDocumentsToKeep((prev) => prev.filter((docId) => docId !== id));

    // Remove from formData
    const updated = formData.documents.filter((doc) => doc.id !== id);
    updateFormData({ documents: updated });
  };

  const addDocument = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop()); // Stop previous stream
    }
    try {
      setCanAddMoreFiles(false); // Prevent adding more files until the current ones are uploaded
      setNewDocuments((prev) =>
        prev.map((doc) => ({ ...doc, isUploading: true }))
      );

      const imgForm = new FormData();
      imageFiles.forEach((img) => imgForm.append("images", img));
      const imageRes = imageFiles.length
        ? await uploadImageFiles(imgForm)
        : null;

      const fileForm = new FormData();
      nonImageFiles.forEach((file) => fileForm.append("files", file));
      const fileRes = nonImageFiles.length
        ? await uploadNonImageFiles(fileForm)
        : null;
      let uploaded: any[] = [];

      // Handle image uploads
      if (imageRes) {
        const imagename = newDocuments.filter((doc) =>
          imageFiles.includes(doc.file!)
        );
        const uploadedImages = [
          {
            id: Date.now().toString(),
            title: imagename[0]?.title || "Uploaded Image", // Use title or default
            fileUrl: imageRes?.fileURL || "",
            fileName: imageFiles.map((file) => file.name).join(", "),
          },
        ];
        uploaded = [...uploaded, ...uploadedImages];
      }
      // Handle file (non-image) uploads
      if (fileRes?.success && Array.isArray(fileRes.upload)) {
        const uploadedFiles = newDocuments
          .filter((doc) => nonImageFiles.includes(doc.file!))
          .map((doc, i) => ({
            id: Date.now().toString() + i,
            title: doc.title,
            fileUrl: fileRes.upload[i]?.value?.qrPDFURL || "",
            fileName: doc.file?.name || "",
          }));
        uploaded = [...uploaded, ...uploadedFiles];
      }

      // Get existing documents that should be kept
      const keptDocuments = formData.documents.filter((doc) =>
        documentsToKeep.includes(doc.id)
      );

      // Update with both kept documents and new uploads
      updateFormData({
        documents: [...keptDocuments, ...uploaded],
      });

      // Clear temporary state
      setNewDocuments([]);
      setImageFiles([]);
      setNonImageFiles([]);
      setCanAddMoreFiles(true); // Allow adding more files now
    } catch (err) {
      alert("Upload failed.");
      console.error(err);
      setCanAddMoreFiles(true); // Re-enable adding files if upload fails
    }
  };

  const handleAddAnother = () => {
    if (!newDocuments.some((d) => d.isUploading)) {
      document.getElementById("fileInput")?.click();
    }
  };

  // Function to determine file type icon
  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext || "")) {
      return "🖼️";
    } else if (["pdf"].includes(ext || "")) {
      return "📄";
    } else if (["doc", "docx"].includes(ext || "")) {
      return "📝";
    } else if (["xls", "xlsx"].includes(ext || "")) {
      return "📊";
    } else if (["ppt", "pptx"].includes(ext || "")) {
      return "📑";
    } else {
      return "📁";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-blue-green-gradient">
          Project Documents
        </h3>
        <p className="text-gray-600">Upload project-related documents.</p>
      </div>

      {/* Existing Documents Section */}
      {formData.documents.length > 0 && (
        <Card className="border border-blue-100 overflow-hidden">
          <div className="h-1 bg-blue-green-gradient w-full" />
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-blue-700 flex items-center gap-2">
                Existing Documents
                <Badge variant="outline" className="ml-2">
                  {formData.documents.length}
                </Badge>
              </Label>

              <div className="space-y-3 mt-4">
                {formData.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-3 p-3 border rounded-lg transition-colors ${
                      documentsToKeep.includes(doc.id)
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="w-full md:flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {getFileIcon(doc.fileName)}
                        </span>
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-gray-500">
                            {doc.fileName}
                          </p>
                        </div>
                      </div>

                      {doc.fileUrl && (
                        <div className="mt-2">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" /> View document
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button
                        variant={
                          documentsToKeep.includes(doc.id)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => toggleKeepDocument(doc.id)}
                        className={
                          documentsToKeep.includes(doc.id) ? "bg-green-600" : ""
                        }
                      >
                        {documentsToKeep.includes(doc.id) ? "Keep" : "Removed"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeDocument(doc.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload New Documents Section */}
      <Card className="border border-blue-100 overflow-hidden">
        <div className="h-1 bg-blue-green-gradient w-full" />
        <CardContent className="p-4 md:p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-blue-700">Upload New Documents</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Input
                  id="fileInput"
                  type="file"
                  multiple
                  accept="*/"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  disabled={newDocuments.some((d) => d.isUploading)}
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleAddAnother}
                  disabled={newDocuments.some((d) => d.isUploading)}
                >
                  {newDocuments.some((d) => d.isUploading) ? (
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
                      <Upload className="mr-2 h-4 w-4" /> Select Files
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {!cameraActive && (
            <Button
              onClick={() => setCameraActive(true)}
              className="mt-4"
              disabled={newDocuments.some((d) => d.isUploading)}
            >
              <Camera className="mr-2 h-4 w-4" /> Start Camera
            </Button>
          )}

          {cameraActive && (
            <div className="space-y-3">
              <div className="w-full max-w-full overflow-hidden">
                <video
                  ref={videoRef}
                  width="100%"
                  height="auto"
                  autoPlay
                  className="max-h-[300px] object-cover rounded-lg"
                />
              </div>
              <canvas
                ref={canvasRef}
                width="400"
                height="400"
                className="hidden"
              />
              <div className="flex flex-col sm:flex-row gap-2 justify-between">
                <Button
                  className="bg-green-600 text-white w-full sm:w-auto"
                  onClick={handleCameraCapture}
                  disabled={newDocuments.some((d) => d.isUploading)}
                >
                  📸 Capture Photo
                </Button>
                <Button
                  className="bg-green-600 text-white w-full sm:w-auto"
                  onClick={handleStopCapture}
                  disabled={newDocuments.some((d) => d.isUploading)}
                >
                  📸 Stop
                </Button>
              </div>
            </div>
          )}

          {newDocuments.length > 0 && (
            <div className="space-y-3">
              {newDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-start md:items-center gap-3 p-3 border overflow-y-auto rounded-lg"
                >
                  <div className="w-full md:flex-1 space-y-2">
                    <Input
                      value={doc.documentName}
                      onChange={(e) =>
                        handleDocumentNameChange(idx, e.target.value)
                      }
                      placeholder="Document Name"
                    />
                    <Input
                      value={doc.title}
                      onChange={(e) => handleTitleChange(idx, e.target.value)}
                      placeholder="Document title"
                    />
                    {doc.file && doc.file.type.startsWith("image/") ? (
                      <div className="max-w-full overflow-hidden">
                        <Image
                          src={
                            URL.createObjectURL(doc.file) || "/placeholder.svg"
                          }
                          alt="Captured"
                          width={300}
                          height={300}
                          className="max-w-full h-auto max-h-48 border rounded shadow"
                        />
                      </div>
                    ) : (
                      <div>
                        {doc.file?.name}
                        <div className="text-xs text-gray-500">
                          {doc.file?.size} bytes
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 justify-between items-center mt-2 md:mt-0">
                    <Button
                      variant="link"
                      onClick={() => removeNewDocument(idx)}
                      disabled={doc.isUploading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="outline"
          disabled={
            !canAddMoreFiles ||
            (newDocuments.length === 0 &&
              documentsToKeep.length === formData.documents.length) ||
            newDocuments.some((d) => d.isUploading)
          }
          onClick={addDocument}
        >
          {newDocuments.some((d) => d.isUploading) ? (
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
              <Upload className="mr-2 h-4 w-4" />{" "}
              {newDocuments.length > 0 ? "Upload Documents" : "Save Changes"}
            </>
          )}
        </Button>
      </div>

      {/* Summary of changes */}
      {formData.documents.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-700 mb-2">Document Summary</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50">
                {documentsToKeep.length}
              </Badge>
              <span>Documents to keep</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="outline" className="bg-red-50">
                {formData.documents.length - documentsToKeep.length}
              </Badge>
              <span>Documents to remove</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50">
                {newDocuments.length}
              </Badge>
              <span>New documents to upload</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
