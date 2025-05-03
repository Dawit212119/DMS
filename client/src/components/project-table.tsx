"use client";
import { useEffect, useState } from "react";
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
import { useGetUserProjectsQuery } from "@/state/features/userProjectApi";
import { useGetMeQuery } from "@/state/features/authApi";

export default function ProjectTable() {
  const { data, isLoading, error } = useGetUserProjectsQuery();
  const projects = data?.data || [];
  console.log("My projects", projects);
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsDetailsDialogOpen(true);
  };

  const handleEditProject = (projectName: string) => {
    router.push(`/projects/edit/${projectName}`);
  };

  const handleDeleteClick = (projectName: string) => {
    setProjectToDelete(projectName);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      //TODO: delete the project here
      // For now: just close the dialog
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

  const { data: user } = useGetMeQuery();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        Loading...
      </div>
    );
  }
  if (error) return <p>Failed to load projects.</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Projects</h2>
        <Button onClick={() => router.push("/project/create?mode=create")}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {/* If there are no projects, show this message */}
      {projects.length === 0 && (
        <div className="flex flex-col justify-center items-center space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-lg text-gray-600">
            You haven&#39;t created any projects yet.
          </p>
          <Button
            onClick={() => router.push("/projects/new")}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Your First Project
          </Button>
        </div>
      )}

      {/* If there are projects, show the table */}
      {projects.length > 0 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Timeline
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project: any) => (
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
                            onClick={() =>
                              handleEditProject(project.projectName)
                            }
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleDeleteClick(project.projectName)
                            }
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
      )}

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
