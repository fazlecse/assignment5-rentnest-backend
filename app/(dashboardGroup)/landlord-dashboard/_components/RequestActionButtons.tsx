"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { updateRequestStatusAction } from "../_actions/requestAction";

const RequestActionButtons = ({ requestId }: { requestId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      const result = await updateRequestStatusAction(requestId, status);
      if (result.success) {
        toast.success(`Request ${status.toLowerCase()}`);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        disabled={isPending}
        onClick={() => handleUpdate("APPROVED")}
      >
        Approve
      </Button>
      <Button
        size="sm"
        variant="destructive"
        disabled={isPending}
        onClick={() => handleUpdate("REJECTED")}
      >
        Reject
      </Button>
    </div>
  );
};

export default RequestActionButtons;
