import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClipboardListIcon,
  FileTextIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

// This would typically come from a database or API
const getProjectById = (id: string) => {
  // Sample project data - replace with your actual data fetching logic
  return {
    id: id,
    name: "Website Redesign",
    client: "ABC Corporation",
    startDate: "2025-02-15",
    endDate: "2025-05-30",
    status: "In Progress",
    progress: 45,
    description:
      "Complete redesign of the corporate website with focus on improved user experience, mobile responsiveness, and integration with existing CRM systems.",
    team: [
      {
        name: "John Doe",
        role: "Project Manager",
        email: "john.doe@example.com",
      },
      {
        name: "Jane Smith",
        role: "UX Designer",
        email: "jane.smith@example.com",
      },
      {
        name: "Robert Johnson",
        role: "Frontend Developer",
        email: "robert.johnson@example.com",
      },
    ],
    budget: {
      total: "$25,000",
      spent: "$11,250",
      remaining: "$13,750",
    },
    tasks: [
      {
        id: "T-001",
        name: "Requirements Gathering",
        status: "Completed",
        assignee: "John Doe",
        dueDate: "2025-02-28",
      },
      {
        id: "T-002",
        name: "Wireframing",
        status: "Completed",
        assignee: "Jane Smith",
        dueDate: "2025-03-15",
      },
      {
        id: "T-003",
        name: "Visual Design",
        status: "In Progress",
        assignee: "Jane Smith",
        dueDate: "2025-04-10",
      },
      {
        id: "T-004",
        name: "Frontend Development",
        status: "Not Started",
        assignee: "Robert Johnson",
        dueDate: "2025-05-01",
      },
      {
        id: "T-005",
        name: "Testing & QA",
        status: "Not Started",
        assignee: "Team",
        dueDate: "2025-05-20",
      },
    ],
    milestones: [
      { name: "Project Kickoff", date: "2025-02-15", completed: true },
      { name: "Design Approval", date: "2025-04-01", completed: false },
      { name: "Beta Launch", date: "2025-05-15", completed: false },
      { name: "Final Delivery", date: "2025-05-30", completed: false },
    ],
  };
};

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

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = getProjectById(params.id);

  return (
    <div className="min-h-screen bg-[#f9f7f0]">
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link
            href="/project"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-800">
                  {project.name}
                </h1>
                <Badge className={`${getStatusColor(project.status)}`}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-gray-600 mt-1">Client: {project.client}</p>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline">Edit Project</Button>
              <Button className="bg-[#8ca93e] hover:bg-[#7a9235] text-white">
                Add Task
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-gray-800">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-bold text-gray-800">
                  {project.progress}%
                </span>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#8ca93e] h-2.5 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="font-bold text-gray-800">
                    {project.budget.total}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Spent</p>
                  <p className="font-bold text-gray-800">
                    {project.budget.spent}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Remaining</p>
                  <p className="font-bold text-green-600">
                    {project.budget.remaining}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{project.description}</p>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      {project.milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className="flex items-start mb-4 relative pl-10"
                        >
                          <div
                            className={`absolute left-3 w-3 h-3 rounded-full transform -translate-x-1/2 mt-1.5 ${
                              milestone.completed
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {milestone.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(milestone.date)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UsersIcon className="h-5 w-5" />
                      Team Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.team.map((member, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {member.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {member.role}
                            </p>
                            <p className="text-xs text-gray-500">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardListIcon className="h-5 w-5" />
                      Recent Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.tasks.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className="p-3 bg-gray-50 rounded-md"
                        >
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-gray-800">
                              {task.name}
                            </p>
                            <Badge
                              className={`${getStatusColor(
                                task.status
                              )} text-xs`}
                            >
                              {task.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <p className="text-gray-600">
                              Assignee: {task.assignee}
                            </p>
                            <p className="text-gray-600">
                              Due: {formatDate(task.dueDate)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full mt-3 text-[#8ca93e] hover:text-[#7a9235] hover:bg-[#f0f5e5]"
                    >
                      View All Tasks
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Project Tasks</CardTitle>
                <Button className="bg-[#8ca93e] hover:bg-[#7a9235] text-white">
                  Add Task
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 border border-gray-200 rounded-md hover:border-[#8ca93e] transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">
                            {task.name}
                          </p>
                          <p className="text-sm text-gray-600">ID: {task.id}</p>
                        </div>
                        <Badge className={`${getStatusColor(task.status)}`}>
                          {task.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between mt-3 text-sm">
                        <p className="text-gray-600">
                          Assignee: {task.assignee}
                        </p>
                        <p className="text-gray-600">
                          Due: {formatDate(task.dueDate)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Button className="bg-[#8ca93e] hover:bg-[#7a9235] text-white">
                  Add Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.team.map((member, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-medium">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">
                              {member.name}
                            </h3>
                            <p className="text-[#8ca93e] font-medium">
                              {member.role}
                            </p>
                            <p className="text-gray-600 mt-1">{member.email}</p>
                            <div className="flex gap-2 mt-3">
                              <Button variant="outline" size="sm">
                                Message
                              </Button>
                              <Button variant="outline" size="sm">
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileTextIcon className="h-5 w-5" />
                  Project Documents
                </CardTitle>
                <Button className="bg-[#8ca93e] hover:bg-[#7a9235] text-white">
                  Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  No documents have been uploaded for this project yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquareIcon className="h-5 w-5" />
                  Project Communications
                </CardTitle>
                <Button className="bg-[#8ca93e] hover:bg-[#7a9235] text-white">
                  New Message
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  No communications have been recorded for this project yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
