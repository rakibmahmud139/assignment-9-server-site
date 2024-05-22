import { LostItem } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../helpers/prisma";

const createIntoDB = async (user: JwtPayload, payload: LostItem) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });

  payload.userId = userData.id;

  await prisma.foundItemCategory.findUniqueOrThrow({
    where: {
      id: payload.categoryId,
    },
  });

  const result = await prisma.lostItem.create({
    data: payload,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          createdAt: true,
          updatedAt: true,
        },
      },
      category: true,
    },
  });

  return result;
};

const updateLostItemStatus = async (user: JwtPayload, id: string) => {
  await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });

  await prisma.lostItem.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.lostItem.update({
    where: {
      id,
    },
    data: {
      isFound: "found",
    },
  });

  return result;
};

export const LostItemService = {
  createIntoDB,
  updateLostItemStatus,
};
