import ProjectForm from "@/components/project-form";

export default function Home({searchParams}: ) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-blue-green-gradient animate-gradient mb-3">
            Construction Project Management
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Streamline your construction projects with our comprehensive
            management system. Track progress, manage documents, and collaborate
            with your team.
          </p>
        </div>
        <ProjectForm />
      </div>
    </main>
  );
}
