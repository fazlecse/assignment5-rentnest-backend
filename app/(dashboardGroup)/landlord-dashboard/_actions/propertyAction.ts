"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import {
  propertySchema,
  updatePropertySchema,
} from "@/lib/validations/property.schema";
import { formatZodErrors } from "@/lib/validations/formatZodErrors";

export type PropertyActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
} | null;

const buildPropertyPayload = (formData: FormData) => ({
  title: formData.get("title"),
  description: formData.get("description"),
  address: formData.get("address"),
  city: formData.get("city"),
  rent: Number(formData.get("rent")),
  bedrooms: Number(formData.get("bedrooms")),
  bathrooms: Number(formData.get("bathrooms")),
  categoryId: formData.get("categoryId"),
  thumbnail: formData.get("thumbnail"),
});

export const createPropertyAction = async (
  prevState: PropertyActionState,
  formData: FormData,
) => {
  const parsed = propertySchema.safeParse(buildPropertyPayload(formData));
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: formatZodErrors(parsed.error),
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(parsed.data),
    },
  );
  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Failed to create property",
    };
  }

  revalidateTag("property-list", "max");
  redirect("/landlord-dashboard/properties");
};

export const updatePropertyAction = async (
  propertyId: string,
  prevState: PropertyActionState,
  formData: FormData,
) => {
  const parsed = updatePropertySchema.safeParse({
    ...buildPropertyPayload(formData),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: formatZodErrors(parsed.error),
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(parsed.data),
    },
  );
  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Failed to update property",
    };
  }

  revalidateTag("property-list", "max");
  revalidateTag(`property-${propertyId}`, "max");
  redirect("/landlord-dashboard/properties");
};

export const deletePropertyAction = async (propertyId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
    {
      method: "DELETE",
      headers: { Cookie: `accessToken=${accessToken}` },
    },
  );
  const result = await res.json();

  if (result.success) {
    revalidateTag("property-list", "max");
  }

  return {
    success: !!result.success,
    message: result.message || "Failed to delete property",
  };
};
