import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Filter,
  MessageSquare,
  PieChart,
  Plus,
  Search,
} from "lucide-react";

export default function OvidKlingReport() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Ovid-Kling Consult (Office Group)
          </h2>
          <p className="text-sm text-gray-500">
            Internal office management and coordination
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 rounded-md border border-gray-200 bg-white pl-8 pr-4 text-sm focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            variant="default"
            size="sm"
            className="gap-1 bg-[#a3c639] hover:bg-[#8aaa2e]"
          >
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm">Today: March 14, 2024</span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <div className="mt-1 text-xs text-gray-500">4 departments</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">36</div>
            <div className="mt-1 text-xs text-gray-500">12 high priority</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Meetings Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <div className="mt-1 text-xs text-gray-500">Next: 2:00 PM</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <div className="mt-1 text-xs text-gray-500">2 unread</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="team" className="mb-6">
        <TabsList>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-md border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16">
                        <div className="text-lg font-medium">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </Avatar>
                      <h4 className="mt-2 font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.role}</p>
                      <Badge className="mt-2">{member.department}</Badge>
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Message</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Active Tasks</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-4 w-4 rounded-full ${
                          task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <div>
                        <h4 className="font-medium">{task.name}</h4>
                        <div className="mt-1 text-xs text-gray-500">
                          <span>Assigned to: {task.assignee}</span>
                          <span className="mx-2">•</span>
                          <span>Due: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                <div className="flex justify-center">
                  <Button variant="outline" size="sm">
                    View All Tasks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Todays Schedule</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Add Event
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-col items-center justify-center rounded-md bg-blue-100 text-blue-800">
                        <span className="text-xs font-medium">MAR</span>
                        <span className="text-sm font-bold">
                          {event.date.split(" ")[1]}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="mt-1 text-xs text-gray-500">
                          <span>{event.time}</span>
                          <span className="mx-2">•</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="mt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="rounded-md border border-gray-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <div>
                            {announcement.from
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{announcement.title}</h4>
                          <p className="mt-1 text-sm text-gray-700">
                            {announcement.content}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {announcement.date}
                            </span>
                            {announcement.unread && (
                              <Badge className="bg-red-100 text-red-800">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full rounded-md border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Communication metrics chart
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Engineering</span>
                    <span>42 messages</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Project Management</span>
                    <span>36 messages</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Administration</span>
                    <span>28 messages</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Finance</span>
                    <span>15 messages</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const teamMembers = [
  {
    id: 1,
    name: "Andargachew Mekonen",
    role: "Senior Engineer",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Eyob Tesfaye",
    role: "Project Manager",
    department: "Project Management",
  },
  {
    id: 3,
    name: "Selam Bekele",
    role: "Architect",
    department: "Engineering",
  },
  {
    id: 4,
    name: "Dawit Kebede",
    role: "Site Supervisor",
    department: "Engineering",
  },
  {
    id: 5,
    name: "Hiwot Girma",
    role: "Administrative Assistant",
    department: "Administration",
  },
  {
    id: 6,
    name: "Yonas Tadesse",
    role: "Financial Analyst",
    department: "Finance",
  },
  {
    id: 7,
    name: "Tigist Haile",
    role: "HR Manager",
    department: "Administration",
  },
  {
    id: 8,
    name: "Abebe Kebede",
    role: "Junior Engineer",
    department: "Engineering",
  },
];

const tasks = [
  {
    id: 1,
    name: "Prepare monthly financial report",
    assignee: "Yonas T.",
    dueDate: "Mar 15, 2024",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    name: "Update employee handbook",
    assignee: "Tigist H.",
    dueDate: "Mar 20, 2024",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    name: "Organize team building event",
    assignee: "Hiwot G.",
    dueDate: "Mar 25, 2024",
    priority: "Low",
    status: "In Progress",
  },
  {
    id: 4,
    name: "Review project proposals",
    assignee: "Eyob T.",
    dueDate: "Mar 16, 2024",
    priority: "High",
    status: "Pending",
  },
  {
    id: 5,
    name: "Prepare client presentation",
    assignee: "Selam B.",
    dueDate: "Mar 14, 2024",
    priority: "High",
    status: "Completed",
  },
];

const events = [
  {
    id: 1,
    title: "Weekly Team Meeting",
    date: "Mar 14",
    time: "10:00 AM - 11:30 AM",
    location: "Conference Room A",
    type: "Meeting",
  },
  {
    id: 2,
    title: "Client Presentation Prep",
    date: "Mar 14",
    time: "2:00 PM - 3:00 PM",
    location: "Meeting Room B",
    type: "Work Session",
  },
  {
    id: 3,
    title: "Project Status Review",
    date: "Mar 14",
    time: "4:00 PM - 5:00 PM",
    location: "Conference Room A",
    type: "Meeting",
  },
];

const announcements = [
  {
    id: 1,
    title: "Office Closure Notice",
    content:
      "The office will be closed on March 28th for building maintenance. Please plan accordingly.",
    from: "Tigist Haile",
    date: "Mar 12, 2024",
    unread: true,
  },
  {
    id: 2,
    title: "New Project Opportunity",
    content:
      "We have been invited to bid on a new government infrastructure project. Details will be shared in tomorrow's meeting.",
    from: "Eyob Tesfaye",
    date: "Mar 10, 2024",
    unread: true,
  },
  {
    id: 3,
    title: "IT System Maintenance",
    content:
      "The IT department will be performing system updates this weekend. Please save all work before leaving on Friday.",
    from: "Hiwot Girma",
    date: "Mar 08, 2024",
    unread: false,
  },
];
