import { Request, Response } from "express";
import { catchAsync } from "../../../helpers/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../../helpers/sendResponse";
import { ReviewService } from "./review.service";

const createIntoDB = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await ReviewService.createIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "review created successfully",
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllFromDb();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "review retrieved successfully",
    data: result,
  });
});

export const ReviewController = {
  createIntoDB,
  getAllFromDB,
};
