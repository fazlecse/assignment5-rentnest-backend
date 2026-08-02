"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { deletePropertyAction } from "../_actions/propertyAction";

const DeletePropertyButton = ({ propertyId }: { propertyId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const performDelete = () => {
    startTransition(async () => {
      const result = await deletePropertyAction(propertyId);
      if (result.success) {
        toast.success("Property deleted");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <ConfirmDialog
      trigger={<Button variant="destructive" size="sm" disabled={isPending} />}
      triggerLabel={isPending ? "Deleting..." : "Delete"}
      title="Delete this property?"
      description="This cannot be undone."
      confirmLabel="Delete"
      confirmVariant="destructive"
      onConfirm={performDelete}
      loading={isPending}
    />
  );
};

export default DeletePropertyButton;
