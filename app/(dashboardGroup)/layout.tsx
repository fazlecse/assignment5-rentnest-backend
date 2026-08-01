import { Navbar } from "@/components/shared/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { getMe } from "@/service/getMe";
import React from "react";
import { redirect } from "next/navigation";
import { getMe } from "../service/getMe";
import DashboardSidebar from "./_components/DashboardSidebar";


const DashboardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const user = await getMe();

  if (!user.success) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <SidebarProvider>
        <div className="flex flex-1">
          <DashboardSidebar user={user} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
