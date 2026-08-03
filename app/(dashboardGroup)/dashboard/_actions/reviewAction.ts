"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { reviewSchema } from "@/lib/validations/review.schema";
import { formatZodErrors } from "@/lib/validations/formatZodErrors";

export type ReviewFormValues = { rating: string; comment: string };

type ReviewActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  values?: ReviewFormValues;
} | null;

export const submitReviewAction = async (
  prevState: ReviewActionState,
  formData: FormData,
) => {
  const values: ReviewFormValues = {
    rating: (formData.get("rating") as string) ?? "",
    comment: (formData.get("comment") as string) ?? "",
  };

  const parsed = reviewSchema.safeParse({
    propertyId: formData.get("propertyId"),
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
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
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(parsed.data),
  });
  const result = await res.json();

  if (result.success) {
    revalidateTag(`property-${parsed.data.propertyId}`, "max");
  }

  return {
    success: !!result.success,
    message: result.message || "Failed to submit review",
    values,
  };
};
