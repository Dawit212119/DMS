"use client";

import { DocumentTable } from "@/components/document-table";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const AnnuallyPage = () => {
  const project = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const annualReports =
    project?.reports.filter((report) => {
      return report.reportType === "annually";
    }) || [];

  return (
    <div>
      <DocumentTable
        projectName={project?.projectName}
        documents={annualReports}
        title="Annually Reports"
      />
    </div>
  );
};

export default AnnuallyPage;
