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
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Check, FileText, Upload } from "lucide-react";

export default function WorkAcceptanceForm() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Work acceptance form
        </h2>
        <p className="text-sm text-gray-500">
          Verify and accept completed work
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Work Acceptance</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="reference-number">Reference Number</Label>
                    <Input id="reference-number" placeholder="WA-2024-0038" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inspection-date">Inspection Date</Label>
                    <div className="flex">
                      <Input
                        id="inspection-date"
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
                    <Label htmlFor="work-order">Related Work Order</Label>
                    <Select>
                      <SelectTrigger id="work-order">
                        <SelectValue placeholder="Select work order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wo-2024-0042">
                          WO-2024-0042: Electrical System Installation
                        </SelectItem>
                        <SelectItem value="wo-2024-0041">
                          WO-2024-0041: Plumbing Repairs
                        </SelectItem>
                        <SelectItem value="wo-2024-0040">
                          WO-2024-0040: HVAC Maintenance
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work-description">Work Description</Label>
                  <Textarea
                    id="work-description"
                    placeholder="Describe the work that was performed"
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Inspection Checklist</Label>
                  <div className="space-y-2">
                    {inspectionItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-2">
                        <Checkbox id={`item-${item.id}`} />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor={`item-${item.id}`}
                            className="text-sm font-medium"
                          >
                            {item.label}
                          </Label>
                          {item.description && (
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inspector">Inspector</Label>
                  <Select>
                    <SelectTrigger id="inspector">
                      <SelectValue placeholder="Select inspector" />
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
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    placeholder="Additional comments or observations"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Attach Photos/Documents</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF (MAX. 10MB)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        multiple
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="acceptance" />
                    <Label htmlFor="acceptance" className="text-sm font-medium">
                      I confirm that the work has been completed satisfactorily
                      and meets all requirements
                    </Label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline">Reject</Button>
                  <Button
                    variant="default"
                    className="gap-1 bg-[#a3c639] hover:bg-[#8aaa2e]"
                  >
                    <Check className="h-4 w-4" />
                    Accept Work
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Acceptances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAcceptances.map((acceptance) => (
                  <div
                    key={acceptance.id}
                    className="flex items-start gap-3 rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <FileText className="mt-1 h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">{acceptance.title}</h4>
                      <div className="mt-1 text-xs text-gray-500">
                        <span>{acceptance.project}</span>
                        <span className="mx-2">•</span>
                        <span>{acceptance.date}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            acceptance.status === "Accepted"
                              ? "bg-green-100 text-green-800"
                              : acceptance.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {acceptance.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Acceptances
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acceptance Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>
                    Thoroughly inspect all aspects of the completed work
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Document any deficiencies or issues found</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Take photos as evidence of completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Verify that all specifications have been met</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>
                    Only accept work that fully meets quality standards
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const inspectionItems = [
  {
    id: 1,
    label: "Work completed according to specifications",
    description: "All work matches the requirements in the work order",
  },
  {
    id: 2,
    label: "Quality of workmanship meets standards",
    description: "Work is performed with appropriate skill and care",
  },
  {
    id: 3,
    label: "Materials used are as specified",
    description: "All materials match those listed in the work order",
  },
  {
    id: 4,
    label: "All safety requirements met",
    description: "Work area is safe and complies with safety regulations",
  },
  {
    id: 5,
    label: "Site cleaned and debris removed",
    description: "Work area has been properly cleaned after completion",
  },
  {
    id: 6,
    label: "All required testing completed",
    description: "Any necessary tests have been performed and passed",
  },
];

const recentAcceptances = [
  {
    id: 1,
    title: "HVAC Maintenance",
    project: "CRYSTAL BUSINESS Tower",
    date: "Mar 06, 2024",
    status: "Accepted",
  },
  {
    id: 2,
    title: "Concrete Foundation Work",
    project: "Kings Tower Apartments",
    date: "Mar 03, 2024",
    status: "Accepted",
  },
  {
    id: 3,
    title: "Electrical Wiring Installation",
    project: "CHAKA Housing Project",
    date: "Feb 28, 2024",
    status: "Pending",
  },
];
