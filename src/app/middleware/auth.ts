import { NextFunction, Request, Response } from "express";
import { AppError } from "../Errors/appError";
import httpStatus from "http-status";
import { verifyToken } from "../../helpers/jwtHelpers";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../interfaces/pagination";
import { userRole } from "@prisma/client";

type TUserPayload = {
  name: string;
  email: string;
  role: userRole;
};

export const auth = (...roles: TUserRole[]) => {
  return async (
    req: Request & { user?: JwtPayload },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Yoy are not authorized");
      }

      const verifiedUser = verifyToken(
        token,
        config.jwt_secret as string
      ) as TUserPayload;

      req.user = verifiedUser as TUserPayload;

      if (roles.length && !roles.includes(verifiedUser?.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "FORBIDDEN!");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
