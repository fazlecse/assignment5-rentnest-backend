"use server";
import { cookies } from "next/headers";

export const getAdminRentals = async (query?: {
  status?: string;
  page?: string;
  limit?: string;
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  const params = new URLSearchParams();
  if (query?.status) params.set("status", query.status);
  params.set("page", query?.page ?? "1");
  params.set("limit", query?.limit ?? "10");

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/rentals?${params.toString()}`,
    {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    },
  );

  return res.json();
};
