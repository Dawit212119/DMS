import { Document, DocumentTable } from "@/components/document-table";

const annualReports: Document[] = [
  {
    id: "a1",
    projectName: "Website Redesign",
    publisher: "Robert Taylor",
    uploadDate: new Date("2023-01-15"),
    lastModified: new Date("2023-02-01"),
    status: "Approved",
    version: "v5.0",
    downloadUrl: "#",
  },
  {
    id: "a2",
    projectName: "Mobile App Development",
    publisher: "Jennifer White",
    uploadDate: new Date("2023-01-10"),
    lastModified: new Date("2023-01-20"),
    status: "Approved",
    version: "v4.0",
    downloadUrl: "#",
  },
];

const AnnuallyPage = () => {
  return (
    <div>
      <DocumentTable documents={annualReports} title="Annual Reports" />
    </div>
  );
};

export default AnnuallyPage;
