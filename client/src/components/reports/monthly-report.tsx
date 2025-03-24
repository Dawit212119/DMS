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
  BarChart,
  Calendar,
  Download,
  Filter,
  PieChart,
  Share2,
  TrendingUp,
} from "lucide-react";

export default function MonthlyReport() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Monthly plan and report
          </h2>
          <p className="text-sm text-gray-500">
            Monthly performance overview and analytics
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
        <Select defaultValue="march">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="january">January 2024</SelectItem>
            <SelectItem value="february">February 2024</SelectItem>
            <SelectItem value="march">March 2024</SelectItem>
            <SelectItem value="april">April 2024</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm">Mar 1 - Mar 31, 2024</span>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Monthly Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <BarChart className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Monthly performance chart would appear here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Projects Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <div className="mt-1 flex items-center text-sm text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+2 from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Budget Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <div className="mt-1 text-sm text-gray-600">
              $245,000 of $280,000
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Team Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <div className="mt-1 flex items-center text-sm text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+5% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="mb-6">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full rounded-md border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Project status chart would appear here
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Completed (4)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>In Progress (7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span>Delayed (2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                    <span>Not Started (3)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keyProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                    >
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <div className="mt-1 text-xs text-gray-500">
                          <span>{project.client}</span>
                          <span className="mx-2">•</span>
                          <span>{project.deadline}</span>
                        </div>
                      </div>
                      <div
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : project.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : project.status === "Delayed"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Resource allocation chart would appear here
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Resource Highlights:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
                    <span>
                      Engineering team utilization at 94% - highest performing
                      team this month
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
                    <span>
                      Equipment utilization improved by 12% compared to February
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
                    <span>Material wastage reduced to 3.2% (target: 5%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
                    <span>
                      Two new heavy equipment units added to the resource pool
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Financial overview chart would appear here
                  </p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-md bg-green-50 p-4">
                  <h4 className="font-medium text-green-800">Revenue</h4>
                  <p className="mt-1 text-sm text-green-700">$320,000</p>
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>+8% from last month</span>
                  </div>
                </div>
                <div className="rounded-md bg-red-50 p-4">
                  <h4 className="font-medium text-red-800">Expenses</h4>
                  <p className="mt-1 text-sm text-red-700">$245,000</p>
                  <div className="mt-2 flex items-center text-xs text-red-600">
                    <span>87% of monthly budget</span>
                  </div>
                </div>
                <div className="rounded-md bg-blue-50 p-4">
                  <h4 className="font-medium text-blue-800">Profit Margin</h4>
                  <p className="mt-1 text-sm text-blue-700">23.4%</p>
                  <div className="mt-2 flex items-center text-xs text-blue-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>+2.1% from last month</span>
                  </div>
                </div>
                <div className="rounded-md bg-purple-50 p-4">
                  <h4 className="font-medium text-purple-800">Cash Flow</h4>
                  <p className="mt-1 text-sm text-purple-700">$75,000</p>
                  <div className="mt-2 flex items-center text-xs text-purple-600">
                    <span>Positive cash flow maintained</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <h3 className="mb-4 text-lg font-semibold">Monthly Highlights</h3>
        <Card>
          <CardContent className="p-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-green-500"></div>
                <span>
                  Successfully completed the CRYSTAL BUSINESS project ahead of
                  schedule, resulting in client bonus payment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-green-500"></div>
                <span>
                  Kings Tower Apartments foundation work completed with quality
                  inspection passed at 98% rating.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500"></div>
                <span>
                  CHAKA Housing Project experiencing minor delays due to
                  material supply issues, recovery plan in place.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-green-500"></div>
                <span>
                  Secured two new project contracts worth $1.2M combined,
                  starting next month.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const keyProjects = [
  {
    id: 1,
    name: "CRYSTAL BUSINESS Tower",
    client: "Crystal Enterprises",
    deadline: "Completed Mar 10",
    status: "Completed",
  },
  {
    id: 2,
    name: "Kings Tower Apartments",
    client: "Royal Development",
    deadline: "Due Jun 15",
    status: "In Progress",
  },
  {
    id: 3,
    name: "CHAKA Housing Project Phase 1",
    client: "CHAKA Housing Authority",
    deadline: "Due Apr 30",
    status: "Delayed",
  },
  {
    id: 4,
    name: "Metro Office Complex",
    client: "Metro Investments",
    deadline: "Due Aug 22",
    status: "In Progress",
  },
];
