"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ArrowLeftToLine, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/appSidebar";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen  w-full pt-8">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 w-full">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b  px-6 backdrop-blur-md w-full">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-black hover:bg-[#1e293b] hover:text-white" />
            </div>
            <Button
              className="bg-gradient-to-r from-[#0ea5e9] to-[#10b981] text-white hover:opacity-90 hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all"
              onClick={() => router.push("/")}
            >
              <ArrowLeftToLine className="mr-2 h-4 w-4" /> Home
            </Button>
          </header>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
