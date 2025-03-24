import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, PlusCircle, Search } from "lucide-react";

export default function MeetingMinutesReport() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Minutes of meeting
          </h2>
          <p className="text-sm text-gray-500">
            Meeting records and action items
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search minutes..."
              className="h-9 rounded-md border border-gray-200 bg-white pl-8 pr-4 text-sm focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
          <Button
            variant="default"
            size="sm"
            className="gap-1 bg-[#a3c639] hover:bg-[#8aaa2e]"
          >
            <PlusCircle className="h-4 w-4" />
            New Meeting
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meeting Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meetings.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell className="font-medium">
                      {meeting.title}
                    </TableCell>
                    <TableCell>{meeting.date}</TableCell>
                    <TableCell>{meeting.participants}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          meeting.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : meeting.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {meeting.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latest Meeting Minutes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Weekly Project Coordination Meeting
                </h3>
                <p className="text-sm text-gray-500">
                  March 12, 2024 • 10:00 AM - 11:30 AM
                </p>
              </div>

              <div>
                <h4 className="font-medium">Attendees:</h4>
                <p className="text-sm">
                  Andargachew Mekonen, Eyob Tesfaye, Selam Bekele, Dawit Kebede,
                  Hiwot Girma
                </p>
              </div>

              <div>
                <h4 className="font-medium">Agenda:</h4>
                <ol className="ml-5 list-decimal text-sm">
                  <li>Project status updates</li>
                  <li>Resource allocation review</li>
                  <li>Timeline adjustments</li>
                  <li>Client feedback discussion</li>
                  <li>AOB</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium">Key Discussion Points:</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm">
                  <li>
                    Kings Tower Apartments foundation work completed
                    successfully
                  </li>
                  <li>
                    CHAKA Housing Project experiencing material delivery delays
                  </li>
                  <li>
                    CRYSTAL BUSINESS project handover scheduled for next week
                  </li>
                  <li>
                    New project opportunities with Metro Investments discussed
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Action Items:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                    <div>
                      <span className="font-medium">Andargachew:</span> Follow
                      up with suppliers regarding CHAKA Housing materials
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                    <div>
                      <span className="font-medium">Eyob:</span> Prepare final
                      inspection report for CRYSTAL BUSINESS
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                    <div>
                      <span className="font-medium">Selam:</span> Draft proposal
                      for Metro Investments project
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                    <div>
                      <span className="font-medium">All:</span> Submit weekly
                      reports by Friday COB
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download Full Minutes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action Items Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actionItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{item.task}</h4>
                      <div className="mt-1 text-xs text-gray-500">
                        <span>Assigned to: {item.assignee}</span>
                        <span className="mx-2">•</span>
                        <span>Due: {item.dueDate}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        From: {item.meeting}
                      </div>
                    </div>
                    <Badge
                      className={
                        item.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : item.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : item.status === "Overdue"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}

              <div className="flex justify-center">
                <Button variant="outline" size="sm">
                  View All Action Items
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const meetings = [
  {
    id: 1,
    title: "Weekly Project Coordination Meeting",
    date: "Mar 12, 2024",
    participants: "5 attendees",
    status: "Approved",
  },
  {
    id: 2,
    title: "CHAKA Housing Project Review",
    date: "Mar 08, 2024",
    participants: "4 attendees",
    status: "Approved",
  },
  {
    id: 3,
    title: "Client Meeting - Metro Investments",
    date: "Mar 05, 2024",
    participants: "3 attendees",
    status: "Draft",
  },
  {
    id: 4,
    title: "Kings Tower Technical Discussion",
    date: "Feb 28, 2024",
    participants: "6 attendees",
    status: "Approved",
  },
  {
    id: 5,
    title: "Monthly Management Review",
    date: "Feb 25, 2024",
    participants: "8 attendees",
    status: "Approved",
  },
];

const actionItems = [
  {
    id: 1,
    task: "Follow up with suppliers regarding CHAKA Housing materials",
    assignee: "Andargachew M.",
    dueDate: "Mar 15, 2024",
    meeting: "Weekly Project Coordination Meeting",
    status: "In Progress",
  },
  {
    id: 2,
    task: "Prepare final inspection report for CRYSTAL BUSINESS",
    assignee: "Eyob T.",
    dueDate: "Mar 14, 2024",
    meeting: "Weekly Project Coordination Meeting",
    status: "Completed",
  },
  {
    id: 3,
    task: "Draft proposal for Metro Investments project",
    assignee: "Selam B.",
    dueDate: "Mar 18, 2024",
    meeting: "Client Meeting - Metro Investments",
    status: "Pending",
  },
  {
    id: 4,
    task: "Review structural calculations for Kings Tower",
    assignee: "Dawit K.",
    dueDate: "Mar 10, 2024",
    meeting: "Kings Tower Technical Discussion",
    status: "Overdue",
  },
];
