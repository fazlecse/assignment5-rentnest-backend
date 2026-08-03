"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";

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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logout } from "@/app/service/logout";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

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

export function Navbar() {
  const user = useAuth();
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

        <div className="flex items-center gap-2">
        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" />}
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>RentNest</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={<Link href={link.href} />}
                    className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {link.label}
                  </SheetClose>
                ))}
                <div className="my-2 border-t" />
                {user.success ? (
                  <>
                    <SheetClose
                      nativeButton={false}
                      render={<Link href={dashboardHref} />}
                      className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Dashboard
                    </SheetClose>
                    <SheetClose
                      onClick={handleLogout}
                      className="rounded-md px-3 py-2 text-left text-sm font-medium text-destructive transition-colors hover:bg-accent"
                    >
                      Sign out
                    </SheetClose>
                  </>
                ) : (
                  <SheetClose
                    nativeButton={false}
                    render={<Link href="/login" />}
                    className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Login
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <ThemeToggle />
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
        </div>
      </nav>
    </header>
  );
}
