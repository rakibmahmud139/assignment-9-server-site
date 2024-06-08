import { userRole } from "@prisma/client";
import express from "express";
import { auth } from "../../middleware/auth";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.get(
  "/user",
  auth(userRole.admin, userRole.user),
  UserControllers.getAllUser
);

router.get(
  "/user/:id",
  auth(userRole.admin, userRole.user),
  UserControllers.getSingleUser
);

router.put(
  "/user/:id",
  auth(userRole.admin, userRole.user),
  UserControllers.updateUser
);

router.delete(
  "/user/:id",
  auth(userRole.admin, userRole.user),
  UserControllers.deleteUser
);

export const UserRoutes = router;
