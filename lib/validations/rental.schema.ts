import { z } from "zod";

export const rentalRequestSchema = z.object({
  propertyId: z.string().min(1, "Property is required"),
  startDate: z
    .string()
    .min(1, "Move-in date is required")
    .refine(
      (value) => new Date(value) >= new Date(new Date().toDateString()),
      "Move-in date cannot be in the past",
    ),
  months: z
    .number()
    .finite("Enter a valid number")
    .int("Months must be a whole number")
    .positive("Months must be at least 1"),
});
