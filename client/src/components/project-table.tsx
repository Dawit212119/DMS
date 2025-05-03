"use client";
import { useEffect, useState, useCallback } from "react";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, MoreHorizontal, Pencil, Trash2, Plus, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  useGetUserProjectsQuery,
  useDeleteProjectMutation,
} from "@/state/features/userProjectApi";
import { useGetMeQuery } from "@/state/features/authApi";

export default function ProjectTable() {
  const { data, isLoading, error, refetch } = useGetUserProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const projects = data?.data || [];

  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // Force re-render counter
  const [renderKey, setRenderKey] = useState(0);

  const handleViewDetails = useCallback(
    (projectId: string) => {
      router.push(`/project/${projectId}/overview`);
    },
    [router]
  );

  const handleEditProject = useCallback(
    (projectId: string) => {
      router.push(`/projects/edit/${projectId}`);
    },
    [router]
  );

  const handleDeleteClick = useCallback((projectId: string) => {
    setProjectToDelete(projectId);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    // First close the dialog
    setIsDeleteDialogOpen(false);

    // Then reset all related state with a delay
    setTimeout(() => {
      setProjectToDelete(null);
      // Force a re-render to ensure all event handlers are properly reset
      setRenderKey((prev) => prev + 1);
    }, 100);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      await deleteProject(projectToDelete).unwrap();
      console.log("Project deleted successfully");
      // Refetch to ensure data is up to date
      refetch();
    } catch (err) {
      console.error("Failed to delete project:", err);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);

      // Reset state with a delay
      setTimeout(() => {
        setProjectToDelete(null);
        // Force a re-render to ensure all event handlers are properly reset
        setRenderKey((prev) => prev + 1);
      }, 100);
    }
  }, [projectToDelete, deleteProject, refetch]);

  const getStatusColor = useCallback((startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "bg-blue-100 text-blue-800";
    if (now > end) return "bg-red-100 text-red-800";
    return "bg-green-100 text-green-800";
  }, []);

  const getStatusText = useCallback((startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "Upcoming";
    if (now > end) return "Completed";
    return "In Progress";
  }, []);

  const { data: user } = useGetMeQuery();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isLoading, router]);

  // Add an escape key handler to close the dialog
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDeleteDialogOpen) {
        handleCancelDelete();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isDeleteDialogOpen, handleCancelDelete]);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        Loading...
      </div>
    );
  }

  if (error) return <p>Failed to load projects.</p>;

  return (
    <div className="space-y-4" key={renderKey}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Projects</h2>
        <Button onClick={() => router.push("/project/create?mode=create")}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {projects.length === 0 && (
        <div className="flex flex-col justify-center items-center space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-lg text-gray-600">
            You haven&#39;t created any projects yet.
          </p>
          <Button
            onClick={() => router.push("/project/create?mode=create")}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Your First Project
          </Button>
        </div>
      )}

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
                  <TableRow key={project.id}>
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
                            onClick={() => handleViewDetails(project.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditProject(project.id)}
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(project.id)}
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

      {/* Custom Delete Confirmation Modal */}
      {isDeleteDialogOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleCancelDelete}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <h2 className="text-lg font-semibold">Are you sure?</h2>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. This will permanently delete the
                project and all associated data.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                variant="outline"
                onClick={handleCancelDelete}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>

            {/* Close button */}
            <button
              onClick={handleCancelDelete}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
