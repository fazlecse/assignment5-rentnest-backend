"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { payForRentalAction } from "../_actions/paymentAction";

type PayState = { success: boolean; message: string } | null;

const PayNowButton = ({ rentalRequestId }: { rentalRequestId: string }) => {
  const [state, formAction, pending] = useActionState<PayState, FormData>(
    async () => {
      const result = await payForRentalAction(rentalRequestId);
      return result ?? null;
    },
    null,
  );

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Redirecting..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default PayNowButton;
