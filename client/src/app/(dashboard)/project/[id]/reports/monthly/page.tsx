"use client";

import { DocumentTable } from "@/components/document-table";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const MonthlyPage = () => {
  const project = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const monthlyReports =
    project?.reports.filter((report) => {
      return report.reportType === "monthly";
    }) || [];
  return (
    <div>
      <DocumentTable
        projectName={project?.projectName}
        documents={monthlyReports}
        title="Monthly Reports"
      />
    </div>
  );
};

export default MonthlyPage;
