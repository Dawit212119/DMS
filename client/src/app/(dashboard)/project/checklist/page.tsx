import ProjectChecklist, { ChecklistItem } from "./checklistTable";

// Sample data for a single project
const annualReportTasks: ChecklistItem[] = [
  {
    id: "1",
    task: "Review Q3 Financial Report",
    assignedTo: "John Smith",
    dueDate: new Date("2023-11-20"),
    priority: "High",
    completed: false,
  },
  {
    id: "2",
    task: "Collect Q4 Financial Data",
    assignedTo: "Emma Johnson",
    dueDate: new Date("2023-11-15"),
    priority: "Medium",
    completed: true,
  },
  {
    id: "3",
    task: "Update Executive Summary",
    assignedTo: "Michael Brown",
    dueDate: new Date("2023-11-10"),
    priority: "High",
    completed: false,
  },
  {
    id: "4",
    task: "Prepare Shareholder Presentation",
    assignedTo: "Sarah Davis",
    dueDate: new Date("2023-11-05"),
    priority: "Medium",
    completed: true,
  },
  {
    id: "5",
    task: "Finalize Annual Budget Forecast",
    assignedTo: "David Wilson",
    dueDate: new Date("2023-11-30"),
    priority: "Low",
    completed: false,
  },
  {
    id: "6",
    task: "Review Compliance Documentation",
    assignedTo: "Lisa Anderson",
    dueDate: new Date("2023-11-16"),
    priority: "Medium",
    completed: false,
  },
  {
    id: "7",
    task: "Update Risk Assessment Section",
    assignedTo: "Robert Taylor",
    dueDate: new Date("2023-11-18"),
    priority: "Medium",
    completed: true,
  },
  {
    id: "8",
    task: "Prepare Annual Budget Forecast",
    assignedTo: "Jennifer White",
    dueDate: new Date("2023-12-15"),
    priority: "High",
    completed: false,
  },
  {
    id: "9",
    task: "Collect Department Performance Metrics",
    assignedTo: "John Smith",
    dueDate: new Date("2023-11-16"),
    priority: "Low",
    completed: true,
  },
  {
    id: "10",
    task: "Review Monthly Expense Reports",
    assignedTo: "Emma Johnson",
    dueDate: new Date("2023-11-25"),
    priority: "Medium",
    completed: false,
  },
];

export default function ProjectChecklistPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Project Management</h1>
      <p className="text-muted-foreground mb-8">
        Track the status of tasks for the Annual Financial Report project.
      </p>

      <div className="p-6 border rounded-lg bg-card mb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Project Manager
            </h3>
            <p className="text-lg font-medium">John Smith</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Start Date
            </h3>
            <p className="text-lg font-medium">Oct 1, 2023</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Due Date
            </h3>
            <p className="text-lg font-medium">Dec 31, 2023</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Status
            </h3>
            <p className="text-lg font-medium">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                In Progress
              </span>
            </p>
          </div>
        </div>
      </div>

      <ProjectChecklist
        projectName="Annual Financial Report"
        items={annualReportTasks}
      />
    </main>
  );
}
