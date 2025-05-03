"use client";

import { useState } from "react";
import { ArrowUpDown, ChevronDown, Clock } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChecklistItem, Priority, Status } from "@/state/project/projectSlice";

// Priority badge component
const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const priorityStyles = {
    high: "bg-red-100 text-red-800 hover:bg-red-100",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    low: "bg-green-100 text-green-800 hover:bg-green-100",
  };

  return (
    <Badge className={priorityStyles[priority]} variant="outline">
      {priority}
    </Badge>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: Status }) => {
  const statusStyles = {
    [Status.ONTRACK]: "bg-green-100 text-green-800 hover:bg-green-100",
    [Status.ATRISK]: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  const statusLabels = {
    [Status.ONTRACK]: "On Track",
    [Status.ATRISK]: "At Risk",
  };

  return (
    <Badge className={statusStyles[status]} variant="outline">
      {statusLabels[status]}
    </Badge>
  );
};

// Due date status component
const DueDateStatus = ({ dueDate }: { dueDate: Date | string }) => {
  const today = new Date();
  const isOverdue = dueDate < today;
  const isToday = dueDate === today.toDateString();

  if (isOverdue) {
    return (
      <div className="flex items-center text-red-600">
        <Clock className="mr-1 h-4 w-4" />
        <span>Overdue</span>
      </div>
    );
  }

  if (isToday) {
    return (
      <div className="flex items-center text-yellow-600">
        <Clock className="mr-1 h-4 w-4" />
        <span>Due Today</span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-blue-600">
      <Clock className="mr-1 h-4 w-4" />
      <span>Upcoming</span>
    </div>
  );
};

interface ProjectChecklistProps {
  projectName: string;
  items?: ChecklistItem[];
}

export default function ProjectChecklist({
  projectName,
  items = [],
}: ProjectChecklistProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<ChecklistItem[]>(items);
  console.log("typeof:", typeof data[0].dueDate);
  // Toggle task status between ONTRACK and ATRISK
  const toggleTaskStatus = (id: string) => {
    setData(
      data.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === Status.ONTRACK ? Status.ATRISK : Status.ONTRACK,
            }
          : item
      )
    );
  };

  // Calculate completion percentage (not applicable with current status enum)
  const onTrackTasks = data.filter(
    (item) => item.status === Status.ONTRACK
  ).length;
  const completionPercentage =
    data.length > 0 ? Math.round((onTrackTasks / data.length) * 100) : 0;

  // Define columns for the table
  const columns: ColumnDef<ChecklistItem>[] = [
    {
      accessorKey: "task",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Task
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("task")}</div>
      ),
    },
    {
      accessorKey: "assignedTo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Assigned To
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("assignedTo")}</div>,
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Due Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue<Date>("dueDate");
        return (
          <div className="flex flex-col">
            <div>{format(date, "MMM dd, yyyy")}</div>
            <DueDateStatus dueDate={date} />
          </div>
        );
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priority
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const priority = row.getValue<Priority>("priority");
        return <PriorityBadge priority={priority} />;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue<Status>("status");
        return <StatusBadge status={status} />;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{projectName} Checklist</h2>
          <div className="text-sm text-muted-foreground">
            {onTrackTasks} of {data.length} tasks on track
          </div>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>

      {data.length === 0 ? (
        <div className="text-center p-8 border rounded-md bg-muted/20">
          <p className="text-muted-foreground">
            No tasks found for this project.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-3">
            <Input
              placeholder="Filter tasks..."
              value={
                (table.getColumn("task")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("task")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="flex flex-wrap items-center gap-2 ml-auto">
              <Select
                value={
                  (table.getColumn("priority")?.getFilterValue() as string) ||
                  "all"
                }
                onValueChange={(value) => {
                  if (value === "all") {
                    table.getColumn("priority")?.setFilterValue(undefined);
                  } else {
                    table.getColumn("priority")?.setFilterValue([value]);
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue>
                    {table.getColumn("priority")?.getFilterValue()
                      ? `Priority: ${table
                          .getColumn("priority")
                          ?.getFilterValue()}`
                      : "Filter by priority"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={
                  (table.getColumn("status")?.getFilterValue() as string) ||
                  "all"
                }
                onValueChange={(value) => {
                  if (value === "all") {
                    table.getColumn("status")?.setFilterValue(undefined);
                  } else {
                    table.getColumn("status")?.setFilterValue([value]);
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue>
                    {table.getColumn("status")?.getFilterValue()
                      ? `Status: ${table.getColumn("status")?.getFilterValue()}`
                      : "Filter by status"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value={Status.ONTRACK}>On Track</SelectItem>
                  <SelectItem value={Status.ATRISK}>At Risk</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No tasks found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} task(s)
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
