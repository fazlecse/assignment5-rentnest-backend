"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAction } from "../_actions/authAction";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, false);

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Registration failed");
    }
  }, [state]);

  const errors = state && !state.success ? state.errors : undefined;

  return (
    <div>
      <form action={action} className="space-y-4">
        <Card className="p-5 space-y-4">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Full name"
              aria-invalid={!!errors?.name}
            />
            {errors?.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              aria-invalid={!!errors?.email}
            />
            {errors?.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              aria-invalid={!!errors?.password}
            />
            {errors?.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>
          <div className="space-y-1">
            <select
              name="role"
              defaultValue=""
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none"
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="TENANT">Tenant</option>
              <option value="LANDLORD">Landlord</option>
            </select>
            {errors?.role && (
              <p className="text-sm text-destructive">{errors.role}</p>
            )}
          </div>
          <Button type="submit">{pending ? "Submitting" : "Register"}</Button>
        </Card>
      </form>
    </div>
  );
};

export default RegisterForm;
