"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateRequestStatusAction = async (
  requestId: string,
  status: "APPROVED" | "REJECTED",
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`,
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
    revalidatePath("/landlord-dashboard/requests");
  }

  return {
    success: !!result.success,
    message: result.message || "Failed to update request",
  };
};
