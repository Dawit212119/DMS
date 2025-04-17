"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CheckSquare,
  ChevronDown,
  ClipboardList,
  Folder,
  LayoutDashboard,
  Image,
  Mail,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Define the route type
type Route = {
  name: string;
  path: string;
  icon: LucideIcon;
  children?: Omit<Route, "icon" | "children">[];
};

// Define the routes array
const routes: Route[] = [
  {
    name: "Overview",
    path: "/project",
    icon: LayoutDashboard,
  },
  {
    name: "Checklist",
    path: "/project/checklist",
    icon: CheckSquare,
  },
  {
    name: "Reports",
    path: "/project/reports",
    icon: ClipboardList,
    children: [
      {
        name: "Daily",
        path: "/project/reports/daily",
      },
      {
        name: "Weekly",
        path: "/project/reports/weekly",
      },
      {
        name: "Monthly",
        path: "/project/reports/monthly",
      },
      {
        name: "Quarterly",
        path: "/project/reports/quarterly",
      },
      {
        name: "Annually",
        path: "/project/reports/annually",
      },
    ],
  },
  {
    name: "Letters",
    path: "/project/letter",
    icon: Mail,
  },
  {
    name: "Site Images",
    path: "/project/siteImages",
    icon: Image,
  },
  {
    name: "Documents",
    path: "/project/documents",
    icon: FileText,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  console.log("the pathName is here >>>>", pathname);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "/reports": true, // Default open state for Reports
  });

  const toggleSection = (path: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <Sidebar className="border-r border-[#1a2e3d]">
      <SidebarHeader className="border-b border-[#1a2e3d] bg-gradient-to-r from-[#0f172a] to-[#0f1a25] pt-8">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#10b981] shadow-[0_0_15px_rgba(14,165,233,0.5)]">
            <Folder className="h-6 w-6 text-white" />
          </div>
          <div className="font-bold text-white text-lg tracking-tight">
            E<span className="text-[#10b981]">File</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#0f172a] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#94a3b8] font-medium px-4 pt-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <div key={route.path}>
                  {route.children ? (
                    <Collapsible
                      open={openSections[route.path] || false}
                      onOpenChange={() => toggleSection(route.path)}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={route.name}
                            className="hover:bg-[#1e293b] hover:text-white transition-colors duration-200"
                          >
                            <route.icon className="h-5 w-5 text-[#0ea5e9]" />
                            <span>{route.name}</span>
                            <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-[#94a3b8] transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarMenuItem>
                      <CollapsibleContent>
                        <SidebarMenuSub className="border-l border-[#fff] ml-4 pl-2">
                          {route.children.map((child) => (
                            <SidebarMenuSubItem key={child.path}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === child.path}
                                className={`transition-colors duration-200 ${
                                  pathname === child.path
                                    ? "text-[#10b981] font-medium"
                                    : "text-[#94a3b8] hover:text-black"
                                }`}
                              >
                                <Link href={child.path}>
                                  <span>{child.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === route.path}
                        tooltip={route.name}
                        className={`transition-all duration-200 ${
                          pathname === route.path
                            ? "bg-gradient-to-r from-[#0ea5e9]/10 to-[#10b981]/10 text-white"
                            : "hover:bg-[#1e293b] hover:text-white"
                        }`}
                      >
                        <Link href={route.path}>
                          <route.icon
                            className={`h-5 w-5 ${
                              pathname === route.path
                                ? "text-[#10b981]"
                                : "text-[#0ea5e9]"
                            }`}
                          />
                          <span>{route.name}</span>
                          {pathname === route.path && (
                            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#0ea5e9] to-[#10b981] rounded-r-md" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-[#1a2e3d] bg-[#0f172a] p-4">
        <div className="flex items-center justify-between">
          <p className="text-center text-sm leading-loose text-green-700 md:text-left">
            © 2025 EFile. All rights reserved.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
