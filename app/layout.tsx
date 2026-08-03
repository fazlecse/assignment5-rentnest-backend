import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "./service/getMe";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} "h-full", "antialiased", "font-sans", `}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <AuthProvider user={user}>
              <Navbar />
              {children}
              <Toaster />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
