import bcrypt from "bcryptjs";
import config from "../../../config";
import { createToken } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../helpers/prisma";
import { UserData } from "./auth.constant";
import { userRole } from "@prisma/client";

const registerUser = async (payload: UserData) => {
  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const userData = {
    name: payload.name,
    email: payload.email,
    role: payload?.role as userRole,
    password: hashedPassword,
    userProfile: {
      create: { bio: payload.profile.bio, age: payload.profile.age },
    },
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const user = await transactionClient.user.create({
      data: userData,
      include: { userProfile: true },
    });

    return { user };
  });

  const responseData = {
    id: result.user.id,
    name: result.user.name,
    email: result.user.email,
    role: result.user.role,
    createdAt: result.user.createdAt,
    updatedAt: result.user.updatedAt,
    profile: {
      id: result.user.userProfile?.id,
      userId: result.user.userProfile?.userId,
      bio: result.user.userProfile?.bio,
      age: result.user.userProfile?.age,
      createdAt: result.user.userProfile?.createdAt,
      updatedAt: result.user.userProfile?.updatedAt,
    },
  };

  return responseData;
};

const userLogin = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Password is incorrect");
  }

  const userPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    config.jwt_secret as string,
    userPayload,
    config.jwt_expires_in as string
  );

  const result = {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };

  return result;
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.currentPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("password is incorrect");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};
export const AuthServices = {
  registerUser,
  userLogin,
  changePassword,
};
