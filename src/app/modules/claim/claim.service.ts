import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../helpers/prisma";
import { Claim, claimStatus } from "@prisma/client";
import { QueryOptions, QueryOptionsCb } from "@prisma/client/runtime/library";

const createClaim = async (user: JwtPayload, payload: Claim) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });

  payload.userId = userData.id;

  const result = await prisma.claim.create({
    data: payload,
  });

  return result;
};

const getAllClaimItem = async (query: Record<string, any>) => {
  const result = await prisma.claim.findMany({
    where: {
      user: {
        email: query?.email,
      },
    },
    include: {
      foundItem: {
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
      },
    },
  });

  return result;
};

const updateClaimStatus = async (
  id: string,
  payload: { status: claimStatus }
) => {
  const claim = await prisma.claim.findFirstOrThrow({
    where: {
      foundItemId: id,
    },
  });

  const result = await prisma.claim.update({
    where: {
      id: claim.id,
    },

    data: {
      status: payload.status,
    },
  });

  return result;
};

export const ClaimServices = {
  createClaim,
  getAllClaimItem,
  updateClaimStatus,
};
