"use server";

import { cookies } from "next/headers";

type RequestRentalState = {
  success: boolean;
  message: string;
} | null;

export const requestRentalAction = async (
  prevState: RequestRentalState,
  formData: FormData,
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const payload = {
    propertyId: formData.get("propertyId"),
    startDate: formData.get("startDate"),
    months: Number(formData.get("months")),
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();

  return {
    success: !!result.success,
    message: result.message || "Something went wrong",
  };
};
