import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Download,
  FileText,
  Filter,
  Layers,
  PieChart,
  Plus,
  Search,
  Share2,
  Users,
} from "lucide-react";

export default function ConDigitalReport() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">ConDigital</h2>
          <p className="text-sm text-gray-500">
            Digital construction management platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
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
            New Project
          </Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Layers className="h-4 w-4 text-blue-500" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <div className="mt-1 text-xs text-gray-500">4 high priority</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Users className="h-4 w-4 text-green-500" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <div className="mt-1 text-xs text-gray-500">8 teams</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <FileText className="h-4 w-4 text-purple-500" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <div className="mt-1 text-xs text-gray-500">32 pending review</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="mb-6">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-md border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{project.name}</h3>
                          <Badge
                            className={
                              project.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : project.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {project.priority}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {project.description}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{project.team} team members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            <span>{project.documents} documents</span>
                          </div>
                          <div>
                            <span>Due: {project.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          project.status === "On Track"
                            ? "bg-green-100 text-green-800"
                            : project.status === "At Risk"
                            ? "bg-yellow-100 text-yellow-800"
                            : project.status === "Delayed"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {project.status}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full rounded-md border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Project status distribution chart
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>On Track (5)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span>At Risk (3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>Delayed (2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>Completed (2)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full rounded-md border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Resource allocation chart
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Kings Tower Apartments</span>
                    <span>8 team members</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CHAKA Housing Project</span>
                    <span>6 team members</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CRYSTAL BUSINESS</span>
                    <span>5 team members</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Metro Office Complex</span>
                    <span>5 team members</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Documents</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <div className="mt-1 text-xs text-gray-500">
                          <span>Project: {doc.project}</span>
                          <span className="mx-2">•</span>
                          <span>Uploaded: {doc.uploadDate}</span>
                          <span className="mx-2">•</span>
                          <span>By: {doc.uploadedBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <div
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          doc.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : doc.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {doc.status}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button variant="outline" size="sm">
                    View All Documents
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const projects = [
  {
    id: 1,
    name: "Kings Tower Apartments",
    description: "Luxury residential tower with 120 units and amenities",
    priority: "High",
    team: 8,
    documents: 32,
    dueDate: "Jun 15, 2024",
    status: "On Track",
  },
  {
    id: 2,
    name: "CHAKA Housing Project",
    description: "Affordable housing development with 200 units",
    priority: "High",
    team: 6,
    documents: 28,
    dueDate: "Apr 30, 2024",
    status: "At Risk",
  },
  {
    id: 3,
    name: "CRYSTAL BUSINESS Tower",
    description: "Commercial office building with retail space",
    priority: "Medium",
    team: 5,
    documents: 24,
    dueDate: "Mar 20, 2024",
    status: "On Track",
  },
  {
    id: 4,
    name: "Metro Office Complex",
    description: "Modern office complex with sustainable design",
    priority: "Medium",
    team: 5,
    documents: 18,
    dueDate: "Aug 22, 2024",
    status: "On Track",
  },
];

const documents = [
  {
    id: 1,
    name: "Kings_Tower_Foundation_Plans.pdf",
    project: "Kings Tower Apartments",
    uploadDate: "Mar 10, 2024",
    uploadedBy: "Andargachew M.",
    status: "Approved",
  },
  {
    id: 2,
    name: "CHAKA_Housing_Material_Specs.docx",
    project: "CHAKA Housing Project",
    uploadDate: "Mar 08, 2024",
    uploadedBy: "Eyob T.",
    status: "Pending",
  },
  {
    id: 3,
    name: "CRYSTAL_BUSINESS_Final_Inspection.pdf",
    project: "CRYSTAL BUSINESS Tower",
    uploadDate: "Mar 05, 2024",
    uploadedBy: "Selam B.",
    status: "Approved",
  },
  {
    id: 4,
    name: "Metro_Office_Design_Revisions.pdf",
    project: "Metro Office Complex",
    uploadDate: "Mar 03, 2024",
    uploadedBy: "Dawit K.",
    status: "Review",
  },
];
