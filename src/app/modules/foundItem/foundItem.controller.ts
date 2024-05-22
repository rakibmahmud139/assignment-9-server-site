import { Request, Response } from "express";
import { catchAsync } from "../../../helpers/catchAsync";
import { FoundItemService } from "./foundItem.service";
import { sendResponse } from "../../../helpers/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { pick } from "../../../helpers/pick";

const createFoundItem = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await FoundItemService.createFoundItem(user, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Found item reported successfully",
      data: result,
    });
  }
);

const getAllFoundItem = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["foundItemName", "searchTerm"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await FoundItemService.getAllFoundItem(filters, options);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Found items retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const FoundItemController = {
  createFoundItem,
  getAllFoundItem,
};
