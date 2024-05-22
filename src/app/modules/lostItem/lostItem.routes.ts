import express from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { LostItemController } from "./lostItem.controller";
import { userRole } from "@prisma/client";
import { LostItemValidationSchemas } from "./lostItem.validation";

const router = express.Router();

router.post(
  "/lost-items",
  auth(userRole.user),
  validateRequest(LostItemValidationSchemas.createLostItemValidationSchema),
  LostItemController.createIntoDB
);

router.patch(
  "/lost-items/:id",
  auth(userRole.admin, userRole.user),
  LostItemController.updateLostItemStatus
);

export const LostItemRoute = router;
