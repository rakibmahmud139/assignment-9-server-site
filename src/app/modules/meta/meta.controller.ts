import { Request, Response } from "express";
import { catchAsync } from "../../../helpers/catchAsync";
import { MetaServices } from "./meta.service";
import { sendResponse } from "../../../helpers/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const getDashboardMetaData = catchAsync(async (req: Request, res: Response) => {
  const result = await MetaServices.getDashboardMetaData();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Dashboard meta data retrieved successfully",
    data: result,
  });
});

const getUserDashboardMetaData = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;
    const result = await MetaServices.getUserDashboardMetaData(user);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Dashboard meta data retrieved successfully",
      data: result,
    });
  }
);

export const MetaControllers = {
  getDashboardMetaData,
  getUserDashboardMetaData,
};
