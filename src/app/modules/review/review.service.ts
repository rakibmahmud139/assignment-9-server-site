import { Review } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../helpers/prisma";

const createIntoDB = async (userInfo: JwtPayload, payload: Review) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: userInfo?.email,
    },
  });

  payload.userId = userData?.id;

  console.log(payload);

  const result = await prisma.review.create({
    data: payload,
  });
  console.log(result);

  return result;
};

const getAllFromDb = async () => {
  const result = await prisma.review.findMany({
    include: {
      user: {
        include: {
          userProfile: true,
        },
      },
      foundItem: true,
    },
  });
  return result;
};

export const ReviewService = {
  createIntoDB,
  getAllFromDb,
};
