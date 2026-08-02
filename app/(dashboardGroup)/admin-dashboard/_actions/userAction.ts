"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateUserStatusAction = async (
  userId: string,
  status: "ACTIVE" | "BLOCKED",
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status }),
    },
  );
  const result = await res.json();

  if (result.success) {
    revalidatePath("/admin-dashboard/users");
  }

  return {
    success: !!result.success,
    message: result.message || "Failed to update user status",
  };
};
