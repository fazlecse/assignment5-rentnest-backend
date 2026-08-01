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

  return (
    <div>
      <form action={action} className="space-y-4">
        <Card className="p-5 space-y-4">
          <Input name="name" type="text" placeholder="Full name" required />
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            minLength={6}
            required
          />
          <select
            name="role"
            defaultValue=""
            required
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none"
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="TENANT">Tenant</option>
            <option value="LANDLORD">Landlord</option>
          </select>
          <Button type="submit">{pending ? "Submitting" : "Register"}</Button>
        </Card>
      </form>
    </div>
  );
};

export default RegisterForm;
