"use client";
import Link from "next/link";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RecentImages } from "@/components/recent-images";
import { useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { Project } from "@/state/project/projectSlice";

export default function ProjectOverview() {
  const {
    currentProject: projectData,
    status,
    error,
  } = useSelector((state: RootState) => {
    return state.project as {
      currentProject: Project;
      status: string;
      error: string | null;
    };
  });
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    const today = new Date();
    const completionDate = new Date(projectData.dueDate);
    const diffTime = completionDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container py-10">
      <div className="space-y-8">
        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {projectData.projectName}
            </h1>
            <p className="text-muted-foreground mt-1">
              {projectData.clientName}
            </p>
          </div>
        </div>

        {/* Project Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Project Progress
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectData.progress}%</div>
              <Progress value={projectData.progress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {calculateDaysRemaining()} days remaining
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  projectData.budget.reduce((total, b) => total + b.spent, 0)
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                of{" "}
                {formatCurrency(
                  projectData.budget.reduce((total, b) => total + b.total, 0)
                )}{" "}
                (
                {Math.round(
                  (projectData.budget.reduce((total, b) => total + b.spent, 0) /
                    projectData.budget.reduce(
                      (total, b) => total + b.total,
                      0
                    )) *
                    100
                )}
                %)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Timeline</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDate(projectData.startDate)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                to {formatDate(projectData.dueDate)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projectData.team.reduce(
                  (total, member) => total + member.totalWorker,
                  0
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                workers on site
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Project Details and Recent Images */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{projectData.location}</span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Key Team Members</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Project Manager:
                    </span>
                    <span>
                      {projectData.team
                        ? projectData.team[0].projectManger
                        : "None"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Site Engineer:
                    </span>
                    <span>
                      {projectData.team
                        ? projectData.team[0].siteManger
                        : "None"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Civil Engineer:
                    </span>
                    <span>
                      {projectData.team
                        ? projectData.team[0].civilManger
                        : "None"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Architectural Lead:
                    </span>
                    <span>
                      {projectData.team
                        ? projectData.team[0].architecturalLoad
                        : "None"}
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/team">View Full Team</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Upcoming Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(projectData.upcomingMilstone) &&
                projectData.upcomingMilstone.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{milestone.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(milestone.date)}
                        </p>
                      </div>
                    </div>
                    <Badge status={milestone.status} />
                  </div>
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/schedule">View Full Schedule</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Status badge component
function Badge({ status }: { status: string }) {
  const getStatusStyles = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "on-track":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "at-risk":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "delayed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "Completed";
      case "on-track":
        return "On Track";
      case "at-risk":
        return "At Risk";
      case "delayed":
        return "Delayed";
      default:
        return "Unknown";
    }
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {getStatusText()}
    </span>
  );
}
