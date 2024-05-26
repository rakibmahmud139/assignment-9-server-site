import express from "express";
import { FoundItemController } from "./foundItem.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { FoundItemValidationSchemas } from "./foundItem.validation";
import { userRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/found-items",
  auth(userRole.user, userRole.admin),
  FoundItemController.getAllFoundItem
);

router.post(
  "/found-items",
  auth(userRole.user, userRole.admin),
  validateRequest(FoundItemValidationSchemas.createFoundItemValidationSchema),
  FoundItemController.createFoundItem
);

router.patch("/found-items/:id", FoundItemController.updateFoundItem);

router.delete("/found-items/:id", FoundItemController.deleteFoundItem);

export const FoundItemRoute = router;
