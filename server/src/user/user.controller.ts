import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import AppError from "../utils/appError.ts";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new AppError(400, "All fields are required");
  }
  res.status(201).json({ name, email, password });
});
export { createUser };
