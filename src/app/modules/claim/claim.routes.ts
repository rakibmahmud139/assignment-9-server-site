import express from "express";
import { auth } from "../../middleware/auth";
import { ClaimController } from "./claim.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { ClaimValidationSchemas } from "./claim.valdation";
import { userRole } from "@prisma/client";

const router = express.Router();

router.get("/claims", auth(), ClaimController.getAllClaimItem);

router.post(
  "/claims",
  auth(userRole.user),
  validateRequest(ClaimValidationSchemas.createClaimValidationSchema),
  ClaimController.createClaim
);

router.put("/claims/:claimId", auth(), ClaimController.updateClaimStatus);

export const ClaimRoute = router;
