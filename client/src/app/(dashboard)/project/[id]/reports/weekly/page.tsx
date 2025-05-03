"use client";

import { DocumentTable } from "@/components/document-table";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const WeeklyPage = () => {
  const project = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const weeklyReports =
    project?.reports.filter((report) => {
      return report.reportType === "weekly";
    }) || [];
  return (
    <div>
      {" "}
      <DocumentTable
        projectName={project?.projectName}
        documents={weeklyReports}
        title="Weekly Reports"
      />{" "}
    </div>
  );
};

export default WeeklyPage;
