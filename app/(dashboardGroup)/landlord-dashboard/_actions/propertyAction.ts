"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export type PropertyActionState = { success: boolean; message: string } | null;

const buildPropertyPayload = (formData: FormData) => {
  const thumbnail = formData.get("thumbnail");
  return {
    title: formData.get("title"),
    description: formData.get("description"),
    address: formData.get("address"),
    city: formData.get("city"),
    rent: Number(formData.get("rent")),
    bedrooms: Number(formData.get("bedrooms")),
    bathrooms: Number(formData.get("bathrooms")),
    categoryId: formData.get("categoryId"),
    ...(thumbnail ? { thumbnail } : {}),
  };
};

export const createPropertyAction = async (
  prevState: PropertyActionState,
  formData: FormData,
) => {
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
      body: JSON.stringify(buildPropertyPayload(formData)),
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
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const payload = {
    ...buildPropertyPayload(formData),
    status: formData.get("status"),
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
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
