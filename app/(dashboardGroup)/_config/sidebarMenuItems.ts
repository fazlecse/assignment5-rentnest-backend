import { LayoutDashboard } from "lucide-react";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";
import { AUTHOR_SIDEBAR_ITEMS } from "./authorSidebarItems";
import { ISidebarItem } from "@/lib/types";

const USER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
];

export const sidebarMenuItems = {
  USER: USER_SIDEBAR_ITEMS,
  AUTHOR: AUTHOR_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
