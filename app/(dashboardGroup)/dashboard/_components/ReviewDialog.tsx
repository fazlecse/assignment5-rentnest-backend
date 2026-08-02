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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitReviewAction } from "../_actions/reviewAction";

const ReviewDialog = ({
  propertyId,
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) => {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(submitReviewAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Review submitted");
      setOpen(false);
    } else {
      toast.error(state.message || "Failed to submit review");
    }
  }, [state]);

  const errors = state && !state.success ? state.errors : undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" variant="outline" />}>
        Leave Review
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review {propertyTitle}</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <input type="hidden" name="propertyId" value={propertyId} />
          <div className="space-y-1">
            <Label htmlFor="rating">Rating</Label>
            <select
              id="rating"
              name="rating"
              defaultValue="5"
              aria-invalid={!!errors?.rating}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
            {errors?.rating && (
              <p className="text-sm text-destructive">{errors.rating}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              name="comment"
              rows={4}
              aria-invalid={!!errors?.comment}
            />
            {errors?.comment && (
              <p className="text-sm text-destructive">{errors.comment}</p>
            )}
          </div>
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
