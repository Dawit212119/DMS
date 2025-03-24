import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

// Sample project data - replace with your actual data
const projects = [
  {
    id: "PRJ-001",
    name: "Website Redesign",
    client: "ABC Corporation",
    startDate: "2025-02-15",
    endDate: "2025-05-30",
    status: "In Progress",
    progress: 45,
    team: ["John Doe", "Jane Smith", "Robert Johnson"],
    budget: "$25,000",
  },
  {
    id: "PRJ-002",
    name: "Marketing Strategy",
    client: "XYZ Industries",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    status: "In Progress",
    progress: 70,
    team: ["Alice Brown", "David Wilson"],
    budget: "$18,500",
  },
  {
    id: "PRJ-003",
    name: "Financial Audit",
    client: "Global Enterprises",
    startDate: "2025-03-01",
    endDate: "2025-04-15",
    status: "Not Started",
    progress: 0,
    team: ["Michael Clark", "Susan Miller"],
    budget: "$12,000",
  },
  {
    id: "PRJ-004",
    name: "IT Infrastructure Upgrade",
    client: "Tech Solutions Ltd",
    startDate: "2024-11-15",
    endDate: "2025-03-10",
    status: "Completed",
    progress: 100,
    team: ["James Wilson", "Patricia Moore", "Richard Taylor"],
    budget: "$42,000",
  },
  {
    id: "PRJ-005",
    name: "Employee Training Program",
    client: "Innovative Systems",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    status: "Not Started",
    progress: 0,
    team: ["Jennifer Adams", "Thomas Brown"],
    budget: "$15,000",
  },
];

// Helper function to format dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Helper function to determine status badge color
function getStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "In Progress":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Not Started":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#f9f7f0]">
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Projects</h1>

          <div className="flex space-x-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ca93e] focus:border-transparent"
              />
            </div>

            <Button variant="outline" className="flex items-center gap-2">
              <FilterIcon className="h-4 w-4" />
              Filter
            </Button>

            <Button className="bg-[#8ca93e] hover:bg-[#7a9235] text-white flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Project ID</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-right">Budget</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.id}</TableCell>
                    <TableCell>
                      <Link
                        href={`/project/${project.id}`}
                        className="text-[#1a2e4c] hover:text-[#8ca93e] font-medium"
                      >
                        {project.name}
                      </Link>
                    </TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <CalendarIcon className="h-3 w-3" />
                        {formatDate(project.startDate)} -{" "}
                        {formatDate(project.endDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(
                          project.status
                        )} font-normal`}
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#8ca93e] h-2.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-1">
                        {project.progress}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, index) => (
                          <div
                            key={index}
                            className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium"
                            title={member}
                          >
                            {member
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        ))}
                        {project.team.length > 3 && (
                          <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {project.budget}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
          <div>Showing 5 of 5 projects</div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
