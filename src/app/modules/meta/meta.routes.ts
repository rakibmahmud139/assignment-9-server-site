import { userRole } from "@prisma/client";
import express from "express";
import { auth } from "../../middleware/auth";
import { MetaControllers } from "./meta.controller";

const router = express.Router();

router.get("/meta", auth(userRole.admin), MetaControllers.getDashboardMetaData);

export const MetaRoute = router;
