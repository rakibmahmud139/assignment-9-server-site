import express from "express";
import { auth } from "../../middleware/auth";
import { UserProfileController } from "./userProfile.controller";

const router = express.Router();

router.get("/my-profile", auth(), UserProfileController.getMyProfile);

router.put("/my-profile", auth(), UserProfileController.updateMyProfile);

export const UserProfileRoute = router;
