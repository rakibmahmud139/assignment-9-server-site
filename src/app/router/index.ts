import express from "express";
import { AuthRouter } from "../modules/auth/auth.routes";
import { FoundItemCategoryRoute } from "../modules/foundItemCategory/foundItemCategory.routes";
import { FoundItemRoute } from "../modules/foundItem/foundItem.routes";
import { ClaimRoute } from "../modules/claim/claim.routes";
import { UserProfileRoute } from "../modules/userProfile/userProfile.routes";
import { LostItemRoute } from "../modules/lostItem/lostItem.routes";
import { MetaRoute } from "../modules/meta/meta.routes";
import { ReviewRoute } from "../modules/review/review.routes";
import { UserRoutes } from "../modules/userManagement/user.routes";

const router = express.Router();

const modulesRoute = [
  {
    path: "/",
    router: AuthRouter,
  },
  {
    path: "/",
    router: FoundItemCategoryRoute,
  },
  {
    path: "/",
    router: LostItemRoute,
  },
  {
    path: "/",
    router: FoundItemRoute,
  },
  {
    path: "/",
    router: ClaimRoute,
  },
  {
    path: "/",
    router: UserProfileRoute,
  },
  {
    path: "/",
    router: ReviewRoute,
  },
  {
    path: "/",
    router: MetaRoute,
  },
  {
    path: "/",
    router: UserRoutes,
  },
];

modulesRoute.forEach((route) => router.use(route.path, route.router));

export default router;
