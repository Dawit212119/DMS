import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Filter,
  PlusCircle,
} from "lucide-react";

export default function DailyReport() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Daily Report and Plan
          </h2>
          <p className="text-sm text-gray-500">Todays activities and tasks</p>
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
          <Button
            variant="default"
            size="sm"
            className="gap-1 bg-[#a3c639] hover:bg-[#8aaa2e]"
          >
            <PlusCircle className="h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 w-fit">
        <Calendar className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium">Today: March 14, 2024</span>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Todays Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-green-600">8</span> completed
              </div>
            </div>
            <Progress value={67} className="mt-2 h-2" />
            <div className="mt-1 text-xs text-gray-500">
              67% completion rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Hours Worked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">6.5</div>
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Out of 8 hours target
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2</div>
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">Achieved today</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="mb-6">
        <TabsList>
          <TabsTrigger value="today">Todays Tasks</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrows Plan</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-4 space-y-4">
          {dailyTasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          task.status === "Completed"
                            ? "bg-green-500"
                            : task.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <h3 className="font-medium">{task.name}</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {task.description}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-xs text-gray-500">
                        Project: {task.project}
                      </span>
                      <span className="text-xs text-gray-500">
                        Time: {task.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`text-sm ${
                        task.status === "Completed"
                          ? "text-green-600"
                          : task.status === "In Progress"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {task.status}
                    </span>
                    {task.status === "Completed" && (
                      <span className="mt-1 text-xs text-gray-500">
                        Completed at {task.completedAt}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tomorrow" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">Tomorrows Plan</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
                  <span>Complete site inspection at CHAKA Housing Project</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
                  <span>
                    Meeting with contractors for Kings Tower Apartments
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
                  <span>
                    Prepare weekly progress report for client presentation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
                  <span>Review and approve material requisitions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">Issues & Blockers</h3>
              <div className="space-y-4">
                <div className="rounded-md bg-red-50 p-3">
                  <h4 className="font-medium text-red-800">
                    Material Delivery Delay
                  </h4>
                  <p className="mt-1 text-sm text-red-700">
                    Cement delivery for CHAKA Housing Project delayed by
                    supplier. Expected to arrive tomorrow.
                  </p>
                </div>
                <div className="rounded-md bg-yellow-50 p-3">
                  <h4 className="font-medium text-yellow-800">
                    Pending Approval
                  </h4>
                  <p className="mt-1 text-sm text-yellow-700">
                    Waiting for client approval on design changes for the
                    CRYSTAL BUSINESS project.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <h3 className="mb-4 text-lg font-semibold">Notes & Observations</h3>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-700">
              The construction team at Kings Tower Apartments is making good
              progress despite the rain earlier this week. The foundation work
              is completed according to specifications, and were ready to move
              to the next phase. Need to follow up with the procurement team
              about the delayed materials for the CHAKA Housing Project.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const dailyTasks = [
  {
    id: 1,
    name: "Site inspection at Kings Tower",
    description: "Conducted structural inspection of foundation work",
    project: "Kings Tower Apartments",
    time: "09:00 - 11:30 AM",
    status: "Completed",
    completedAt: "11:25 AM",
  },
  {
    id: 2,
    name: "Team coordination meeting",
    description: "Weekly sync with project managers and site engineers",
    project: "All Projects",
    time: "01:00 - 02:00 PM",
    status: "Completed",
    completedAt: "02:15 PM",
  },
  {
    id: 3,
    name: "Material requisition review",
    description: "Review and approve material requests for CHAKA Housing",
    project: "CHAKA Housing Project",
    time: "02:30 - 03:30 PM",
    status: "In Progress",
  },
  {
    id: 4,
    name: "Client call with CRYSTAL BUSINESS",
    description: "Update call on project timeline and milestones",
    project: "CRYSTAL BUSINESS",
    time: "04:00 - 04:30 PM",
    status: "Pending",
  },
];
