"use client";

import type React from "react";
import { useRef, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, File, Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import useImageUploader from "@/app/action/useImageuploader";
import useFileUploader from "@/app/action/useFileuploader";

interface LettersProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Letters({ formData, updateFormData }: LettersProps) {
  const [activeTab, setActiveTab] = useState("outgoing");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // State for file system images and camera images
  const [fileSystemImages, setFileSystemImages] = useState<File[]>([]);
  const [cameraImages, setCameraImages] = useState<File[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const { uploadFiles: uploadImageFiles } = useImageUploader();
  const { uploadFiles: uploadNonImageFiles } = useFileUploader();

  const [newOutgoingLetter, setNewOutgoingLetter] = useState({
    recipient: "",
    subject: "",
    priority: "medium" as "high" | "medium" | "low",
    status: "draft" as "draft" | "sent",
    file: null as File[] | null,
    isUploading: false,
  });

  const [newIncomingLetter, setNewIncomingLetter] = useState({
    sender: "",
    subject: "",
    priority: "medium" as "high" | "medium" | "low",
    status: "unread" as "read" | "unread",
    file: null as File[] | null,
    isUploading: false,
  });

  const isImageFile = (file: File): boolean => {
    return file.type.startsWith("image/");
  };

  const uploadOutgoingFile = async (file: File | File[]) => {
    try {
      const files = Array.isArray(file) ? file : [file];
      const imageFiles = files.filter((f) => isImageFile(f));
      const nonImageFiles = files.filter((f) => !isImageFile(f));

      let imageResponse = null;
      let nonImageResponse = null;

      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((f) => formData.append("images", f));
        imageResponse = await uploadImageFiles(formData);
      }

      if (nonImageFiles.length > 0) {
        const formData = new FormData();
        nonImageFiles.forEach((f) => formData.append("files", f));
        nonImageResponse = await uploadNonImageFiles(formData);
      }

      // Combine results
      // const fileURLs = [
      //   ...(Array.isArray(imageResponse?.fileURL)
      //     ? imageResponse.fileURL
      //     : [imageResponse?.fileURL]),
      //   ...(nonImageResponse?.fileURL || []),
      // ];

      const fileURLs = [
        imageResponse!.fileURL,
        ...nonImageResponse?.upload.value.qrPDFURL,
      ];
      const fileNames = files.map((f) => f.name).join(", ");

      return {
        fileURL: fileURLs,
        fileName: fileNames,
      };
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const uploadIncomingFile = async (file: File | File[]) => {
    try {
      const files = Array.isArray(file) ? file : [file];
      const imageFiles = files.filter((f) => isImageFile(f));
      const nonImageFiles = files.filter((f) => !isImageFile(f));

      let imageResponse = null;
      let nonImageResponse = null;

      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((f) => formData.append("files", f));
        imageResponse = await uploadImageFiles(formData);
      }

      if (nonImageFiles.length > 0) {
        const formData = new FormData();
        nonImageFiles.forEach((f) => formData.append("files", f));
        nonImageResponse = await uploadNonImageFiles(formData);
      }
      const fileURLs = [
        imageResponse!.fileURL,
        ...nonImageResponse?.upload.value.qrPDFURL,
      ];
      console.log(fileURLs);
      console.log(formData);
      // Combine results
      // const fileURLs = [
      //   ...(Array.isArray(imageResponse?.fileURL)
      //     ? imageResponse.fileURL
      //     : [imageResponse?.fileURL]),
      //   ...(nonImageResponse?.fileURL || []),
      // ];

      const fileNames = files.map((f) => f.name).join(", ");

      return {
        fileURL: fileURLs,
        fileName: fileNames,
      };
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const addOutgoingLetter = async () => {
    if (!newOutgoingLetter.recipient || !newOutgoingLetter.subject) {
      alert("Please fill in recipient and subject");
      return;
    }

    const filesToUpload = [...fileSystemImages, ...cameraImages];
    if (filesToUpload.length === 0 && !newOutgoingLetter.file) {
      alert("Please add at least one file or image");
      return;
    }

    try {
      setNewOutgoingLetter((prev) => ({ ...prev, isUploading: true }));

      const formDataobj = new FormData();
      filesToUpload.forEach((file) => formDataobj.append("images", file));
      const uploadResult =
        filesToUpload.length > 0 ? await uploadImageFiles(formDataobj) : null;
      let uploaded: any[] = [];
      if (uploadResult) {
        const updatedLetters = [
          {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            recipient: newOutgoingLetter.recipient,
            subject: newOutgoingLetter.subject,
            priority: newOutgoingLetter.priority,
            status: newOutgoingLetter.status,
            fileUrl:
              uploadResult && Array.isArray(uploadResult)
                ? uploadResult.fileURL
                : [],
            fileName: filesToUpload.map((file) => file.name).join(", "),
          },
        ];
        uploaded = [...updatedLetters];
      }
      const fileForm = new FormData();
      newOutgoingLetter.file?.forEach((file) => fileForm.append("files", file));
      const fileRes = await uploadNonImageFiles(fileForm);

      if (fileRes) {
        const updatedLetters = [
          {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            recipient: newOutgoingLetter.recipient,
            subject: newOutgoingLetter.subject,
            priority: newOutgoingLetter.priority,
            status: newOutgoingLetter.status,
            fileUrl: fileRes.upload.map((url: any) => url.value.qrPDFURL),

            fileName: "Outgoing Letters",
          },
        ];
        uploaded = [...updatedLetters];
      }

      updateFormData({
        outgoingLetters: [...formData.outgoingLetters, ...uploaded],
      });
      console.log(formData);
      setNewOutgoingLetter({
        recipient: "",
        subject: "",
        priority: "medium",
        status: "draft",
        file: null,
        isUploading: false,
      });
      setFileSystemImages([]);
      setCameraImages([]);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setNewOutgoingLetter((prev) => ({ ...prev, isUploading: false }));
    }
  };
  console.log(formData);
  const addIncomingLetter = async () => {
    if (!newIncomingLetter.sender || !newIncomingLetter.subject) {
      alert("Please fill in sender and subject");
      return;
    }

    const filesToUpload = [...fileSystemImages, ...cameraImages];
    if (filesToUpload.length === 0 && !newIncomingLetter.file) {
      alert("Please add at least one file or image");
      return;
    }

    try {
      setNewIncomingLetter((prev) => ({ ...prev, isUploading: true }));
      const uploaded = [];

      // Handle image uploads from camera or file system
      if (filesToUpload.length > 0) {
        const formDataObj = new FormData();
        filesToUpload.forEach((file) => formDataObj.append("images", file));
        const uploadResult = await uploadImageFiles(formDataObj);

        if (uploadResult) {
          const fileUrls = Array.isArray(uploadResult.fileURL)
            ? uploadResult.fileURL
            : [uploadResult.fileURL];

          uploaded.push({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            sender: newIncomingLetter.sender,
            subject: newIncomingLetter.subject,
            priority: newIncomingLetter.priority,
            status: newIncomingLetter.status,
            fileUrl: fileUrls,
            fileName: filesToUpload.map((file) => file.name).join(", "),
          });
        }
      }

      // Handle document file uploads
      if (newIncomingLetter.file && newIncomingLetter.file.length > 0) {
        const fileForm = new FormData();
        newIncomingLetter.file.forEach((file) =>
          fileForm.append("files", file)
        );
        const fileRes = await uploadNonImageFiles(fileForm);

        if (fileRes && fileRes.upload) {
          const fileUrls = fileRes.upload.map((url) => url.value.qrPDFURL);

          uploaded.push({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            sender: newIncomingLetter.sender,
            subject: newIncomingLetter.subject,
            priority: newIncomingLetter.priority,
            status: newIncomingLetter.status,
            fileUrl: fileUrls,
            fileName: "Incoming Letters",
          });
        }
      }

      // Update form data with new incoming letters
      if (uploaded.length > 0) {
        updateFormData({
          incomingLetters: [...formData.incomingLetters, ...uploaded],
        });
      }

      // Reset form
      setNewIncomingLetter({
        sender: "",
        subject: "",
        priority: "medium",
        status: "unread",
        file: null,
        isUploading: false,
      });
      setFileSystemImages([]);
      setCameraImages([]);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setNewIncomingLetter((prev) => ({ ...prev, isUploading: false }));
    }
  };

  const removeOutgoingLetter = (id: string) => {
    const updatedLetters = formData.outgoingLetters.filter(
      (letter) => letter.id !== id
    );
    updateFormData({ outgoingLetters: updatedLetters });
  };

  const removeIncomingLetter = (id: string) => {
    const updatedLetters = formData.incomingLetters.filter(
      (letter) => letter.id !== id
    );
    updateFormData({ incomingLetters: updatedLetters });
  };

  const handleOutgoingFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewOutgoingLetter({
        ...newOutgoingLetter,
        file: Array.from(e.target.files),
      });
    }
  };

  const handleIncomingFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewIncomingLetter({
        ...newIncomingLetter,
        file: Array.from(e.target.files),
      });
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
  const startCamera = async () => {
    if (navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        setIsCameraActive(true);

        videoRef.current.srcObject = stream;
      }
    }
  };
  console.log(isCameraActive);
  // const startCamera = async () => {
  //   try {
  //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //         audio: false,
  //       });

  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //         videoRef.current.play().catch((error) => {
  //           console.error("Error playing video stream:", error);
  //         });
  //         setIsCameraActive(true);
  //       }
  //     } else {
  //       throw new Error("Camera API not supported in this browser");
  //     }
  //   } catch (error) {
  //     console.error("Error accessing camera:", error);
  //     alert("Could not access camera. Please check permissions.");
  //     setIsCameraActive(false);
  //   }
  // };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  // const captureImage = () => {
  //   if (!isCameraActive || !videoRef.current || !canvasRef.current) {
  //     alert("Please start the camera first");
  //     return;
  //   }

  //   const context = canvasRef.current.getContext("2d");
  //   if (context && videoRef.current) {
  //     canvasRef.current.width = videoRef.current.videoWidth;
  //     canvasRef.current.height = videoRef.current.videoHeight;

  //     context.drawImage(
  //       videoRef.current,
  //       0,
  //       0,
  //       canvasRef.current.width,
  //       canvasRef.current.height
  //     );

  //     canvasRef.current.toBlob(
  //       (blob) => {
  //         if (blob) {
  //           const fileName = `capture-${Date.now()}.jpg`;
  //           const file = new window.File([blob], fileName, {
  //             type: "image/jpeg",
  //             lastModified: Date.now(),
  //           });

  //           setCameraImages((prev) => [...prev, file]);
  //         }
  //       },
  //       "image/jpeg",
  //       0.95
  //     );
  //   }
  // };
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const fileName = `capture-${Date.now()}.jpg`;
              const file = new window.File([blob], fileName, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });

              setCameraImages((prev) => [...prev, file]);
            }
          },
          "image/jpeg",
          0.9
        );
      }
    }
  };

  const removeImage = (index: number, isCameraImage: boolean) => {
    if (isCameraImage) {
      setCameraImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setFileSystemImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Project Letters</h3>
      <p className="text-sm text-muted-foreground">
        Manage incoming and outgoing correspondence for your construction
        project.
      </p>

      <Tabs
        defaultValue="outgoing"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="outgoing">Outgoing Letters</TabsTrigger>
          <TabsTrigger value="incoming">Incoming Letters</TabsTrigger>
        </TabsList>

        <TabsContent value="outgoing" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient</Label>
                  <Input
                    id="recipient"
                    value={newOutgoingLetter.recipient}
                    onChange={(e) =>
                      setNewOutgoingLetter({
                        ...newOutgoingLetter,
                        recipient: e.target.value,
                      })
                    }
                    placeholder="Enter recipient name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outSubject">Subject</Label>
                  <Input
                    id="outSubject"
                    value={newOutgoingLetter.subject}
                    onChange={(e) =>
                      setNewOutgoingLetter({
                        ...newOutgoingLetter,
                        subject: e.target.value,
                      })
                    }
                    placeholder="Enter letter subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outPriority">Priority</Label>
                  <Select
                    value={newOutgoingLetter.priority}
                    onValueChange={(value) =>
                      setNewOutgoingLetter({
                        ...newOutgoingLetter,
                        priority: value as "high" | "medium" | "low",
                      })
                    }
                  >
                    <SelectTrigger id="outPriority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outStatus">Status</Label>
                  <Select
                    value={newOutgoingLetter.status}
                    onValueChange={(value) =>
                      setNewOutgoingLetter({
                        ...newOutgoingLetter,
                        status: value as "draft" | "sent",
                      })
                    }
                  >
                    <SelectTrigger id="outStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Attachments</Label>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <Input
                        type="file"
                        id="outgoingFile"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleOutgoingFileChange}
                        accept="*/"
                      />
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Upload Document
                      </Button>
                      {newOutgoingLetter.file && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selected:{" "}
                          {newOutgoingLetter.file
                            ? Array.from(newOutgoingLetter.file)
                                .map((file) => file.name)
                                .join(", ")
                            : "No file selected"}
                        </p>
                      )}
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
                                src={
                                  URL.createObjectURL(img) || "/placeholder.svg"
                                }
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

                    <div className="border rounded p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Label>Camera Capture</Label>
                        {isCameraActive ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={stopCamera}
                          >
                            Stop Camera
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={startCamera}
                            disabled={isCameraActive}
                          >
                            {isCameraActive ? "Starting..." : "Start Camera"}
                          </Button>
                        )}
                      </div>

                      {isCameraActive && (
                        <>
                          <div className="relative">
                            <video
                              ref={videoRef}
                              autoPlay
                              playsInline
                              muted
                              className="w-full h-auto max-h-64 rounded border transform-x-[-1]"
                            />
                            <canvas
                              ref={canvasRef}
                              width="400"
                              height="400"
                              className="hidden"
                            />
                            {/* {!videoRef.current?.srcObject && (
                              <div className="absolute inset-0 flex items-center justify-center text-white">
                                Initializing camera...
                              </div>
                            )} */}
                          </div>
                          <Button
                            onClick={captureImage}
                            className="mt-2 w-full"
                            variant="secondary"
                            disabled={!videoRef.current?.srcObject}
                          >
                            <Camera className="mr-2 h-4 w-4" /> Capture Image
                          </Button>
                        </>
                      )}

                      {cameraImages.length > 0 && (
                        <div className="mt-4">
                          <Label>Captured Images</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {cameraImages.map((img, index) => (
                              <div key={`camera-${index}`} className="relative">
                                <Image
                                  width={80}
                                  height={80}
                                  src={
                                    URL.createObjectURL(img) ||
                                    "/placeholder.svg"
                                  }
                                  alt={`Capture ${index}`}
                                  className="w-20 h-20 object-cover rounded"
                                />
                                <button
                                  onClick={() => removeImage(index, true)}
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={addOutgoingLetter}
                className="mt-4"
                disabled={
                  !newOutgoingLetter.recipient ||
                  !newOutgoingLetter.subject ||
                  (fileSystemImages.length === 0 &&
                    cameraImages.length === 0 &&
                    !newOutgoingLetter.file) ||
                  newOutgoingLetter.isUploading
                }
              >
                {newOutgoingLetter.isUploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Add Outgoing Letter
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {formData.outgoingLetters.length > 0 && (
            <div className="space-y-4 mt-6">
              <h4 className="font-medium">Outgoing Letters</h4>
              {formData.outgoingLetters.map((letter, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <File className="h-8 w-8 mr-3 text-primary" />
                        <div>
                          <p className="font-medium">{letter.subject}</p>
                          <p className="text-sm">To: {letter.recipient}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                letter.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : letter.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {letter.priority.charAt(0).toUpperCase() +
                                letter.priority.slice(1)}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                letter.status === "draft"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {letter.status.charAt(0).toUpperCase() +
                                letter.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeOutgoingLetter(letter.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="incoming" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sender">Sender</Label>
                  <Input
                    id="sender"
                    value={newIncomingLetter.sender}
                    onChange={(e) =>
                      setNewIncomingLetter({
                        ...newIncomingLetter,
                        sender: e.target.value,
                      })
                    }
                    placeholder="Enter sender name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inSubject">Subject</Label>
                  <Input
                    id="inSubject"
                    value={newIncomingLetter.subject}
                    onChange={(e) =>
                      setNewIncomingLetter({
                        ...newIncomingLetter,
                        subject: e.target.value,
                      })
                    }
                    placeholder="Enter letter subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inPriority">Priority</Label>
                  <Select
                    value={newIncomingLetter.priority}
                    onValueChange={(value) =>
                      setNewIncomingLetter({
                        ...newIncomingLetter,
                        priority: value as "high" | "medium" | "low",
                      })
                    }
                  >
                    <SelectTrigger id="inPriority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inStatus">Status</Label>
                  <Select
                    value={newIncomingLetter.status}
                    onValueChange={(value) =>
                      setNewIncomingLetter({
                        ...newIncomingLetter,
                        status: value as "read" | "unread",
                      })
                    }
                  >
                    <SelectTrigger id="inStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Attachments</Label>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <Input
                        type="file"
                        id="incomingFile"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleIncomingFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Upload Document
                      </Button>
                      {newIncomingLetter.file && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selected:{" "}
                          {newIncomingLetter.file
                            ?.map((file) => file.name)
                            .join(", ")}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <Input
                        type="file"
                        id="incomingImages"
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
                                src={
                                  URL.createObjectURL(img) || "/placeholder.svg"
                                }
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

                    <div className="border rounded p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Label>Camera Capture</Label>
                        {isCameraActive ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={stopCamera}
                          >
                            Stop Camera
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={startCamera}
                          >
                            Start Camera
                          </Button>
                        )}
                      </div>

                      {isCameraActive && (
                        <>
                          <video
                            ref={videoRef}
                            autoPlay
                            muted
                            className="w-full h-auto max-h-64 rounded border"
                          />
                          <Button
                            onClick={captureImage}
                            className="mt-2 w-full"
                            variant="secondary"
                          >
                            <Camera className="mr-2 h-4 w-4" /> Capture Image
                          </Button>
                        </>
                      )}

                      {cameraImages.length > 0 && (
                        <div className="mt-4">
                          <Label>Captured Images</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {cameraImages.map((img, index) => (
                              <div key={`camera-${index}`} className="relative">
                                <Image
                                  width={80}
                                  height={80}
                                  src={
                                    URL.createObjectURL(img) ||
                                    "/placeholder.svg"
                                  }
                                  alt={`Capture ${index}`}
                                  className="w-20 h-20 object-cover rounded"
                                />
                                <button
                                  onClick={() => removeImage(index, true)}
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={addIncomingLetter}
                className="mt-4"
                disabled={
                  !newIncomingLetter.sender ||
                  !newIncomingLetter.subject ||
                  (fileSystemImages.length === 0 &&
                    cameraImages.length === 0 &&
                    !newIncomingLetter.file) ||
                  newIncomingLetter.isUploading
                }
              >
                {newIncomingLetter.isUploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Add Incoming Letter
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {formData.incomingLetters.length > 0 && (
            <div className="space-y-4 mt-6">
              <h4 className="font-medium">Incoming Letters</h4>
              {formData.incomingLetters.map((letter) => (
                <Card key={letter.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <File className="h-8 w-8 mr-3 text-primary" />
                        <div>
                          <p className="font-medium">{letter.subject}</p>
                          <p className="text-sm">From: {letter.sender}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                letter.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : letter.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {letter.priority.charAt(0).toUpperCase() +
                                letter.priority.slice(1)}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                letter.status === "unread"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {letter.status.charAt(0).toUpperCase() +
                                letter.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeIncomingLetter(letter.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
