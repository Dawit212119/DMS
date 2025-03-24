import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Calendar,
  Download,
  Filter,
  PlusCircle,
  Share2,
} from "lucide-react";

export default function WeeklyReport() {
  return (
    <div className="p-6">
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

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <Progress value={67} className="mt-2 h-2" />
            <div className="mt-1 text-xs text-gray-500">
              28 of 42 tasks completed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Projects Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Kings Tower Apartments</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>CHAKA Housing Project</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>CRYSTAL BUSINESS</span>
                  <span className="font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Team Workload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[100px] w-full rounded-md border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <BarChart className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-1 text-xs text-gray-500">
                  Team workload chart
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="mb-6">
        <TabsList>
          <TabsTrigger value="tasks">Weekly Tasks</TabsTrigger>
          <TabsTrigger value="sites">Site Visits</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Tasks for This Week</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-4 w-4 rounded-full ${
                          task.status === "Completed"
                            ? "bg-green-500"
                            : task.status === "In Progress"
                            ? "bg-blue-500"
                            : task.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <h4 className="font-medium">{task.name}</h4>
                        <div className="mt-1 text-xs text-gray-500">
                          <span>Project: {task.project}</span>
                          <span className="mx-2">•</span>
                          <span>Due: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{task.assignee}</div>
                      <div
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : task.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {task.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sites" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Site Visits Scheduled</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Schedule Visit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {siteVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="flex items-center justify-between rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <div>
                      <h4 className="font-medium">{visit.site}</h4>
                      <div className="mt-1 text-xs text-gray-500">
                        <span>{visit.date}</span>
                        <span className="mx-2">•</span>
                        <span>{visit.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">
                        {visit.inspector}
                      </div>
                      <div
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          visit.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : visit.status === "Scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {visit.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Weekly Meetings</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Schedule Meeting
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <div>
                      <h4 className="font-medium">{meeting.title}</h4>
                      <div className="mt-1 text-xs text-gray-500">
                        <span>{meeting.date}</span>
                        <span className="mx-2">•</span>
                        <span>{meeting.time}</span>
                        <span className="mx-2">•</span>
                        <span>{meeting.attendees} attendees</span>
                      </div>
                    </div>
                    <div
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        meeting.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : meeting.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {meeting.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <h3 className="mb-4 text-lg font-semibold">Weekly Summary</h3>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-700">
              This week has shown good progress across most projects. The Kings
              Tower Apartments foundation work is on track, with 75% of weekly
              tasks completed. The CHAKA Housing Project is experiencing some
              delays due to material delivery issues, but the team is working on
              alternative solutions. The CRYSTAL BUSINESS project is nearing
              completion with 90% of tasks done, and we expect to finalize it by
              next week. Team coordination has improved, with all scheduled
              meetings completed successfully.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const weeklyTasks = [
  {
    id: 1,
    name: "Complete site inspection at Kings Tower",
    project: "Kings Tower Apartments",
    dueDate: "Mar 12, 2024",
    assignee: "Andargachew M.",
    status: "Completed",
  },
  {
    id: 2,
    name: "Submit weekly progress report",
    project: "All Projects",
    dueDate: "Mar 15, 2024",
    assignee: "Eyob T.",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Review CHAKA Housing plans",
    project: "CHAKA Housing Project",
    dueDate: "Mar 16, 2024",
    assignee: "Selam B.",
    status: "Pending",
  },
  {
    id: 4,
    name: "Update client on CRYSTAL BUSINESS project",
    project: "CRYSTAL BUSINESS",
    dueDate: "Mar 10, 2024",
    assignee: "Dawit K.",
    status: "Delayed",
  },
  {
    id: 5,
    name: "Prepare materials for next site visit",
    project: "Kings Tower Apartments",
    dueDate: "Mar 13, 2024",
    assignee: "Hiwot G.",
    status: "Completed",
  },
];

const siteVisits = [
  {
    id: 1,
    site: "Kings Tower Apartments",
    date: "Mar 12, 2024",
    time: "09:00 AM",
    inspector: "Andargachew M.",
    status: "Completed",
  },
  {
    id: 2,
    site: "CHAKA Housing Project",
    date: "Mar 14, 2024",
    time: "10:30 AM",
    inspector: "Eyob T.",
    status: "Scheduled",
  },
  {
    id: 3,
    site: "CRYSTAL BUSINESS",
    date: "Mar 16, 2024",
    time: "02:00 PM",
    inspector: "Selam B.",
    status: "Scheduled",
  },
  {
    id: 4,
    site: "Metro Office Complex",
    date: "Mar 17, 2024",
    time: "11:00 AM",
    inspector: "Dawit K.",
    status: "Pending",
  },
];

const meetings = [
  {
    id: 1,
    title: "Weekly Project Coordination Meeting",
    date: "Mar 12, 2024",
    time: "10:00 AM - 11:30 AM",
    attendees: 5,
    status: "Completed",
  },
  {
    id: 2,
    title: "CHAKA Housing Project Review",
    date: "Mar 14, 2024",
    time: "02:00 PM - 03:00 PM",
    attendees: 4,
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Client Meeting - Metro Investments",
    date: "Mar 15, 2024",
    time: "11:00 AM - 12:00 PM",
    attendees: 3,
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Technical Team Sync",
    date: "Mar 16, 2024",
    time: "09:30 AM - 10:30 AM",
    attendees: 6,
    status: "Scheduled",
  },
];
