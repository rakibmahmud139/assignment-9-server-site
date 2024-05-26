import { userRole } from "@prisma/client";
import express from "express";
import { auth } from "../../middleware/auth";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.get("/review", ReviewController.getAllFromDB);

router.post(
  "/review",
  auth(userRole.user, userRole.admin),
  ReviewController.createIntoDB
);

export const ReviewRoute = router;
