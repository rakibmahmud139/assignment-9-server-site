import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../helpers/prisma";

const getMyProfile = async (user: JwtPayload) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.userProfile.findUniqueOrThrow({
    where: {
      userId: userData.id,
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
    },
  });

  return result;
};

const updateMyProfile = async (
  user: JwtPayload,
  payload: { age: number; bio: string }
) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.userProfile.update({
    where: {
      userId: userData.id,
    },
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
    },
  });

  return result;
};

export const UserProfileServices = {
  getMyProfile,
  updateMyProfile,
};
