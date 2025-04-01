import { Document, DocumentTable } from "@/components/document-table";

const dailyReports: Document[] = [
  {
    id: "d1",
    projectName: "Website Redesign",
    publisher: "John Smith",
    uploadDate: new Date("2023-11-15"),
    lastModified: new Date("2023-11-15"),
    status: "Approved",
    version: "v1.0",
    downloadUrl: "#",
  },
  {
    id: "d2",
    projectName: "Mobile App Development",
    publisher: "Emma Johnson",
    uploadDate: new Date("2023-11-15"),
    lastModified: new Date("2023-11-15"),
    status: "Pending",
    version: "v1.0",
    downloadUrl: "#",
  },
];

const DailyPage = () => {
  return (
    <div>
      <DocumentTable documents={dailyReports} title="Daily Reports" />
    </div>
  );
};

export default DailyPage;
