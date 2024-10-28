import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../helpers/prisma";

const getDashboardMetaData = async () => {
  const totalLostItems = await prisma.lostItem.count();
  const totalClaimItems = await prisma.claim.count();
  const totalFoundItems = await prisma.foundItem.count();
  const totalUsers = await prisma.user.count({
    where: {
      role: "user",
    },
  });

  return [
    {
      totalClaimItems,
      totalLostItems,
      totalFoundItems,
      totalUsers,
    },
  ];
};

const getUserDashboardMetaData = async (user: JwtPayload) => {
  const userInfo = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });

  const totalLostItems = await prisma.lostItem.count({
    where: { user: { email: userInfo?.email } },
  });
  const totalClaimItems = await prisma.claim.count({
    where: { user: { email: userInfo?.email } },
  });
  const totalFoundItems = await prisma.foundItem.count({
    where: { user: { email: userInfo?.email } },
  });

  return [
    {
      totalClaimItems,
      totalLostItems,
      totalFoundItems,
    },
  ];
};

export const MetaServices = { getDashboardMetaData, getUserDashboardMetaData };
