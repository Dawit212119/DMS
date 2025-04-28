"use client";

import ProjectCard from "@/components/project-card";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { fetchProjects } from "@/state/project/projectSlice";
export default function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, status, error } = useSelector((state: RootState) => {
    return state.project as {
      projects: Array<{
        id: string;
        projectName: string;
        clientName: string;
        location: string;
        startDate: string;
        dueDate: string;
        progress: number;
      }>;
      status: string;
      error: string | null;
    };
  });

  useEffect(() => {
    dispatch(fetchProjects(1)); // Fetch first page of projects
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg p-4 animate-pulse h-64"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
        </div>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.projectName}
              client={project.clientName}
              location={project.location}
              startDate={new Date(project.startDate).toLocaleDateString()}
              endDate={new Date(project.dueDate).toLocaleDateString()}
              imageUrl="/placeholder.svg?height=200&width=400"
              progress={project.progress}
            />
          ))}
        </div>
      )}
    </div>
  );
}
