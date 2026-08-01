"use server";
import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  // console.log(accessToken, "accessToken");

  if (!accessToken) {
    // throw new Error("User not logged In!");
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, //1day
      tags: ["my-profile"],
    },
  });
  const result = await res.json();
  // console.log(result);
  return result;
};
