import { prisma } from "../../../helpers/prisma";

const getDashboardMetaData = async () => {
  const totalLostItems = await prisma.lostItem.count();
  const totalClaimItems = await prisma.claim.count();
  const totalFoundItems = await prisma.foundItem.count();

  return {
    totalClaimItems,
    totalLostItems,
    totalFoundItems,
  };
};

export const MetaServices = { getDashboardMetaData };
