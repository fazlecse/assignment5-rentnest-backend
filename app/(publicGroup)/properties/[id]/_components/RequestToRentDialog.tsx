"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestRentalAction } from "../_actions/rentalAction";

const RequestToRentDialog = ({ propertyId }: { propertyId: string }) => {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(requestRentalAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Rental request submitted");
      setOpen(false);
    } else {
      toast.error(state.message || "Failed to submit request");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full" />}>
        Request to Rent
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request to Rent</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <input type="hidden" name="propertyId" value={propertyId} />
          <div className="space-y-1">
            <Label htmlFor="startDate">Move-in date</Label>
            <Input id="startDate" name="startDate" type="date" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="months">Duration (months)</Label>
            <Input
              id="months"
              name="months"
              type="number"
              min={1}
              defaultValue={1}
              required
            />
          </div>
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestToRentDialog;
