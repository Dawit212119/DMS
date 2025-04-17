import ProjectCard from "@/components/project-card";

// This would typically come from your database
const projects = [
  {
    id: "1",
    name: "New Office Building",
    client: "Acme Corporation",
    location: "Downtown, New York",
    startDate: "2023-06-15",
    endDate: "2024-08-30",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    name: "Residential Complex Phase 2",
    client: "Horizon Developers",
    location: "Westside, Chicago",
    startDate: "2023-04-10",
    endDate: "2024-05-20",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    name: "Highway Bridge Renovation",
    client: "State Transportation Dept",
    location: "River Crossing, Portland",
    startDate: "2023-01-05",
    endDate: "2023-11-15",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            client={project.client}
            location={project.location}
            startDate={project.startDate}
            endDate={project.endDate}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
