"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { NavbarProps } from "@/lib/types";
import { logout } from "@/app/service/logout";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Categories", href: "/category" },
];

const dashboardHrefByRole: Record<string, string> = {
  ADMIN: "/admin-dashboard",
  LANDLORD: "/landlord-dashboard",
  TENANT: "/dashboard",
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const role = user.data?.profile.role;
  const dashboardHref = dashboardHrefByRole[role ?? ""] ?? "/dashboard";

  const handleLogout = async () => {
    await logout();
    toast.success("User logged out successfully!");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-sm font-bold">R</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            RentNest
          </span>
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User dropdown */}
        {user.success ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="relative size-9 rounded-full p-0"
                />
              }
            >
              <Avatar className="size-9">
                <AvatarImage src="/avatar.jpg" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="sr-only">Open user menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                      {user.data?.profile.name || "Name"}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {user.data?.profile.email || "Email"}
                    </span>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem render={<Link href={dashboardHref} />}>
                  <LayoutDashboard data-icon="inline-start" />
                  Dashboard
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut data-icon="inline-start" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/login"}>
            <Button className="cursor-pointer">Login</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
