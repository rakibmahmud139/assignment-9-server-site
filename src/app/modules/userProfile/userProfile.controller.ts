import { Request, Response } from "express";
import { catchAsync } from "../../../helpers/catchAsync";
import { sendResponse } from "../../../helpers/sendResponse";
import { UserProfileServices } from "./userProfile.service";
import { JwtPayload } from "jsonwebtoken";

const getMyProfile = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await UserProfileServices.getMyProfile(user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile retrieved successfully",
      data: result,
    });
  }
);

const updateMyProfile = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await UserProfileServices.updateMyProfile(user, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

export const UserProfileController = {
  getMyProfile,
  updateMyProfile,
};
