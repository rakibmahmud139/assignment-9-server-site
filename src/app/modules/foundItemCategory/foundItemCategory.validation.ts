import { z } from "zod";

const createFoundItemCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required" }),
  }),
});

export const CategoryValidationSchemas = {
  createFoundItemCategoryValidationSchema,
};
