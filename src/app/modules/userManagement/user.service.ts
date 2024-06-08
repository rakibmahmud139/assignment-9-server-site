import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../helpers/prisma";
import { User, userRole } from "@prisma/client";

const getAllUser = async (user: JwtPayload) => {
  await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      role: userRole.admin,
    },
  });

  const result = await prisma.user.findMany({
    where: {
      role: userRole.user,
    },
    include: {
      userProfile: true,
    },
  });

  return result;
};

const getSingleUser = async (user: JwtPayload, id: string) => {
  await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      role: userRole.admin,
    },
  });

  const result = await prisma.user.findFirstOrThrow({
    where: {
      id: id,
    },
  });

  return result;
};

const updateUser = async (
  user: JwtPayload,
  id: string,
  payload: Partial<User>
) => {
  await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      role: userRole.admin,
    },
  });

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteUser = async (user: JwtPayload, id: string) => {
  await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      role: userRole.admin,
    },
  });

  const result = await prisma.$transaction(async (tx) => {
    await tx.userProfile.delete({
      where: {
        userId: id,
      },
    });

    await tx.user.delete({
      where: {
        id,
      },
    });

    return null;
  });

  return result;
};

export const UserServices = {
  getAllUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
