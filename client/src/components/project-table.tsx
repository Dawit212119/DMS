"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ProjectDetailsDialog from "./project-details-dialog";

// Sample project data - in a real app, this would come from an API or database
const sampleProjects = [
  {
    projectName: "Len Buckley",
    clientName: "Neil Sullivan",
    location: "Downtown Area",
    startDate: "2019-10-26",
    endDate: "2018-12-24",
    budget: { totalBudget: "400000", amountSpent: "90000" },
    team: {
      projectManager: "John Smith",
      siteManager: "Jane Doe",
      civilManager: "Robert Johnson",
      architecturalLead: "Sarah Williams",
      totalWorkers: 81,
    },
    milestones: [
      {
        id: "1746008289759",
        name: "Foundation Complete",
        date: "2021-01-20",
        status: "ontrack",
      },
    ],
    documents: [
      {
        id: "17460083369300",
        title: "Project Plan",
        fileUrl: "https://example.com/project-plan.pdf",
        fileName: "project-plan.pdf",
      },
    ],
  },
  {
    projectName: "Harbor Heights",
    clientName: "Maria Garcia",
    location: "Waterfront District",
    startDate: "2020-05-15",
    endDate: "2022-08-30",
    budget: { totalBudget: "750000", amountSpent: "500000" },
    team: {
      projectManager: "David Lee",
      siteManager: "Michael Brown",
      civilManager: "Lisa Chen",
      architecturalLead: "Thomas Wilson",
      totalWorkers: 65,
    },
    milestones: [
      {
        id: "1746008289760",
        name: "Structural Completion",
        date: "2021-06-15",
        status: "completed",
      },
    ],
    documents: [
      {
        id: "17460083369301",
        title: "Architectural Drawings",
        fileUrl: "https://example.com/drawings.pdf",
        fileName: "architectural-drawings.pdf",
      },
    ],
  },
];

export default function ProjectTable() {
  const router = useRouter();
  const [projects, setProjects] = useState(sampleProjects);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleViewDetails = (project: any) => {
    router.push(`/`);
  };

  const handleEditProject = (projectName: string) => {
    router.push(`/`);
  };

  const handleDeleteClick = (projectName: string) => {
    console.log("deleting the project");
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects(projects.filter((p) => p.projectName !== projectToDelete));
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const getStatusColor = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "bg-blue-100 text-blue-800";
    if (now > end) return "bg-red-100 text-red-800";
    return "bg-green-100 text-green-800";
  };

  const getStatusText = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "Upcoming";
    if (now > end) return "Completed";
    return "In Progress";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Projects</h2>
        <Button onClick={() => router.push("/projects/new")}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden md:table-cell">Timeline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.projectName}>
                  <TableCell className="font-medium">
                    {project.projectName}
                  </TableCell>
                  <TableCell>{project.clientName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {project.location}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(project.startDate)} -{" "}
                    {formatDate(project.endDate)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getStatusColor(
                        project.startDate,
                        project.endDate
                      )}
                    >
                      {getStatusText(project.startDate, project.endDate)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(project)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditProject(project.projectName)}
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(project.projectName)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Project Details Dialog */}
      {selectedProject && (
        <ProjectDetailsDialog
          project={selectedProject}
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
        />
      )}
    </div>
  );
}
