"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deletePropertyAction } from "../_actions/propertyAction";

const DeletePropertyButton = ({ propertyId }: { propertyId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Delete this property? This cannot be undone.")) return;
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
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeletePropertyButton;
