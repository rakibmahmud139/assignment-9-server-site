import { z } from "zod";

const profileSchema = z.object({
  bio: z.string(),
  age: z.number(),
});

const userRegistrationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "email is required" }),
    password: z.string({ required_error: "password is required" }),
    profile: profileSchema,
  }),
});

const userLoginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email is required" }),
    password: z.string({ required_error: "password is required" }),
  }),
});

export const UserValidationSchemas = {
  userRegistrationSchema,
  userLoginSchema,
};
