"use client";

import { DocumentTable } from "@/components/document-table";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const DailyPage = () => {
  const project = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const dailyReports =
    project?.reports.filter((report) => {
      return report.reportType === "daily";
    }) || [];

  return (
    <div>
      <DocumentTable
        projectName={project?.projectName}
        documents={dailyReports}
        title="Daily Reports"
      />
    </div>
  );
};

export default DailyPage;
