import { Gallery } from "@/components/gallery";
import type { Metadata } from "next";

// Sample data - in a real app, this would come from an API or database
const constructionSiteImages = [
  {
    id: 1,
    title: "Site Excavation",
    category: "foundation",
    imageSrc: "/placeholder.svg?height=600&width=800",
    location: "North Section",
    date: "2023-10-15",
  },
  {
    id: 2,
    title: "Foundation Work",
    category: "foundation",
    imageSrc: "/placeholder.svg?height=600&width=800",
    location: "Building A",
    date: "2023-11-02",
  },
  {
    id: 3,
    title: "Steel Framework",
    category: "structural",
    imageSrc: "/placeholder.svg?height=600&width=800",
    location: "Main Building",
    date: "2023-11-20",
  },
  {
    id: 4,
    title: "Concrete Pouring",
    category: "structural",
    imageSrc: "/placeholder.svg?height=600&width=800",
    location: "West Wing",
    date: "2023-12-05",
  },
  {
    id: 5,
    title: "Electrical Installation",
    category: "electrical",
    imageSrc: "/placeholder.svg?height=600&width=800",
    location: "Floor 2",
    date: "2024-01-10",
  },
  {
    id: 6,
    title: "Plumbing Work",
    category: "plumbing",
    imageSrc: "/placeholder.svg?height=600&width=800",
    location: "East Wing",
    date: "2024-01-18",
  },
  {
    id: 7,
    title: "Exterior Cladding",
    category: "exterior",
    imageSrc: "/placeholder.svg?height=600&width=800",
    location: "South Facade",
    date: "2024-02-05",
  },
  {
    id: 8,
    title: "Site Overview",
    category: "aerial",
    imageSrc: "/placeholder.svg?height=600&width=800",
    location: "Full Site",
    date: "2024-02-20",
  },
];

export default function GalleryPage() {
  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Site Pictures</h1>
        </div>
        <Gallery images={constructionSiteImages} />
      </div>
    </div>
  );
}
