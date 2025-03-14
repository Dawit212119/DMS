"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ConDigitalReport from "@/components/reports/con-digital-report";
import OvidKlingReport from "@/components/reports/ovid-kling-report";
import DailyReport from "@/components/reports/daily-report";
import WeeklyReport from "@/components/reports/weekly-report";
import MonthlyReport from "@/components/reports/monthly-report";
import SiteVisitReport from "@/components/reports/site-visit-report";
import MeetingMinutesReport from "@/components/reports/meeting-minutes-report";
import WorkOrderForm from "@/components/reports/work-order-form";
import WorkAcceptanceForm from "@/components/reports/work-acceptance-form";
import ReviewForm from "@/components/reports/review-form";

export default function ReportDashboard() {
  const [selectedGroup, setSelectedGroup] = useState("site-visit-report");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left sidebar - Groups */}
      <div className="w-[400px] border-r border-gray-200 bg-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Groups</h2>
        </div>
        <div className="space-y-1">
          {groups.map((group) => (
            <div
              key={group.id}
              className={`flex items-center justify-between px-6 py-4 hover:bg-gray-100 cursor-pointer ${
                group.id === selectedGroup ? "bg-[#a3c639] text-white" : ""
              }`}
              onClick={() => setSelectedGroup(group.id)}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <div className="text-sm text-gray-500">
                    {group.id === selectedGroup ? (
                      <span className="text-white">👤</span>
                    ) : (
                      <span>👤</span>
                    )}
                  </div>
                </Avatar>
                <span
                  className={`font-medium ${
                    group.id === selectedGroup ? "text-white" : "text-gray-700"
                  }`}
                >
                  {group.name}
                </span>
              </div>
              <Badge
                className={`rounded-full px-2 ${
                  group.id === selectedGroup
                    ? "bg-white text-[#a3c639]"
                    : "bg-red-500 text-white"
                }`}
              >
                {group.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Right content - Dynamic Report */}
      <div className="flex-1">
        {selectedGroup === "condigital" && <ConDigitalReport />}
        {selectedGroup === "ovid-kling" && <OvidKlingReport />}
        {selectedGroup === "daily-report" && <DailyReport />}
        {selectedGroup === "weekly-plan" && <WeeklyReport />}
        {selectedGroup === "monthly-plan" && <MonthlyReport />}
        {selectedGroup === "site-visit-report" && <SiteVisitReport />}
        {selectedGroup === "minutes" && <MeetingMinutesReport />}
        {selectedGroup === "work-order" && <WorkOrderForm />}
        {selectedGroup === "work-acceptance" && <WorkAcceptanceForm />}
        {selectedGroup === "review" && <ReviewForm />}
      </div>
    </div>
  );
}

const groups = [
  { id: "condigital", name: "ConDigital", count: 9 },
  { id: "ovid-kling", name: "Ovid-Kling Consult (Office Group)", count: 9 },
  { id: "daily-report", name: "Daily Report and Plan", count: 4 },
  { id: "weekly-plan", name: "weekly plan and report", count: 21 },
  { id: "monthly-plan", name: "Monthly plan and report", count: 25 },
  { id: "site-visit-report", name: "Site visit report", count: 9 },
  { id: "minutes", name: "Minutes of meeting", count: 9 },
  { id: "work-order", name: "Work order form", count: 0 },
  { id: "work-acceptance", name: "Work acceptance form", count: 0 },
  { id: "review", name: "Review and evaluation form", count: 0 },
];
