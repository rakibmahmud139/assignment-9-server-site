import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { UserValidationSchemas } from "./auth.validation";
import { userRole } from "@prisma/client";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidationSchemas.userRegistrationSchema),
  AuthController.registerUser
);

router.post(
  "/login",
  validateRequest(UserValidationSchemas.userLoginSchema),
  AuthController.userLogin
);

router.post(
  "/change-password",
  auth(userRole.admin, userRole.user),
  AuthController.changePassword
);

export const AuthRouter = router;
