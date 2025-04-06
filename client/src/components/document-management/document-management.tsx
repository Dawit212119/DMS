"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  ImageIcon,
  Mail,
  MailPlus,
  FileBarChart,
  Search,
  Filter,
  SortAsc,
  Trash2,
} from "lucide-react";
import FileUploader from "./file-uploader";

// Document types
export type DocumentType =
  | "document"
  | "image"
  | "incoming"
  | "outgoing"
  | "report";

export interface Document {
  id: string;
  type: DocumentType;
  name: string;
  date: string;
  url: string;
  thumbnailUrl?: string;
  metadata: Record<string, any>;
}

interface DocumentManagerProps {
  projectId?: string;
  initialDocuments?: Document[];
}

export default function DocumentManager({
  projectId = "new-project",
  initialDocuments = [],
}: DocumentManagerProps) {
  const [activeTab, setActiveTab] = useState<DocumentType>("document");
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Handle file upload for different document types
  const handleUpload = async (
    files: File[],
    metadata: Record<string, any> = {}
  ) => {
    setIsUploading(true);

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create new document objects
      const newDocuments = files.map((file) => ({
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: activeTab,
        name: file.name,
        date: new Date().toISOString(),
        url: URL.createObjectURL(file),
        thumbnailUrl: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
        metadata: {
          ...metadata,
          size: file.size,
          type: file.type,
        },
      }));

      // Add new documents to state
      setDocuments([...documents, ...newDocuments]);

      // In a real app, you would upload to your backend here
      console.log("Uploaded documents:", newDocuments);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload documents. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Delete a document
  const deleteDocument = (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      setDocuments(documents.filter((doc) => doc.id !== id));
    }
  };

  // Filter documents by type and search query
  const filteredDocuments = documents.filter((doc) => {
    const matchesType = doc.type === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(doc.metadata).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesType && matchesSearch;
  });

  // Get metadata fields based on document type
  const getMetadataFields = () => {
    switch (activeTab) {
      case "document":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="doc-title">Document Title</Label>
              <Input id="doc-title" placeholder="Enter document title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-category">Category</Label>
              <Select defaultValue="general">
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
          </>
        );

      case "image":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="img-title">Image Title</Label>
              <Input id="img-title" placeholder="Enter image title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="img-location">Location</Label>
              <Input id="img-location" placeholder="Enter location" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="img-category">Category</Label>
              <Select defaultValue="site">
                <SelectTrigger id="img-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="site">Site Overview</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="issue">Issue Documentation</SelectItem>
                  <SelectItem value="material">Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "incoming":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="in-sender">Sender</Label>
              <Input id="in-sender" placeholder="Enter sender name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="in-subject">Subject</Label>
              <Input id="in-subject" placeholder="Enter letter subject" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="in-priority">Priority</Label>
                <Select defaultValue="medium">
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
                <Select defaultValue="pending">
                  <SelectTrigger id="in-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      case "outgoing":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="out-recipient">Recipient</Label>
              <Input id="out-recipient" placeholder="Enter recipient name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="out-subject">Subject</Label>
              <Input id="out-subject" placeholder="Enter letter subject" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="out-priority">Priority</Label>
                <Select defaultValue="medium">
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
                <Select defaultValue="draft">
                  <SelectTrigger id="out-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      case "report":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="report-title">Report Title</Label>
              <Input id="report-title" placeholder="Enter report title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-publisher">Publisher</Label>
              <Input id="report-publisher" placeholder="Enter publisher name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select defaultValue="progress">
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="progress">Progress Report</SelectItem>
                    <SelectItem value="financial">Financial Report</SelectItem>
                    <SelectItem value="safety">Safety Report</SelectItem>
                    <SelectItem value="quality">Quality Control</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-status">Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger id="report-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
    }
  };

  // Get appropriate file accept string based on document type
  const getAcceptTypes = () => {
    switch (activeTab) {
      case "document":
        return ".pdf,.doc,.docx,.txt,.xls,.xlsx";
      case "image":
        return "image/*";
      case "incoming":
      case "outgoing":
        return ".pdf,.doc,.docx,.txt";
      case "report":
        return ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx";
      default:
        return "*/*";
    }
  };

  // Get tab title and icon
  const getTabInfo = (type: DocumentType) => {
    switch (type) {
      case "document":
        return { title: "Documents", icon: <FileText className="h-4 w-4" /> };
      case "image":
        return { title: "Images", icon: <ImageIcon className="h-4 w-4" /> };
      case "incoming":
        return { title: "Incoming", icon: <Mail className="h-4 w-4" /> };
      case "outgoing":
        return { title: "Outgoing", icon: <MailPlus className="h-4 w-4" /> };
      case "report":
        return { title: "Reports", icon: <FileBarChart className="h-4 w-4" /> };
    }
  };

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as DocumentType)}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid grid-cols-5">
            {(
              [
                "document",
                "image",
                "incoming",
                "outgoing",
                "report",
              ] as DocumentType[]
            ).map((type) => {
              const { title, icon } = getTabInfo(type);
              return (
                <TabsTrigger
                  key={type}
                  value={type}
                  className="flex flex-col items-center gap-1 py-2"
                >
                  {icon}
                  <span className="text-xs">{title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder={`Search ${getTabInfo(
                activeTab
              ).title.toLowerCase()}...`}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <SortAsc className="h-4 w-4" />
          </Button>
        </div>

        {(
          [
            "document",
            "image",
            "incoming",
            "outgoing",
            "report",
          ] as DocumentType[]
        ).map((type) => (
          <TabsContent key={type} value={type} className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {getMetadataFields()}

                  <div className="pt-2">
                    <FileUploader
                      onUpload={(files) => handleUpload(files)}
                      accept={getAcceptTypes()}
                      multiple={true}
                      allowCamera={type === "image"}
                      title={`Upload ${getTabInfo(type).title}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {getTabInfo(type).title} ({filteredDocuments.length})
              </h3>

              {filteredDocuments.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
                  No {getTabInfo(type).title.toLowerCase()} uploaded yet
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            {doc.thumbnailUrl ? (
                              <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                <img
                                  src={doc.thumbnailUrl || "/placeholder.svg"}
                                  alt={doc.name}
                                  className="object-cover h-full w-full"
                                />
                              </div>
                            ) : (
                              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-100">
                                {getTabInfo(doc.type).icon}
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h4 className="font-medium truncate">
                                {doc.name}
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 ml-2"
                                onClick={() => deleteDocument(doc.id)}
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
                              {doc.metadata.priority && (
                                <Badge
                                  className={`text-xs ${
                                    doc.metadata.priority === "high"
                                      ? "bg-red-100 text-red-800"
                                      : doc.metadata.priority === "medium"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {doc.metadata.priority} priority
                                </Badge>
                              )}
                              {doc.metadata.status && (
                                <Badge variant="outline" className="text-xs">
                                  {doc.metadata.status}
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
