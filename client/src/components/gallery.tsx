"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Search,
  Download,
  Calendar,
  MapPin,
  FileText,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/state/project/projectSlice";
import { SiteImage } from "@/state/project/projectSlice";

// This is just for the UI - you'll replace this with your actual data

export function Gallery({ images = [] }: { images: SiteImage[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<SiteImage | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  // Extract unique categories from images

  const uniqueCategories = ["all", ...Object.values(Category)];

  // Filter gallery items based on selected category and search query
  const filteredItems = images.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;
    return matchesCategory && (searchQuery === "" || matchesSearch);
  });

  // Format date to be more readable
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Determine if the file is a PDF
  const isPdf = (url: string) => {
    return url.toLowerCase().endsWith(".pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Tabs
          defaultValue="all"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex sm:flex-wrap">
            {uniqueCategories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category === "all"
                  ? "All"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title or location..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border bg-background cursor-pointer transition-all hover:shadow-md"
              onClick={() => window.open(item.imageUrl, "_blank")}
            >
              <div className="aspect-video relative bg-muted flex items-center justify-center">
                {isPdf(item.imageUrl) ? (
                  <div className="flex flex-col items-center justify-center">
                    <FileText className="h-16 w-16 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-2">
                      {item.fileName}
                    </span>
                  </div>
                ) : (
                  <Image
                    src="/placeholder_pdf.png"
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                )}
                <Badge className="absolute top-2 left-2 bg-background/80 text-foreground">
                  {item.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex flex-wrap gap-3 mt-2">
                  {item.location && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.location}
                    </div>
                  )}
                  {item.date && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(item.date)}
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-background/10 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <Button variant="secondary" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  View Document
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No documents found matching your criteria.
          </p>
        </div>
      )}

      {/* PDF Viewer Dialog */}
      {/* <Dialog
        open={isPdfOpen}
        onOpenChange={(open) => {
          setIsPdfOpen(open);
          if (!open) setSelectedFile(null);
        }}
      >
        {selectedFile && (
          <DialogContent className="max-w-5xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{selectedFile.title}</DialogTitle>
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedFile.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedFile.location}
                  </div>
                )}
                {selectedFile.date && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(selectedFile.date)}
                  </div>
                )}
              </div>
            </DialogHeader>
            <div className="relative w-full h-[70vh] overflow-hidden rounded-md">
              {isPdf(selectedFile.imageUrl) ? (
                <iframe
                  src={`${selectedFile.imageUrl}#toolbar=1&navpanes=1`}
                  className="w-full h-full"
                  title={selectedFile.title}
                />
              ) : (
                <Image
                  src="/placeholder_pdf.png"
                  alt={selectedFile.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="flex justify-between items-center">
              <Badge>{selectedFile.category}</Badge>
              <a
                href={selectedFile.imageUrl}
                download={selectedFile.fileName}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog> */}
    </div>
  );
}
