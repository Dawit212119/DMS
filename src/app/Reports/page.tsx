"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List, Plus } from "lucide-react";
import { NewReportModal } from "@/components/new-report-modal";
import { cn } from "@/lib/utils";
import ProjectCard from "@/components/project-card";

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showNewReportModal, setShowNewReportModal] = useState(false);

  const projects = [
    {
      id: 1,
      title: "CHAKA Housing Development",
      date: "2023-27th",
      assignee: "Aschenaki Gizaw",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pro1.jpg-JJDbOXfVn8lSFkp2B9myh753wWozHt.jpeg",
    },
    {
      id: 2,
      title: "Agri-Product Market Center (Ayat Site)",
      date: "2023-27th",
      assignee: "Gezahegn Chane",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pro1.jpg-JJDbOXfVn8lSFkp2B9myh753wWozHt.jpeg",
    },
    {
      id: 3,
      title: "Agri-Product Farmer Market (Summit Site)",
      date: "2023-27th",
      assignee: "Gezahegn chane",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pro1.jpg-JJDbOXfVn8lSFkp2B9myh753wWozHt.jpeg",
    },
    {
      id: 4,
      title: "King's Tower",
      date: "2023-27th",
      assignee: "Eyob Getachew",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pro1.jpg-JJDbOXfVn8lSFkp2B9myh753wWozHt.jpeg",
    },
    {
      id: 5,
      title: "Agri-Product Market Center (Bethel Site)",
      date: "2023-27th",
      assignee: "Alazar Shiferaw",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pro1.jpg-JJDbOXfVn8lSFkp2B9myh753wWozHt.jpeg",
    },
    {
      id: 6,
      title: "CHAKA Housing Development",
      date: "2023-28th",
      assignee: "Aschenaki Gizaw",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pro1.jpg-JJDbOXfVn8lSFkp2B9myh753wWozHt.jpeg",
    },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto ">
      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-8">
          <TabButton active>Weekly Report</TabButton>
          <TabButton>Weekly Report Expanded</TabButton>
          <TabButton>Report (File)</TabButton>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Projects:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active Projects</SelectItem>
              <SelectItem value="completed">Completed Projects</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Button
            className="bg-[#95C11F] hover:bg-[#84ac1b] text-white"
            onClick={() => setShowNewReportModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-none",
                viewMode === "grid" && "bg-gray-100"
              )}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-none",
                viewMode === "list" && "bg-gray-100"
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} viewMode={viewMode} />
        ))}
      </div>
      <div className="mt-10">
        <NewReportModal
          open={showNewReportModal}
          onClose={() => setShowNewReportModal(false)}
        />
      </div>
    </div>
  );
}

function TabButton({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium border-b-2 -mb-[2px]",
        active
          ? "border-[#95C11F] text-[#95C11F]"
          : "border-transparent text-gray-600 hover:text-gray-900"
      )}
    >
      {children}
    </button>
  );
}
