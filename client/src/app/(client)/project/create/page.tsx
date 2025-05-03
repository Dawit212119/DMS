"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProjectForm from "@/components/project-form";
import { useGetMeQuery } from "@/state/features/authApi";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as "create" | "update") || "create";
  const projectId = searchParams.get("projectId");
  console.log("mode>>>", mode);
  console.log("projectId", projectId);
  const { data: user, isLoading } = useGetMeQuery();
  const [projectData, setProjectData] = useState(null);
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const [error, setError] = useState("");

  // Authentication check
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isLoading, router]);

  // Fetch project data if in update mode
  useEffect(() => {
    const fetchProjectData = async () => {
      if (mode === "update" && projectId) {
        setIsLoadingProject(true);
        try {
          const response = await fetch(
            `http://localhost:8000/project/${projectId}`,
            {
              credentials: "include",
            }
          );
          console.log("the response data", response);

          if (!response.ok) {
            throw new Error("Failed to fetch project data");
          }

          const data = await response.json();
          setProjectData(data.data);
        } catch (err) {
          console.log("Error fetching project:", err);
          setError("Failed to load project data. Please try again.");
        } finally {
          setIsLoadingProject(false);
        }
      }
    };

    fetchProjectData();
  }, [mode, projectId]);
  console.log("Project data here====>", projectData);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (isLoadingProject) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading project data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.push("/projects")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-blue-green-gradient animate-gradient mb-3">
            {mode === "create" ? "Create New Project" : "Update Project"}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {mode === "create"
              ? "Create a new construction project by filling out the form below. Track progress, manage documents, and collaborate with your team."
              : "Update your existing project details. Make changes to any section and save your updates."}
          </p>
        </div>
        <ProjectForm
          mode={mode}
          existingData={projectData}
          projectId={projectId}
        />
      </div>
    </main>
  );
}
