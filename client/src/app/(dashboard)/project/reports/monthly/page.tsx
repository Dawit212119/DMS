import { Document, DocumentTable } from "@/components/document-table";

const monthlyReports: Document[] = [
  {
    id: "m1",
    projectName: "Website Redesign",
    publisher: "Michael Brown",
    uploadDate: new Date("2023-11-01"),
    lastModified: new Date("2023-11-02"),
    status: "Approved",
    version: "v3.0",
    downloadUrl: "#",
  },
  {
    id: "m2",
    projectName: "Mobile App Development",
    publisher: "Sarah Davis",
    uploadDate: new Date("2023-10-01"),
    lastModified: new Date("2023-10-15"),
    status: "Pending",
    version: "v2.0",
    downloadUrl: "#",
  },
];

const quarterlyReports: Document[] = [
  {
    id: "q1",
    projectName: "Website Redesign",
    publisher: "David Wilson",
    uploadDate: new Date("2023-10-15"),
    lastModified: new Date("2023-10-20"),
    status: "Approved",
    version: "v4.0",
    downloadUrl: "#",
  },
  {
    id: "q2",
    projectName: "Mobile App Development",
    publisher: "Lisa Anderson",
    uploadDate: new Date("2023-07-10"),
    lastModified: new Date("2023-07-15"),
    status: "Approved",
    version: "v3.5",
    downloadUrl: "#",
  },
];

const MonthlyPage = () => {
  return (
    <div>
      {" "}
      <DocumentTable documents={monthlyReports} title="Monthly Reports" />
    </div>
  );
};

export default MonthlyPage;
