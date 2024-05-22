import { z } from "zod";

const createLostItemValidationSchema = z.object({
  body: z.object({
    categoryId: z.string({ required_error: "Category is is required" }),
    lostItemName: z.string({ required_error: "Found item name is required" }),
    description: z.string({ required_error: "Description is required" }),
    location: z.string({ required_error: "Location is required" }).optional(),
  }),
});

export const LostItemValidationSchemas = {
  createLostItemValidationSchema,
};
