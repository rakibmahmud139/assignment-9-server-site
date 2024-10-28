import { userRole } from "@prisma/client";
import express from "express";
import { auth } from "../../middleware/auth";
import { MetaControllers } from "./meta.controller";

const router = express.Router();

router.get("/meta", auth(userRole.admin), MetaControllers.getDashboardMetaData);

router.get(
  "/meta/user",
  auth(userRole.user),
  MetaControllers.getUserDashboardMetaData
);

export const MetaRoute = router;
