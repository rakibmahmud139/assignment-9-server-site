import express from "express";
import { auth } from "../../middleware/auth";
import { UserProfileController } from "./userProfile.controller";
import { userRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/my-profile",
  auth(userRole.admin, userRole.user),
  UserProfileController.getMyProfile
);

router.put(
  "/my-profile",
  auth(userRole.admin, userRole.user),
  UserProfileController.updateMyProfile
);

export const UserProfileRoute = router;
