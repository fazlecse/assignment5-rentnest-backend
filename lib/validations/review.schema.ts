import { z } from "zod";

export const reviewSchema = z.object({
  propertyId: z.string().min(1, "Property is required"),
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});
