"use client";

import { Download, FileText } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProjectFile {
  id: string;
  name: string;
  date: string;
  downloadUrl: string;
  status: string;
  version: string;
}

export default function ProjectFilesTable() {
  const [files, setFiles] = useState<ProjectFile[]>([
    {
      id: "1",
      name: "Quantity (BOQ)",
      date: "2025-03-15",
      downloadUrl: "#",
      status: "Approved",
      version: "1.2",
    },
    {
      id: "2",
      name: "Agreement",
      date: "2025-03-12",
      downloadUrl: "#",
      status: "Signed",
      version: "1.0",
    },
    {
      id: "3",
      name: "Business Proposal",
      date: "2025-03-10",
      downloadUrl: "#",
      status: "Final",
      version: "2.0",
    },
    {
      id: "4",
      name: "Feasibility Study",
      date: "2025-02-28",
      downloadUrl: "#",
      status: "Under Review",
      version: "1.3",
    },
    {
      id: "5",
      name: "Approval Document",
      date: "2025-03-20",
      downloadUrl: "#",
      status: "Approved",
      version: "1.0",
    },
  ]);

  const handleDownload = (fileId: string) => {
    // In a real application, this would trigger the actual file download
    console.log(`Downloading file with ID: ${fileId}`);
    // You would typically redirect to the file URL or use an API call here
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Project Documentation</CardTitle>
        <CardDescription>
          Access and download all project-related documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Version</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{file.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(file.date)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {file.status}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {file.version}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleDownload(file.id)}
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
