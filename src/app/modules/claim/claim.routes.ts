import express from "express";
import { auth } from "../../middleware/auth";
import { ClaimController } from "./claim.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { ClaimValidationSchemas } from "./claim.valdation";

const router = express.Router();

router.get("/claims", auth(), ClaimController.getAllClaimItem);

router.post(
  "/claims",
  auth(),
  validateRequest(ClaimValidationSchemas.createClaimValidationSchema),
  ClaimController.createClaim
);

router.put("/claims/:claimId", auth(), ClaimController.updateClaimStatus);

export const ClaimRoute = router;
