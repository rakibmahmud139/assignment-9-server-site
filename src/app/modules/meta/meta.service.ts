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

export const MetaServices = { getDashboardMetaData };
