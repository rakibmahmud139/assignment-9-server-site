import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../../helpers/catchAsync";
import { sendResponse } from "../../../helpers/sendResponse";
import { FoundItemCategoryService } from "./foundItemCategory.service";

const createFoundItemCategory = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await FoundItemCategoryService.createFoundItemCategory(
      user,
      req.body
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Found item category created successfully",
      data: result,
    });
  }
);

export const FoundItemCategoryController = {
  createFoundItemCategory,
};
