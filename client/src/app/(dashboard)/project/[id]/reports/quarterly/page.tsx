import { Document, DocumentTable } from "@/components/document-table";

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
const QuarterlyPage = () => {
  return (
    <div>
      <DocumentTable documents={quarterlyReports} title="Quarterly Reports" />
    </div>
  );
};

export default QuarterlyPage;
