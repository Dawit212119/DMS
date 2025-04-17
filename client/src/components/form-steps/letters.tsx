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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, File, Plus, Trash2, Upload } from "lucide-react";

interface LettersProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Letters({ formData, updateFormData }: LettersProps) {
  const [activeTab, setActiveTab] = useState("outgoing");

  // Update the state to include isUploading
  const [newOutgoingLetter, setNewOutgoingLetter] = useState({
    recipient: "",
    subject: "",
    priority: "medium" as "high" | "medium" | "low",
    status: "draft" as "draft" | "sent",
    file: null as File | null,
    isUploading: false,
  });

  const [newIncomingLetter, setNewIncomingLetter] = useState({
    sender: "",
    subject: "",
    priority: "medium" as "high" | "medium" | "low",
    status: "unread" as "read" | "unread",
    file: null as File | null,
    isUploading: false,
  });

  // This function would upload the file to your storage service
  const uploadOutgoingFile = async (
    file: File
  ): Promise<{ url: string; fileName: string }> => {
    // In a real implementation, you would:
    // 1. Create a FormData object
    // 2. Append the file to it
    // 3. Send it to your backend API
    // 4. Get the URL back

    // For now, we'll simulate this with a timeout
    setNewOutgoingLetter((prev) => ({ ...prev, isUploading: true }));

    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be the URL returned from your storage service
        const mockUrl = `https://storage.example.com/${file.name}`;
        resolve({ url: mockUrl, fileName: file.name });
        setNewOutgoingLetter((prev) => ({ ...prev, isUploading: false }));
      }, 1000);
    });
  };

  const uploadIncomingFile = async (
    file: File
  ): Promise<{ url: string; fileName: string }> => {
    // Similar implementation as above
    setNewIncomingLetter((prev) => ({ ...prev, isUploading: true }));

    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUrl = `https://storage.example.com/${file.name}`;
        resolve({ url: mockUrl, fileName: file.name });
        setNewIncomingLetter((prev) => ({ ...prev, isUploading: false }));
      }, 1000);
    });
  };

  // Update the addOutgoingLetter function
  const addOutgoingLetter = async () => {
    if (
      newOutgoingLetter.recipient &&
      newOutgoingLetter.subject &&
      newOutgoingLetter.file
    ) {
      try {
        // Upload the file and get the URL
        const { url, fileName } = await uploadOutgoingFile(
          newOutgoingLetter.file
        );

        // Add the letter with the URL to the form data
        const updatedLetters = [
          ...formData.outgoingLetters,
          {
            id: Date.now().toString(),
            recipient: newOutgoingLetter.recipient,
            subject: newOutgoingLetter.subject,
            priority: newOutgoingLetter.priority,
            status: newOutgoingLetter.status,
            fileUrl: url,
            fileName: fileName,
          },
        ];

        updateFormData({ outgoingLetters: updatedLetters });

        // Reset the form
        setNewOutgoingLetter({
          recipient: "",
          subject: "",
          priority: "medium",
          status: "draft",
          file: null,
          isUploading: false,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      }
    }
  };

  // Update the addIncomingLetter function similarly
  const addIncomingLetter = async () => {
    if (
      newIncomingLetter.sender &&
      newIncomingLetter.subject &&
      newIncomingLetter.file
    ) {
      try {
        // Upload the file and get the URL
        const { url, fileName } = await uploadIncomingFile(
          newIncomingLetter.file
        );

        // Add the letter with the URL to the form data
        const updatedLetters = [
          ...formData.incomingLetters,
          {
            id: Date.now().toString(),
            sender: newIncomingLetter.sender,
            subject: newIncomingLetter.subject,
            priority: newIncomingLetter.priority,
            status: newIncomingLetter.status,
            fileUrl: url,
            fileName: fileName,
          },
        ];

        updateFormData({ incomingLetters: updatedLetters });

        // Reset the form
        setNewIncomingLetter({
          sender: "",
          subject: "",
          priority: "medium",
          status: "unread",
          file: null,
          isUploading: false,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      }
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
      setNewOutgoingLetter({ ...newOutgoingLetter, file: e.target.files[0] });
    }
  };

  const handleIncomingFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewIncomingLetter({ ...newIncomingLetter, file: e.target.files[0] });
    }
  };

  // This would be implemented with a camera API in a real application
  const handleCameraCapture = (type: "outgoing" | "incoming") => {
    alert(
      `Camera functionality would be implemented here to capture ${type} letter.`
    );
    // In a real implementation, you would:
    // 1. Access the device camera
    // 2. Allow capturing an image
    // 3. Set the resulting file to the appropriate state
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
                  <Label>Letter File</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="file"
                        id="outgoingFile"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleOutgoingFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Upload File
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handleCameraCapture("outgoing")}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  {newOutgoingLetter.file && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Selected: {newOutgoingLetter.file.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Update the button states to show uploading state */}
              {/* For outgoing letters button: */}
              <Button
                onClick={addOutgoingLetter}
                className="mt-4"
                disabled={
                  !newOutgoingLetter.recipient ||
                  !newOutgoingLetter.subject ||
                  !newOutgoingLetter.file ||
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

              {formData.outgoingLetters.map((letter) => (
                <Card key={letter.id} className="overflow-hidden">
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
                  <Label>Letter File</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="file"
                        id="incomingFile"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleIncomingFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Upload File
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handleCameraCapture("incoming")}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  {newIncomingLetter.file && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Selected: {newIncomingLetter.file.name}
                    </p>
                  )}
                </div>
              </div>

              {/* For incoming letters button: */}
              <Button
                onClick={addIncomingLetter}
                className="mt-4"
                disabled={
                  !newIncomingLetter.sender ||
                  !newIncomingLetter.subject ||
                  !newIncomingLetter.file ||
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
