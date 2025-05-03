"use client";

import ProjectChecklist from "./checklistTable";
import { RootState } from "@/state/store";
import { Project } from "@/state/project/projectSlice";
import { useSelector } from "react-redux";

// Sample data for a single project
export default function ProjectChecklistPage() {
  const { currentProject, status, error } = useSelector((state: RootState) => {
    return state.project as {
      currentProject: Project;
      status: string;
      error: string | null;
    };
  });
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Project Management</h1>
      <p className="text-muted-foreground mb-8">
        Track the status of tasks for the Annual Financial Report project.
      </p>

      <div className="p-6 border rounded-lg bg-card mb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Project Manager
            </h3>
            <p className="text-lg font-medium">John Smith</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Start Date
            </h3>
            <p className="text-lg font-medium">Oct 1, 2023</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Due Date
            </h3>
            <p className="text-lg font-medium">Dec 31, 2023</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Status
            </h3>
            <p className="text-lg font-medium">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                In Progress
              </span>
            </p>
          </div>
        </div>
      </div>

      <ProjectChecklist
        projectName={currentProject.projectName}
        items={currentProject.checklist}
      />
    </main>
  );
}
