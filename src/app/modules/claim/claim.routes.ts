import express from "express";
import { auth } from "../../middleware/auth";
import { ClaimController } from "./claim.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { ClaimValidationSchemas } from "./claim.valdation";
import { userRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/claims",
  auth(userRole.user, userRole.admin),
  ClaimController.getAllClaimItem
);

router.post(
  "/claims",
  auth(userRole.user, userRole.admin),
  validateRequest(ClaimValidationSchemas.createClaimValidationSchema),
  ClaimController.createClaim
);

router.patch(
  "/claims/:claimId",
  auth(userRole.user, userRole.admin),
  ClaimController.updateClaimStatus
);

export const ClaimRoute = router;
