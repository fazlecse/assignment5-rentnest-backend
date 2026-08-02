"use server";
import { cookies } from "next/headers";
import { getMe } from "./getMe";

// The backend has no "list my own properties" endpoint for landlords, so we
// fetch the public listing once per status (it defaults to AVAILABLE-only
// otherwise) and filter down to this landlord's own properties ourselves.
export const getMyProperties = async () => {
  const me = await getMe();
  if (!me?.success) {
    return { success: false, message: "User not logged in!" };
  }
  const landlordId = me.data.profile.id;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const statuses = ["AVAILABLE", "RENTED", "UNAVAILABLE"];
  const responses = await Promise.all(
    statuses.map((status) =>
      fetch(
        `${process.env.BACKEND_API_URL}/api/properties?status=${status}&limit=100`,
        {
          headers: { Cookie: `accessToken=${accessToken}` },
          cache: "no-store",
        },
      ).then((res) => res.json()),
    ),
  );

  const properties = responses
    .flatMap((result) => (result?.success ? result.data : []))
    .filter((property) => property.landlordId === landlordId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return { success: true, data: properties };
};
