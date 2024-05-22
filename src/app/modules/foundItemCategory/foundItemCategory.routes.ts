import express from "express";
import { FoundItemCategoryController } from "./foundItemCategory.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { CategoryValidationSchemas } from "./foundItemCategory.validation";

const router = express.Router();

router.post(
  "/found-item-categories",
  auth(),
  validateRequest(
    CategoryValidationSchemas.createFoundItemCategoryValidationSchema
  ),
  FoundItemCategoryController.createFoundItemCategory
);

export const FoundItemCategoryRoute = router;
