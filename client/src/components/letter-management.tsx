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
} from "lucide-react";

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
                              <div className="flex justify-end">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => onDownload(letter.id, true)}
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
                          <div>
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
                              <div className="flex justify-end">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => onDownload(letter.id, false)}
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
                          <div>
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
    </div>
  );
}
