import { FoundItem, Prisma } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { calculatePagination } from "../../../helpers/calculatePagination";
import { prisma } from "../../../helpers/prisma";
import { TPaginationOptions } from "../../interfaces/pagination";
import { foundItemSearchAbleFields } from "./foundItem.constant";

const createFoundItem = async (user: JwtPayload, payload: FoundItem) => {
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

  const result = await prisma.foundItem.create({
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

const getAllFoundItem = async (
  query: {
    searchTerm?: string | undefined;
    foundItemName?: string | undefined;
    email?: string | undefined;
  },
  options: TPaginationOptions
) => {
  const { searchTerm, email, ...filteredData } = query;
  let addCondition: Prisma.FoundItemWhereInput[] = [];

  const { page, limit, skip } = calculatePagination(options);

  if (query.searchTerm) {
    addCondition.push({
      OR: foundItemSearchAbleFields.map((field) => ({
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
  const result = await prisma.foundItem.findMany({
    where: email
      ? {
          user: {
            email: email,
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
        },
      },
      category: true,
    },
  });

  const total = await prisma.foundItem.count({
    where: whereCondition,
  });

  const meta = {
    total,
    page,
    limit,
  };

  return { result, meta };
};

const updateFoundItem = async (id: string, payload: Partial<FoundItem>) => {
  await prisma.foundItem.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.foundItem.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteFoundItem = async (id: string) => {
  await prisma.foundItem.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.foundItem.delete({
    where: {
      id,
    },
  });

  return result;
};

export const FoundItemService = {
  createFoundItem,
  getAllFoundItem,
  updateFoundItem,
  deleteFoundItem,
};
