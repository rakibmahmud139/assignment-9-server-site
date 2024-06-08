import { Request, Response } from "express";
import { catchAsync } from "../../../helpers/catchAsync";
import { sendResponse } from "../../../helpers/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { UserServices } from "./user.service";

const getAllUser = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await UserServices.getAllUser(user);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "user retrieved successfully",
      data: result,
    });
  }
);

const getSingleUser = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;
    const { id } = req.params;

    const result = await UserServices.getSingleUser(user, id);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "user retrieved successfully",
      data: result,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;
    const { id } = req.params;

    const result = await UserServices.updateUser(user, id, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "user updated successfully",
      data: result,
    });
  }
);

const deleteUser = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;
    const { id } = req.params;

    const result = await UserServices.deleteUser(user, id);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "user deleted successfully",
      data: result,
    });
  }
);

export const UserControllers = {
  getAllUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
