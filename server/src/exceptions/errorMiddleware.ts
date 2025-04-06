import { NextFunction, Request, Response } from "express";
import { HttpException } from "./root";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Use 500 as a fallback if statusCode is not set
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.error,
  });
};
