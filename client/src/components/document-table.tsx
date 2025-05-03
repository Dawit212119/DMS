"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  Download,
  ChevronDown,
  Share2,
  QrCode,
} from "lucide-react";
import { format } from "date-fns";
import QRCode from "qrcode";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Report as Document } from "@/state/project/projectSlice";

// Status badge component with appropriate colors
const StatusBadge = ({ status }: { status: Document["status"] }) => {
  const statusStyles = {
    approved: "bg-green-100 text-green-800 hover:bg-green-100",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <Badge className={statusStyles[status]} variant="outline">
      {status}
    </Badge>
  );
};

// Define props for the DocumentTable component
interface DocumentTableProps {
  documents?: Document[];
  title?: string;
  projectName?: string | null;
}

export function DocumentTable({
  documents = [],
  title = "Documents",
  projectName = "project name",
}: DocumentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // Function to generate QR code
  const generateQRCode = async (document: Document) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(document.fileUrl);
      setQrCodeUrl(qrCodeDataUrl);
      setCurrentDocument(document);
      setQrModalOpen(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  // Function to download QR code
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qrcode-${
      projectName?.replace(/\s+/g, "-").toLowerCase() || "document"
    }.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to share QR code
  const shareQRCode = async () => {
    if (!qrCodeUrl || !currentDocument) return;

    if (navigator.share) {
      try {
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        const file = new File([blob], `qrcode-${projectName}.png`, {
          type: "image/png",
        });

        await navigator.share({
          title: `QR Code for ${projectName}`,
          text: "Scan this QR code to access the document",
          files: [file],
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert(
        "Sharing is not supported in your browser. You can download the QR code instead."
      );
    }
  };

  // Define columns for the table
  const columns: ColumnDef<Document, any>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "publisher",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Publisher
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("publisher")}</div>,
    },
    {
      accessorKey: "uploadedDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Upload Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue<Date>("uploadedDate");
        return <div>{format(date, "MMM dd, yyyy")}</div>;
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
        const status = row.getValue<Document["status"]>("status");
        return <StatusBadge status={status} />;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "version",
      header: "Version",
      cell: ({ row }) => <div>{row.getValue("version")}</div>,
    },
    {
      id: "qrCode",
      header: "QR Code",
      cell: ({ row }) => {
        const document = row.original;
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => generateQRCode(document)}
            className="flex items-center gap-1"
          >
            <QrCode className="h-4 w-4" />
            <span className="hidden sm:inline">QR Code</span>
          </Button>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const document = row.original;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(document.fileUrl, "_blank")}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: documents,
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
  console.log(table.getRowModel().rows);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-3">
        <Input
          placeholder="Filter documents..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-2 ml-auto">
          <Select
            value={
              (table.getColumn("status")?.getFilterValue() as string) || "all"
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
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
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
                      {column.id === "actions" ? "Download" : column.id}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} document(s)
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
      {/* QR Code Modal */}
      <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code for {projectName}</DialogTitle>
            <DialogDescription>
              Scan this QR code to access the document
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            {qrCodeUrl && (
              <div className="border p-4 rounded-lg bg-white">
                <Image
                  src={qrCodeUrl || "/placeholder.svg"}
                  alt="QR Code"
                  width={256}
                  height={256}
                  className="w-64 h-64"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={shareQRCode} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              onClick={downloadQRCode}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
