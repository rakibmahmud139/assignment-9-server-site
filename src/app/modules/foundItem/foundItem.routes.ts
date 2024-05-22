import express from "express";
import { FoundItemController } from "./foundItem.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { FoundItemValidationSchemas } from "./foundItem.validation";

const router = express.Router();

router.get("/found-items", FoundItemController.getAllFoundItem);

router.post(
  "/found-items",
  auth(),
  validateRequest(FoundItemValidationSchemas.createFoundItemValidationSchema),
  FoundItemController.createFoundItem
);

router.patch("/found-items/:id", FoundItemController.updateFoundItem);

router.delete("/found-items/:id", FoundItemController.deleteFoundItem);

export const FoundItemRoute = router;
