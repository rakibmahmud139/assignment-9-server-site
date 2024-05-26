import express from "express";
import { FoundItemCategoryController } from "./foundItemCategory.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { CategoryValidationSchemas } from "./foundItemCategory.validation";
import { userRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/found-item-categories",
  auth(userRole.user, userRole.admin),
  FoundItemCategoryController.getCategory
);

router.post(
  "/found-item-categories",
  auth(userRole.admin, userRole.user),
  validateRequest(
    CategoryValidationSchemas.createFoundItemCategoryValidationSchema
  ),
  FoundItemCategoryController.createFoundItemCategory
);

export const FoundItemCategoryRoute = router;
