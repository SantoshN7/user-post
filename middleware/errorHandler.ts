import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => {
  if (error && error instanceof AppError) {
    return res
      .status(error.code)
      .json({ code: error.code, message: error.message });
  }
  res.status(500).json({ code: 500, message: "Something went wrong!" });
};
