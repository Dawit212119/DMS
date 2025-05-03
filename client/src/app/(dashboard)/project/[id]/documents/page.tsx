"use client";

import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Eye, Download, FileText, QrCode, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Document } from "@/state/project/projectSlice";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function DocumentsTable() {
  const documents = useSelector(
    (state: RootState) => state.project.currentProject?.documents
  );
  const [files, setFiles] = useState<Document[]>([]);
  // QR code state
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [currentFile, setCurrentFile] = useState<Document | null>(null);

  // Initialize files with documents from Redux
  useEffect(() => {
    if (documents) {
      setFiles(documents);
    }
  }, [documents]);

  // const handleDownload = (fileId: string) => {
  //   // In a real application, this would trigger the actual file download
  //   console.log(`Downloading file with ID: ${fileId}`);
  //   // You would typically redirect to the file URL or use an API call here
  // };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to generate QR code
  const generateQRCode = async (file: Document) => {
    try {
      // Generate a URL for the file (this is a placeholder - replace with your actual URL structure)
      const fileUrl = file.fileUrl;

      // Generate QR code
      const qrCodeDataUrl = await QRCode.toDataURL(fileUrl);
      setQrCodeUrl(qrCodeDataUrl);
      setCurrentFile(file);
      setQrModalOpen(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  // Function to download QR code
  const downloadQRCode = () => {
    if (!qrCodeUrl || !currentFile) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qrcode-${currentFile.fileName
      .toLowerCase()
      .replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to share QR code
  const shareQRCode = async () => {
    if (!qrCodeUrl || !currentFile) return;

    if (navigator.share) {
      try {
        // Convert data URL to Blob
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        const file = new File(
          [blob],
          `qrcode-${currentFile.fileName.replace(/\s+/g, "-")}.png`,
          {
            type: "image/png",
          }
        );

        await navigator.share({
          title: `QR Code for ${currentFile.fileName}`,
          text: `Scan this QR code to access the document: ${currentFile.name}`,
          files: [file],
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(
        "Sharing is not supported in your browser. You can download the QR code instead."
      );
    }
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{file.fileName}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(file.date)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => generateQRCode(file)}
                    >
                      <QrCode className="h-4 w-4" />
                      <span className="hidden sm:inline">QR Code</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => window.open(file.fileUrl, "_blank")}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* QR Code Modal */}
      <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code for Document</DialogTitle>
            <DialogDescription>
              {currentFile?.fileName} (Title {currentFile?.title})
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            {qrCodeUrl && (
              <div className="border p-4 rounded-lg bg-white">
                <img
                  src={qrCodeUrl || "/placeholder.svg"}
                  alt="QR Code"
                  className="w-64 h-64"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={shareQRCode} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              onClick={downloadQRCode}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
