import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SidebarProvider>
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
