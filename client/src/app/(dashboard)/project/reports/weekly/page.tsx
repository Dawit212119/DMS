import { Document, DocumentTable } from "@/components/document-table";

const weeklyReports: Document[] = [
  {
    id: "w1",
    projectName: "Website Redesign",
    publisher: "John Smith",
    uploadDate: new Date("2023-11-10"),
    lastModified: new Date("2023-11-12"),
    status: "Approved",
    version: "v2.1",
    downloadUrl: "#",
  },
  {
    id: "w2",
    projectName: "Mobile App Development",
    publisher: "Emma Johnson",
    uploadDate: new Date("2023-11-05"),
    lastModified: new Date("2023-11-05"),
    status: "Rejected",
    version: "v1.2",
    downloadUrl: "#",
  },
];

const WeeklyPage = () => {
  return (
    <div>
      {" "}
      <DocumentTable documents={weeklyReports} title="Weekly Reports" />{" "}
    </div>
  );
};

export default WeeklyPage;
