"use client";

import { DocumentTable } from "@/components/document-table";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const QuarterlyPage = () => {
  const project = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const quarterlyReports =
    project?.reports.filter((report) => {
      return report.reportType === "quarterly";
    }) || [];
  return (
    <div>
      {" "}
      <DocumentTable
        projectName={project?.projectName}
        documents={quarterlyReports}
        title="Quarterly Reports"
      />
    </div>
  );
};

export default QuarterlyPage;
