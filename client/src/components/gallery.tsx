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
import { Search, Download, Calendar, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Define the image item type
export type SiteImage = {
  id: number | string;
  title: string;
  category: string;
  imageSrc: string;
  location?: string;
  date?: string;
};

type GalleryProps = {
  images: SiteImage[];
};

export function Gallery({ images }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<SiteImage | null>(null);

  // Extract unique categories from images
  const uniqueCategories = [
    "all",
    ...Array.from(new Set(images.map((img) => img.category))),
  ];

  // Filter gallery items based on selected category and search query
  const filteredItems = images.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;
    return matchesCategory && matchesSearch;
  });

  // Format date to be more readable
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
                {category.charAt(0).toUpperCase() + category.slice(1)}
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
              onClick={() => setSelectedImage(item)}
            >
              <div className="aspect-video relative">
                <Image
                  src={item.imageSrc || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
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
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No images found matching your criteria.
          </p>
        </div>
      )}

      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        {selectedImage && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedImage.title}</DialogTitle>
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedImage.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedImage.location}
                  </div>
                )}
                {selectedImage.date && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(selectedImage.date)}
                  </div>
                )}
              </div>
            </DialogHeader>
            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              <Image
                src={selectedImage.imageSrc || "/placeholder.svg"}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex justify-between items-center">
              <Badge>{selectedImage.category}</Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
