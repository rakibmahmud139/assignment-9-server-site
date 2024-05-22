import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../../helpers/catchAsync";
import { LostItemService } from "./lostItem.service";
import { Request, Response } from "express";
import { sendResponse } from "../../../helpers/sendResponse";
import { pick } from "../../../helpers/pick";

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

const getAllLostItem = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["foundItemName", "searchTerm"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await LostItemService.getAllLostItem(filters, options);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Lost items retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

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
  getAllLostItem,
  updateLostItemStatus,
};
