"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const payForRentalAction = async (rentalRequestId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ rentalRequestId }),
    },
  );
  const result = await res.json();

  if (!result.success || !result.data?.checkoutUrl) {
    return { success: false, message: result.message || "Payment failed to start" };
  }

  redirect(result.data.checkoutUrl);
};
