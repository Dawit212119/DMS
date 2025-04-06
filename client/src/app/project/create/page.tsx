import ProjectFormProvider from "@/components/project-form/project-form-provider";
import ProjectForm from "@/components/project-form/project-form";

interface PageProps {
  searchParams: {
    projectId?: string;
    mode?: "create" | "update";
  };
}

export default function Home({ searchParams }: PageProps) {
  const { projectId, mode = "create" } = searchParams;

  // In a real app, you would fetch the project data here if mode is "update"
  // For now, we'll just use an empty object as initialProject
  const initialProject = mode === "update" ? {} : undefined;

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        {mode === "create" ? "Create New Project" : "Update Project"}
      </h1>
      <ProjectFormProvider
        initialProject={initialProject}
        mode={mode}
        projectId={projectId}
      >
        <ProjectForm />
      </ProjectFormProvider>
    </main>
  );
}
