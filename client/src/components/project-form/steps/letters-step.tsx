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
  Mail,
  MailPlus,
  Upload,
  Trash2,
  FileIcon,
  PlusCircle,
  Camera,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LettersStep() {
  const { formData, addDocument, removeDocument, getDocumentsByType } =
    useProjectForm();
  const [activeTab, setActiveTab] = useState<"incoming" | "outgoing">(
    "incoming"
  );
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Incoming letter fields
  const [inSender, setInSender] = useState("");
  const [inSubject, setInSubject] = useState("");
  const [inPriority, setInPriority] = useState("medium");
  const [inStatus, setInStatus] = useState("unread");

  // Outgoing letter fields
  const [outRecipient, setOutRecipient] = useState("");
  const [outSubject, setOutSubject] = useState("");
  const [outPriority, setOutPriority] = useState("medium");
  const [outStatus, setOutStatus] = useState("draft");

  const incomingLetters = getDocumentsByType("incoming");
  const outgoingLetters = getDocumentsByType("outgoing");

  // Add these state variables and refs inside the LettersStep component
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Add these camera-related functions inside the LettersStep component

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
                `letter-photo-${Date.now()}.jpg`,
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

  // Update the resetForm function to include stopping the camera
  const resetForm = () => {
    setFiles([]);
    setProgress(0);
    if (cameraActive) stopCamera();

    if (activeTab === "incoming") {
      setInSender("");
      setInSubject("");
      setInPriority("medium");
      setInStatus("unread");

      // Reset file input
      const fileInput = document.getElementById("in-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } else {
      setOutRecipient("");
      setOutSubject("");
      setOutPriority("medium");
      setOutStatus("draft");

      // Reset file input
      const fileInput = document.getElementById("out-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  // Upload letters
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file to upload");
      return;
    }

    // Validate required fields
    if (activeTab === "incoming") {
      if (!inSender.trim()) {
        alert("Please enter the sender name");
        return;
      }
      if (!inSubject.trim()) {
        alert("Please enter the subject");
        return;
      }
    } else {
      if (!outRecipient.trim()) {
        alert("Please enter the recipient name");
        return;
      }
      if (!outSubject.trim()) {
        alert("Please enter the subject");
        return;
      }
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
        const newDocument: ProjectDocument = {
          id: `letter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: activeTab,
          name:
            activeTab === "incoming"
              ? `${inSubject} (from ${inSender})`
              : `${outSubject} (to ${outRecipient})`,
          date: new Date().toISOString(),
          url: URL.createObjectURL(file),
          metadata: {
            sender: activeTab === "incoming" ? inSender : "",
            recipient: activeTab === "outgoing" ? outRecipient : "",
            subject: activeTab === "incoming" ? inSubject : outSubject,
            priority: activeTab === "incoming" ? inPriority : outPriority,
            status: activeTab === "incoming" ? inStatus : outStatus,
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
        setIsUploading(false);
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload letters. Please try again.");
      clearInterval(progressInterval);
      setIsUploading(false);
      setProgress(0);
    }
  };

  // Add another letter
  const handleAddAnother = () => {
    resetForm();
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Project Letters</h3>
        <p className="text-sm text-gray-500 mb-6">
          Manage incoming and outgoing correspondence related to the project.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "incoming" | "outgoing")
        }
      >
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Incoming Letters</span>
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center gap-2">
            <MailPlus className="h-4 w-4" />
            <span>Outgoing Letters</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="in-sender">Sender</Label>
                  <Input
                    id="in-sender"
                    value={inSender}
                    onChange={(e) => setInSender(e.target.value)}
                    placeholder="Enter sender name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="in-subject">Subject</Label>
                  <Input
                    id="in-subject"
                    value={inSubject}
                    onChange={(e) => setInSubject(e.target.value)}
                    placeholder="Enter letter subject"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="in-priority">Priority</Label>
                    <Select value={inPriority} onValueChange={setInPriority}>
                      <SelectTrigger id="in-priority">
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
                    <Label htmlFor="in-status">Status</Label>
                    <Select value={inStatus} onValueChange={setInStatus}>
                      <SelectTrigger id="in-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Label htmlFor="in-file">Letter Source</Label>
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

                    <Button
                      type="button"
                      onClick={captureImage}
                      className="w-full"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Capture Letter Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Mail className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        Drag and drop your files here, or click to browse
                      </p>
                      <input
                        id="in-file"
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("in-file")?.click()
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
                  {files.length > 0 && !isUploading && (
                    <Button
                      type="button"
                      onClick={handleUpload}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Incoming Letter
                    </Button>
                  )}

                  {incomingLetters.length > 0 && !isUploading && (
                    <Button
                      type="button"
                      onClick={handleAddAnother}
                      variant="outline"
                      className="flex-1"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Another Letter
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium">
              Incoming Letters ({incomingLetters.length})
            </h3>

            {incomingLetters.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
                No incoming letters uploaded yet
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incomingLetters.map((letter) => (
                  <Card key={letter.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
                            <Mail className="h-6 w-6 text-blue-500" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h4 className="font-medium truncate">
                              {letter.metadata.subject}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 ml-2"
                              onClick={() => removeDocument(letter.id)}
                            >
                              <Trash2 className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>

                          <p className="text-xs text-gray-500">
                            From: {letter.metadata.sender}
                          </p>

                          <p className="text-xs text-gray-500">
                            {new Date(letter.date).toLocaleDateString()}
                          </p>

                          <div className="flex flex-wrap gap-1 mt-2">
                            <Badge
                              className={`text-xs ${getPriorityColor(
                                letter.metadata.priority
                              )}`}
                            >
                              {letter.metadata.priority} priority
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                letter.metadata.status === "unread"
                                  ? "bg-blue-100 text-blue-800"
                                  : ""
                              }`}
                            >
                              {letter.metadata.status}
                            </Badge>
                          </div>

                          <div className="mt-2">
                            <a
                              href={letter.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline"
                            >
                              View Letter
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
        </TabsContent>

        <TabsContent value="outgoing">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="out-recipient">Recipient</Label>
                  <Input
                    id="out-recipient"
                    value={outRecipient}
                    onChange={(e) => setOutRecipient(e.target.value)}
                    placeholder="Enter recipient name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="out-subject">Subject</Label>
                  <Input
                    id="out-subject"
                    value={outSubject}
                    onChange={(e) => setOutSubject(e.target.value)}
                    placeholder="Enter letter subject"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="out-priority">Priority</Label>
                    <Select value={outPriority} onValueChange={setOutPriority}>
                      <SelectTrigger id="out-priority">
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
                    <Label htmlFor="out-status">Status</Label>
                    <Select value={outStatus} onValueChange={setOutStatus}>
                      <SelectTrigger id="out-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Label htmlFor="out-file">Letter Source</Label>
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

                    <Button
                      type="button"
                      onClick={captureImage}
                      className="w-full"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Capture Letter Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <MailPlus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        Drag and drop your files here, or click to browse
                      </p>
                      <input
                        id="out-file"
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("out-file")?.click()
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
                  {files.length > 0 && !isUploading && (
                    <Button
                      type="button"
                      onClick={handleUpload}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Outgoing Letter
                    </Button>
                  )}

                  {outgoingLetters.length > 0 && !isUploading && (
                    <Button
                      type="button"
                      onClick={handleAddAnother}
                      variant="outline"
                      className="flex-1"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Another Letter
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium">
              Outgoing Letters ({outgoingLetters.length})
            </h3>

            {outgoingLetters.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
                No outgoing letters uploaded yet
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outgoingLetters.map((letter) => (
                  <Card key={letter.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
                            <MailPlus className="h-6 w-6 text-green-500" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h4 className="font-medium truncate">
                              {letter.metadata.subject}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 ml-2"
                              onClick={() => removeDocument(letter.id)}
                            >
                              <Trash2 className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>

                          <p className="text-xs text-gray-500">
                            To: {letter.metadata.recipient}
                          </p>

                          <p className="text-xs text-gray-500">
                            {new Date(letter.date).toLocaleDateString()}
                          </p>

                          <div className="flex flex-wrap gap-1 mt-2">
                            <Badge
                              className={`text-xs ${getPriorityColor(
                                letter.metadata.priority
                              )}`}
                            >
                              {letter.metadata.priority} priority
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                letter.metadata.status === "draft"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {letter.metadata.status}
                            </Badge>
                          </div>

                          <div className="mt-2">
                            <a
                              href={letter.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline"
                            >
                              View Letter
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
