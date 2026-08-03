"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { loginSchema, registerSchema } from "@/lib/validations/auth.schema";
import { formatZodErrors } from "@/lib/validations/formatZodErrors";

export type LoginFormValues = { email: string };

type loginState =
  | {
      success: true;
      statusCode: string;
      message: string;
      data: {
        accessToken: string;
        refreshToken: string;
      };
    }
  | {
      success: false;
      message: string;
      errors?: Record<string, string>;
      values?: LoginFormValues;
    };

export const loginAction = async (
  prevState: loginState | false,
  formData: FormData,
) => {
  const values: LoginFormValues = {
    email: (formData.get("email") as string) ?? "",
  };
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false as const,
      message: "Please fix the errors below",
      errors: formatZodErrors(parsed.error),
      values,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
  });
  const result = await res.json();
  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
    if (decodedToken.role === "TENANT") {
      redirect("/dashboard");
    } else if (decodedToken.role === "ADMIN") {
      redirect("/admin-dashboard");
    } else if (decodedToken.role === "LANDLORD") {
      redirect("/landlord-dashboard");
    }
  }

  return { ...result, values };
};

export type RegisterFormValues = { name: string; email: string; role: string };

type registerState =
  | {
      success: boolean;
      message: string;
      errors?: Record<string, string>;
      values?: RegisterFormValues;
    }
  | false;

export const registerAction = async (
  prevState: registerState,
  formData: FormData,
) => {
  const values: RegisterFormValues = {
    name: (formData.get("name") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    role: (formData.get("role") as string) ?? "",
  };
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const parsed = registerSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: formatZodErrors(parsed.error),
      values,
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    },
  );
  const result = await res.json();

  if (result.success) {
    redirect("/login");
  }

  return { ...result, values };
};
