"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { IUser } from "@/lib/types";

const AuthContext = createContext<IUser | null>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: IUser;
  children: ReactNode;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
