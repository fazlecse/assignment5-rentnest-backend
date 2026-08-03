"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/authAction";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);
  // Bumped on every failed submit so the form remounts and picks up
  // state.values as its new defaultValue — React resets uncontrolled
  // inputs after any action submission, success or failure.
  const [formKey, setFormKey] = useState(0);
  // const router = useRouter();
  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Login failed");
      setFormKey((key) => key + 1);
    }
  }, [state]);

  const errors = state && !state.success ? state.errors : undefined;
  const values = state && !state.success ? state.values : undefined;

  return (
    <div>
      <form key={formKey} action={action} className="space-y-4">
        <Card className="p-5 space-y-4">
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={values?.email}
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
          <Button type="submit">{pending ? "Submitting" : "Login"}</Button>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
