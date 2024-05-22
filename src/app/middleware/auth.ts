import { NextFunction, Request, Response } from "express";
import { AppError } from "../Errors/appError";
import httpStatus from "http-status";
import { verifyToken } from "../../helpers/jwtHelpers";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../interfaces/pagination";

export const auth = (...requiredRoles: TUserRole[]) => {
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

      const verifiedUser = verifyToken(token, config.jwt_secret as string);

      req.user = verifiedUser as JwtPayload;

      next();
    } catch (err) {
      next(err);
    }
  };
};
