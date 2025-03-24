import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Filter,
  PieChart,
  Share2,
  User,
} from "lucide-react";

export default function ReportDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left sidebar - Groups */}
      <div className="w-[400px] border-r border-gray-200 bg-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Groups</h2>
        </div>
        <div className="space-y-1">
          {groups.map((group) => (
            <div
              key={group.id}
              className={`flex items-center justify-between px-6 py-4 hover:bg-gray-100 ${
                group.id === "weekly-plan" ? "bg-[#a3c639] text-white" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <div className="text-sm text-gray-500">
                    {group.id === "weekly-plan" ? (
                      <span className="text-white">👤</span>
                    ) : (
                      <span>👤</span>
                    )}
                  </div>
                </Avatar>
                <span
                  className={`font-medium ${
                    group.id === "weekly-plan" ? "text-white" : "text-gray-700"
                  }`}
                >
                  {group.name}
                </span>
              </div>
              <Badge
                className={`rounded-full px-2 ${
                  group.id === "weekly-plan"
                    ? "bg-white text-[#a3c639]"
                    : "bg-red-500 text-white"
                }`}
              >
                {group.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Right content - Report Dashboard */}
      <div className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Weekly plan and report
            </h2>
            <p className="text-sm text-gray-500">
              View and manage your weekly planning and reporting
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Week</SelectItem>
              <SelectItem value="previous">Previous Week</SelectItem>
              <SelectItem value="next">Next Week</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Mar 11 - Mar 17, 2024</span>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">42</div>
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">28</div>
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                67% completion rate
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Hours Logged
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">156</div>
                <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">8</div>
                <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                  <User className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tasks" className="mb-6">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Weekly Tasks</CardTitle>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-gray-500" />
                  <PieChart className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">
                          {task.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <div className="text-xs">
                                {task.assignee.substring(0, 2)}
                              </div>
                            </Avatar>
                            {task.assignee}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              task.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : task.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : task.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              task.priority === "High"
                                ? "border-red-500 text-red-500"
                                : task.priority === "Medium"
                                ? "border-yellow-500 text-yellow-500"
                                : "border-green-500 text-green-500"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-md border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Progress chart visualization would appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-md border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Team performance visualization would appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <h3 className="mb-4 text-lg font-semibold">Recent Updates</h3>
          <div className="space-y-4">
            {updates.map((update) => (
              <div
                key={update.id}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <div>{update.user.substring(0, 2)}</div>
                  </Avatar>
                  <div>
                    <div className="font-medium">{update.user}</div>
                    <div className="mt-1 text-sm text-gray-600">
                      {update.message}
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      {update.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const groups = [
  { id: "condigital", name: "ConDigital", count: 9 },
  { id: "ovid-kling", name: "Ovid-Kling Consult (Office Group)", count: 9 },
  { id: "daily-report", name: "Daily Report and Plan", count: 4 },
  { id: "weekly-plan", name: "weekly plan and report", count: 21 },
  { id: "monthly-plan", name: "Monthly plan and report", count: 25 },
  { id: "site-visit-report", name: "Site visit report", count: 9 },
  { id: "minutes", name: "Minutes of meeting", count: 9 },
  { id: "work-order", name: "Work order form", count: 0 },
  { id: "work-acceptance", name: "Work acceptance form", count: 0 },
  { id: "review", name: "Review and evaluation form", count: 0 },
];

const tasks = [
  {
    id: 1,
    name: "Complete site inspection at Kings Tower",
    assignee: "Andargachew M.",
    status: "Completed",
    dueDate: "Mar 12, 2024",
    priority: "High",
  },
  {
    id: 2,
    name: "Submit weekly progress report",
    assignee: "Eyob T.",
    status: "In Progress",
    dueDate: "Mar 15, 2024",
    priority: "Medium",
  },
  {
    id: 3,
    name: "Review CHAKA Housing plans",
    assignee: "Selam B.",
    status: "Pending",
    dueDate: "Mar 16, 2024",
    priority: "Medium",
  },
  {
    id: 4,
    name: "Update client on CRYSTAL BUSINESS project",
    assignee: "Dawit K.",
    status: "Delayed",
    dueDate: "Mar 10, 2024",
    priority: "High",
  },
  {
    id: 5,
    name: "Prepare materials for next site visit",
    assignee: "Hiwot G.",
    status: "Completed",
    dueDate: "Mar 13, 2024",
    priority: "Low",
  },
];

const updates = [
  {
    id: 1,
    user: "Andargachew Mekonen",
    message:
      "Completed the site inspection at Kings Tower Apartments. All structural elements are according to plan.",
    time: "Today at 11:23 AM",
  },
  {
    id: 2,
    user: "Eyob Tesfaye",
    message:
      "Updated the weekly progress report with new metrics from the CHAKA Housing Project.",
    time: "Yesterday at 4:15 PM",
  },
  {
    id: 3,
    user: "Selam Bekele",
    message:
      "Scheduled a meeting with the client to discuss the CRYSTAL BUSINESS project timeline.",
    time: "Mar 12, 2024 at 9:30 AM",
  },
];
