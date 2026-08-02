import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  rent: z.number().finite("Enter a valid number").positive("Rent must be positive"),
  bedrooms: z
    .number()
    .finite("Enter a valid number")
    .int("Bedrooms must be a whole number")
    .positive("Bedrooms must be at least 1"),
  bathrooms: z
    .number()
    .finite("Enter a valid number")
    .int("Bathrooms must be a whole number")
    .positive("Bathrooms must be at least 1"),
  categoryId: z.string().min(1, "Select a category"),
  thumbnail: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().url("Enter a valid URL").optional(),
  ),
});

export const updatePropertySchema = propertySchema.extend({
  status: z.enum(["AVAILABLE", "RENTED", "UNAVAILABLE"]).optional(),
});
