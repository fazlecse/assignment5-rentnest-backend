"use server";

import { cookies } from "next/headers";
import { rentalRequestSchema } from "@/lib/validations/rental.schema";
import { formatZodErrors } from "@/lib/validations/formatZodErrors";

export type RentalFormValues = { startDate: string; months: string };

type RequestRentalState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  values?: RentalFormValues;
} | null;

export const requestRentalAction = async (
  prevState: RequestRentalState,
  formData: FormData,
) => {
  const values: RentalFormValues = {
    startDate: (formData.get("startDate") as string) ?? "",
    months: (formData.get("months") as string) ?? "",
  };

  const parsed = rentalRequestSchema.safeParse({
    propertyId: formData.get("propertyId"),
    startDate: formData.get("startDate"),
    months: Number(formData.get("months")),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: formatZodErrors(parsed.error),
      values,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(parsed.data),
  });
  const result = await res.json();

  return {
    success: !!result.success,
    message: result.message || "Something went wrong",
    values,
  };
};
