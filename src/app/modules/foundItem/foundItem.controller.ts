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
  const filters = pick(req.query, [
    "foundItemName",
    "category",
    "location",
    "searchTerm",
    "email",
  ]);
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

const getSingleFoundItem = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;
    const { id } = req.params;

    const result = await FoundItemService.getSingleFoundItem(user, id);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Get single Found items retrieved successfully",
      data: result,
    });
  }
);

const updateFoundItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FoundItemService.updateFoundItem(id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Found item updated successfully",
    data: result,
  });
});

const deleteFoundItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FoundItemService.deleteFoundItem(id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Found item deleted successfully",
    data: result,
  });
});

export const FoundItemController = {
  createFoundItem,
  getAllFoundItem,
  updateFoundItem,
  deleteFoundItem,
  getSingleFoundItem,
};
