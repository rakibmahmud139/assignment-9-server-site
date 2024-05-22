import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../../helpers/catchAsync";
import { LostItemService } from "./lostItem.service";
import { Request, Response } from "express";
import { sendResponse } from "../../../helpers/sendResponse";

const createIntoDB = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await LostItemService.createIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Lost item created successfully",
      data: result,
    });
  }
);

const updateLostItemStatus = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;
    const { id } = req.params;

    const result = await LostItemService.updateLostItemStatus(user, id);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Update lost item status successfully",
      data: result,
    });
  }
);

export const LostItemController = {
  createIntoDB,
  updateLostItemStatus,
};
