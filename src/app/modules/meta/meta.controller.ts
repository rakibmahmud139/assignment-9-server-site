import { Request, Response } from "express";
import { catchAsync } from "../../../helpers/catchAsync";
import { MetaServices } from "./meta.service";
import { sendResponse } from "../../../helpers/sendResponse";

const getDashboardMetaData = catchAsync(async (req: Request, res: Response) => {
  const result = await MetaServices.getDashboardMetaData();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Dashboard meta data retrieved successfully",
    data: result,
  });
});

export const MetaControllers = { getDashboardMetaData };
