import { claimStatus } from "@prisma/client";
import { z } from "zod";

const createClaimValidationSchema = z.object({
  body: z.object({
    foundItemId: z.string().optional(),
    distinguishingFeatures: z.string({
      required_error: "Required item is required",
    }),
    status: z
      .enum([claimStatus.PENDING, claimStatus.APPROVED, claimStatus.REJECTED])
      .default("PENDING"),
    lostDate: z.string({ required_error: "Lost date is required" }),
  }),
});

export const ClaimValidationSchemas = {
  createClaimValidationSchema,
};
