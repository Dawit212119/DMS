"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  MailOpen,
  Search,
  Send,
  QrCode,
  Share2,
} from "lucide-react";
import QRCode from "qrcode";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
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

// Define TypeScript interfaces for the letter data
export interface IncomingLetter {
  id: string;
  date: string;
  sender: string;
  subject: string;
  status: "Read" | "Unread";
  priority: "High" | "Medium" | "Low";
}

export interface OutgoingLetter {
  id: string;
  date: string;
  recipient: string;
  subject: string;
  status: "Sent" | "Draft";
  priority: "High" | "Medium" | "Low";
}

export interface LetterPageProps {
  projectName: string;
  projectId: string;
  incomingLetters: IncomingLetter[];
  outgoingLetters: OutgoingLetter[];
  onDownload?: (letterId: string, isIncoming: boolean) => void;
}

export default function LetterPage({
  projectName,
  projectId,
  incomingLetters,
  outgoingLetters,
  onDownload = () => {},
}: LetterPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [currentLetter, setCurrentLetter] = useState<{
    id: string;
    subject: string;
    isIncoming: boolean;
  } | null>(null);

  // Function to generate QR code
  const generateQRCode = async (
    letterId: string,
    subject: string,
    isIncoming: boolean
  ) => {
    try {
      // Generate a URL for the letter (this is a placeholder - replace with your actual URL structure)
      const letterUrl = `${
        window.location.origin
      }/projects/${projectId}/letters/${
        isIncoming ? "incoming" : "outgoing"
      }/${letterId}`;

      // Generate QR code
      const qrCodeDataUrl = await QRCode.toDataURL(letterUrl);
      setQrCodeUrl(qrCodeDataUrl);
      setCurrentLetter({ id: letterId, subject, isIncoming });
      setQrModalOpen(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  // Function to download QR code
  const downloadQRCode = () => {
    if (!qrCodeUrl || !currentLetter) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qrcode-${currentLetter.id.toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to share QR code
  const shareQRCode = async () => {
    if (!qrCodeUrl || !currentLetter) return;

    if (navigator.share) {
      try {
        // Convert data URL to Blob
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        const file = new File([blob], `qrcode-${currentLetter.id}.png`, {
          type: "image/png",
        });

        await navigator.share({
          title: `QR Code for ${currentLetter.subject}`,
          text: `Scan this QR code to access the ${
            currentLetter.isIncoming ? "incoming" : "outgoing"
          } letter: ${currentLetter.subject}`,
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

  // Filter letters based on search query
  const filteredIncoming = incomingLetters.filter(
    (letter) =>
      letter.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOutgoing = outgoingLetters.filter(
    (letter) =>
      letter.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Project Correspondence
          </h1>
          <p className="text-muted-foreground">
            {projectName} #{projectId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Filter by Date
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search correspondence..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="shrink-0">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>All Correspondence</DropdownMenuItem>
              <DropdownMenuItem>High Priority</DropdownMenuItem>
              <DropdownMenuItem>Unread Only</DropdownMenuItem>
              <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="shrink-0">
                <ArrowDownUp className="mr-2 h-4 w-4" />
                Sort
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>Date (Newest First)</DropdownMenuItem>
              <DropdownMenuItem>Date (Oldest First)</DropdownMenuItem>
              <DropdownMenuItem>Priority (High to Low)</DropdownMenuItem>
              <DropdownMenuItem>Priority (Low to High)</DropdownMenuItem>
              <DropdownMenuItem>Alphabetical (A-Z)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="incoming">
              <MailOpen className="mr-2 h-4 w-4" />
              Incoming Letters
            </TabsTrigger>
            <TabsTrigger value="outgoing">
              <Send className="mr-2 h-4 w-4" />
              Outgoing Letters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Incoming Correspondence</CardTitle>
                <CardDescription>
                  Manage all incoming letters for the {projectName}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Subject
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Priority
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIncoming.length > 0 ? (
                        filteredIncoming.map((letter) => (
                          <TableRow key={letter.id}>
                            <TableCell className="font-medium">
                              {letter.id}
                            </TableCell>
                            <TableCell>
                              {new Date(letter.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{letter.sender}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {letter.subject}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge
                                variant={
                                  letter.priority === "High"
                                    ? "destructive"
                                    : letter.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {letter.priority}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge
                                variant={
                                  letter.status === "Unread"
                                    ? "outline"
                                    : "secondary"
                                }
                              >
                                {letter.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    generateQRCode(
                                      letter.id,
                                      letter.subject,
                                      true
                                    )
                                  }
                                  title="QR Code"
                                >
                                  <QrCode className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => onDownload(letter.id, true)}
                                  title="Download"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            No incoming letters found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile card view (visible on small screens) */}
                <div className="mt-4 grid grid-cols-1 gap-4 md:hidden">
                  {filteredIncoming.map((letter) => (
                    <Card key={letter.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{letter.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(letter.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            variant={
                              letter.priority === "High"
                                ? "destructive"
                                : letter.priority === "Medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {letter.priority}
                          </Badge>
                        </div>
                        <p className="font-medium mb-1">{letter.subject}</p>
                        <p className="text-sm mb-3">From: {letter.sender}</p>
                        <div className="flex justify-between items-center">
                          <Badge
                            variant={
                              letter.status === "Unread"
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {letter.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                generateQRCode(letter.id, letter.subject, true)
                              }
                            >
                              <QrCode className="h-4 w-4 mr-1" />
                              QR Code
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDownload(letter.id, true)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outgoing" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Outgoing Correspondence</CardTitle>
                <CardDescription>
                  Manage all outgoing letters for the {projectName}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Subject
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Priority
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOutgoing.length > 0 ? (
                        filteredOutgoing.map((letter) => (
                          <TableRow key={letter.id}>
                            <TableCell className="font-medium">
                              {letter.id}
                            </TableCell>
                            <TableCell>
                              {new Date(letter.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{letter.recipient}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {letter.subject}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge
                                variant={
                                  letter.priority === "High"
                                    ? "destructive"
                                    : letter.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {letter.priority}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge
                                variant={
                                  letter.status === "Draft"
                                    ? "outline"
                                    : "secondary"
                                }
                              >
                                {letter.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    generateQRCode(
                                      letter.id,
                                      letter.subject,
                                      false
                                    )
                                  }
                                  title="QR Code"
                                >
                                  <QrCode className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => onDownload(letter.id, false)}
                                  title="Download"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            No outgoing letters found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile card view (visible on small screens) */}
                <div className="mt-4 grid grid-cols-1 gap-4 md:hidden">
                  {filteredOutgoing.map((letter) => (
                    <Card key={letter.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{letter.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(letter.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            variant={
                              letter.priority === "High"
                                ? "destructive"
                                : letter.priority === "Medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {letter.priority}
                          </Badge>
                        </div>
                        <p className="font-medium mb-1">{letter.subject}</p>
                        <p className="text-sm mb-3">To: {letter.recipient}</p>
                        <div className="flex justify-between items-center">
                          <Badge
                            variant={
                              letter.status === "Draft"
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {letter.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                generateQRCode(letter.id, letter.subject, false)
                              }
                            >
                              <QrCode className="h-4 w-4 mr-1" />
                              QR Code
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDownload(letter.id, false)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* QR Code Modal */}
      <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              QR Code for {currentLetter?.isIncoming ? "Incoming" : "Outgoing"}{" "}
              Letter
            </DialogTitle>
            <DialogDescription>
              {currentLetter?.subject} (ID: {currentLetter?.id})
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
    </div>
  );
}
