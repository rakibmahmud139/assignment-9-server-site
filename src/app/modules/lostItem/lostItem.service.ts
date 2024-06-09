import { LostItem, Prisma } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { calculatePagination } from "../../../helpers/calculatePagination";
import { prisma } from "../../../helpers/prisma";
import { TPaginationOptions } from "../../interfaces/pagination";
import { lostItemSearchAbleFields } from "./lostItem.constant";

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
  console.log(result);
  return result;
};

const getAllLostItem = async (
  query: {
    searchTerm?: string | undefined;
    lostItemName?: string | undefined;
    email?: string | undefined;
  },
  options: TPaginationOptions
) => {
  const { searchTerm, email, ...filteredData } = query;
  let addCondition: Prisma.LostItemWhereInput[] = [];
  const { page, limit, skip } = calculatePagination(options);

  console.log(email);

  if (query.searchTerm) {
    addCondition.push({
      OR: lostItemSearchAbleFields.map((field) => ({
        [field]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filteredData).length > 0) {
    addCondition.push({
      AND: Object.keys(filteredData).map((key) => ({
        [key]: {
          equals: (filteredData as any)[key],
        },
      })),
    });
  }

  const whereCondition = { AND: addCondition };
  const result = await prisma.lostItem.findMany({
    where: email
      ? {
          user: {
            email,
          },
        }
      : whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          createdAt: true,
          updatedAt: true,
          userProfile: true,
        },
      },
      category: true,
    },
  });

  const total = await prisma.lostItem.count({
    where: whereCondition,
  });

  const meta = {
    total,
    page,
    limit,
  };

  return { result, meta };
};

const getSingleLostItem = async (user: JwtPayload, id: string) => {
  await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.lostItem.findFirstOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const updateLostItem = async (id: string, payload: Partial<LostItem>) => {
  await prisma.lostItem.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.lostItem.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteLostItem = async (id: string) => {
  await prisma.lostItem.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.lostItem.delete({
    where: {
      id,
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
      found: true,
    },
  });

  return result;
};

export const LostItemService = {
  createIntoDB,
  updateLostItemStatus,
  getAllLostItem,
  getSingleLostItem,
  deleteLostItem,
  updateLostItem,
};
