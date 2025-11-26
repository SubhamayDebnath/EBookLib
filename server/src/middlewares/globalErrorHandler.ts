import type { Request, Response, NextFunction } from "express";
import { config } from "../config/config.ts";

// global error handler
const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    success: false,
    message: err.message,
  } as {
    success: boolean;
    message: string;
    stack?: string;
  };
  if (config.environment === "development") {
    errorResponse.stack = err.stack;
  }
  return res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
