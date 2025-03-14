import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    title: string;
    date: string;
    assignee: string;
    image: string;
  };
  viewMode: "grid" | "list";
}

export default function ProjectCard({ project, viewMode }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow",
        viewMode === "list" && "flex"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative",
          viewMode === "grid" ? "h-48" : "h-40 w-64 flex-shrink-0"
        )}
      >
        <Image
          src="/download.jpeg"
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-3 line-clamp-2">
          {project.title}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{project.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{project.assignee}</span>
          </div>
        </div>

        <div className="mt-4">
          <button className="text-sm font-medium text-[#95C11F] hover:text-[#84ac1b]">
            Actions
          </button>
        </div>
      </div>
    </div>
  );
}
