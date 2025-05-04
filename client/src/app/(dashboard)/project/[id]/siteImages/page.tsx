"use client";

import { Gallery } from "@/components/gallery";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

// Sample data - replace with your actual data
export default function GalleryPage() {
  const constructionSiteImages = useSelector((state: RootState) => {
    return state.project?.currentProject?.siteImages;
  });

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Site Pictures</h1>
          <p className="text-muted-foreground">
            Browse construction site documentation organized by category
          </p>
        </div>
        <Gallery images={constructionSiteImages || []} />
      </div>
    </div>
  );
}
