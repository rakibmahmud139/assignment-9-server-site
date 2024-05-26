import { userRole } from "@prisma/client";
import express from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { LostItemController } from "./lostItem.controller";
import { LostItemValidationSchemas } from "./lostItem.validation";

const router = express.Router();

router.get(
  "/lost-items",
  auth(userRole.user, userRole.admin),
  LostItemController.getAllLostItem
);

router.get("/lost-items/:id", LostItemController.getSingleLostItem);

router.post(
  "/lost-items",
  auth(userRole.user, userRole.admin),
  validateRequest(LostItemValidationSchemas.createLostItemValidationSchema),
  LostItemController.createIntoDB
);

router.patch(
  "/lost-items/:id",
  auth(userRole.admin, userRole.user),
  LostItemController.updateLostItemStatus
);

export const LostItemRoute = router;
