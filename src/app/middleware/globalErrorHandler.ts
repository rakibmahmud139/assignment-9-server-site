import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { zodErrorHandler } from "../Errors/zodErrorHandler";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = "";
  let errorDetails = {};

  if (err instanceof ZodError) {
    const zodError = zodErrorHandler(err);
    message = zodError.message;
    errorDetails = { issues: zodError.errorDetails };
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: message || err.message,
    errorDetails: err instanceof ZodError ? errorDetails : err,
  });
};
