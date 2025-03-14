import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";

export default function SiteVisitReport() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Site visit report
        </h2>
        <div className="mt-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-gray-100 text-gray-700"
          >
            You
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="rounded-lg bg-blue-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-blue-800">
                  AM
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-800">
                    {report.title}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="mt-2 pl-12 text-xs text-gray-500">
              Andargachew Mekonen, {report.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const reports = [
  {
    id: 1,
    title: "Site+Visit+Report+for+CRYSTAL+BUSINESS...",
    date: "Dec 24, 06:21 PM",
  },
  {
    id: 2,
    title: "Site+Visit+Report+for+CHAKA+HOUSING+P...",
    date: "Jan 23, 12:44 PM",
  },
  {
    id: 3,
    title: "Site+Visit+Report+for+CHAKA+HOUSING+P...",
    date: "Jan 23, 12:44 PM",
  },
  {
    id: 4,
    title: "Site_Visit_Report_For_Kings_Tower_Apart...",
    date: "Mar 04, 09:38 AM",
  },
  {
    id: 5,
    title: "Site_Visit_Report_For_Kings_Tower_Apart...",
    date: "Mar 04, 09:38 AM",
  },
];
