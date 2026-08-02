import { ISidebarItem } from "@/lib/types";
import { Building2, ClipboardList, LayoutDashboard, Users } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Admin Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    label: "Properties",
    href: "/admin-dashboard/properties",
    icon: Building2,
  },
  {
    label: "Requests",
    href: "/admin-dashboard/requests",
    icon: ClipboardList,
  },
];
