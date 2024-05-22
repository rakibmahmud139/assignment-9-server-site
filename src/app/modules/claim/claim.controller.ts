import { Request, Response } from "express";
import { catchAsync } from "../../../helpers/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { ClaimServices } from "./claim.service";
import { sendResponse } from "../../../helpers/sendResponse";

const createClaim = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await ClaimServices.createClaim(user, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Claim created successfully",
      data: result,
    });
  }
);

const getAllClaimItem = catchAsync(async (req: Request, res: Response) => {
  const result = await ClaimServices.getAllClaimItem();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Claims retrieved successfully",
    data: result,
  });
});

const updateClaimStatus = catchAsync(async (req: Request, res: Response) => {
  const { claimId } = req.params;

  const result = await ClaimServices.updateClaimStatus(claimId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Claim updated successfully",
    data: result,
  });
});

export const ClaimController = {
  createClaim,
  getAllClaimItem,
  updateClaimStatus,
};
