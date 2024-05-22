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
  },
  options: TPaginationOptions
) => {
  const { searchTerm, ...filteredData } = query;
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
  console.log(query);
  const result = await prisma.foundItem.findMany({
    where: whereCondition,
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

export const FoundItemService = {
  createFoundItem,
  getAllFoundItem,
};
