import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../helpers/prisma";

const createFoundItemCategory = async (
  user: JwtPayload,
  payload: { name: string }
) => {
  await prisma.user.findFirstOrThrow({
    where: {
      email: user?.email,
    },
  });

  const result = await prisma.foundItemCategory.create({
    data: payload,
  });

  return result;
};

export const FoundItemCategoryService = {
  createFoundItemCategory,
};
