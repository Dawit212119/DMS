import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Check, FileText, Save } from "lucide-react";

export default function WorkOrderForm() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Work order form</h2>
        <p className="text-sm text-gray-500">
          Create and manage work orders for projects
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>New Work Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="order-number">Work Order Number</Label>
                    <Input id="order-number" placeholder="WO-2024-0042" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-date">Date</Label>
                    <div className="flex">
                      <Input
                        id="order-date"
                        type="date"
                        className="rounded-r-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-l-none border-l-0"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="project">Project</Label>
                    <Select>
                      <SelectTrigger id="project">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kings-tower">
                          Kings Tower Apartments
                        </SelectItem>
                        <SelectItem value="chaka-housing">
                          CHAKA Housing Project
                        </SelectItem>
                        <SelectItem value="crystal-business">
                          CRYSTAL BUSINESS Tower
                        </SelectItem>
                        <SelectItem value="metro-office">
                          Metro Office Complex
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Work Order Title</Label>
                  <Input id="title" placeholder="Enter work order title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the work to be performed"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="assigned-to">Assigned To</Label>
                    <Select>
                      <SelectTrigger id="assigned-to">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="andargachew">
                          Andargachew Mekonen
                        </SelectItem>
                        <SelectItem value="eyob">Eyob Tesfaye</SelectItem>
                        <SelectItem value="selam">Selam Bekele</SelectItem>
                        <SelectItem value="dawit">Dawit Kebede</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <div className="flex">
                      <Input
                        id="due-date"
                        type="date"
                        className="rounded-r-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-l-none border-l-0"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="materials">Materials Required</Label>
                  <Textarea
                    id="materials"
                    placeholder="List any materials needed"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special-instructions">
                    Special Instructions
                  </Label>
                  <Textarea
                    id="special-instructions"
                    placeholder="Any special instructions or considerations"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button
                    variant="default"
                    className="gap-1 bg-[#a3c639] hover:bg-[#8aaa2e]"
                  >
                    <Save className="h-4 w-4" />
                    Save Work Order
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWorkOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-start gap-3 rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <FileText className="mt-1 h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">{order.title}</h4>
                      <div className="mt-1 text-xs text-gray-500">
                        <span>{order.project}</span>
                        <span className="mx-2">•</span>
                        <span>{order.date}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </div>
                        <div
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            order.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : order.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.priority}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Work Orders
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Order Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Be specific about the work to be performed</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Include all necessary materials and equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Set realistic deadlines for completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Assign to the most qualified team member</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Include any safety considerations or requirements</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const recentWorkOrders = [
  {
    id: 1,
    title: "Electrical System Installation",
    project: "Kings Tower Apartments",
    date: "Mar 10, 2024",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    title: "Plumbing Repairs",
    project: "CHAKA Housing Project",
    date: "Mar 08, 2024",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 3,
    title: "HVAC Maintenance",
    project: "CRYSTAL BUSINESS Tower",
    date: "Mar 05, 2024",
    status: "Completed",
    priority: "Low",
  },
];
