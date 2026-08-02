"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { updateUserStatusAction } from "../_actions/userAction";
import type { UserStatus } from "@/lib/types";

const UserStatusButton = ({
  userId,
  currentStatus,
}: {
  userId: string;
  currentStatus: UserStatus;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const nextStatus: UserStatus =
    currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";

  const performUpdate = () => {
    startTransition(async () => {
      const result = await updateUserStatusAction(userId, nextStatus);
      if (result.success) {
        toast.success(
          nextStatus === "BLOCKED" ? "User banned" : "User unbanned",
        );
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <ConfirmDialog
      trigger={
        <Button
          variant={currentStatus === "ACTIVE" ? "destructive" : "outline"}
          size="sm"
          disabled={isPending}
        />
      }
      triggerLabel={
        isPending ? "Updating..." : currentStatus === "ACTIVE" ? "Ban" : "Unban"
      }
      title={nextStatus === "BLOCKED" ? "Ban this user?" : "Unban this user?"}
      description={
        nextStatus === "BLOCKED"
          ? "They will no longer be able to log in."
          : "They will regain access to their account."
      }
      confirmLabel={nextStatus === "BLOCKED" ? "Ban" : "Unban"}
      confirmVariant={nextStatus === "BLOCKED" ? "destructive" : "default"}
      onConfirm={performUpdate}
      loading={isPending}
    />
  );
};

export default UserStatusButton;
