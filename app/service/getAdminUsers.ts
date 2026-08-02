"use server";
import { cookies } from "next/headers";

export const getAdminUsers = async (query?: {
  role?: string;
  status?: string;
  searchTerm?: string;
  page?: string;
  limit?: string;
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  const params = new URLSearchParams();
  if (query?.role) params.set("role", query.role);
  if (query?.status) params.set("status", query.status);
  if (query?.searchTerm) params.set("searchTerm", query.searchTerm);
  params.set("page", query?.page ?? "1");
  params.set("limit", query?.limit ?? "10");

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users?${params.toString()}`,
    {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    },
  );

  return res.json();
};
