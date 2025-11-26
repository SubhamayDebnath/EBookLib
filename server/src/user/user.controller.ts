import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {config} from "../config/config.ts";
import asyncHandler from "../utils/asyncHandler.ts";
import AppError from "../utils/appError.ts";
import ApiResponse from "../utils/apiResponseHandler.ts";
import User from "./user.model.ts";


const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new AppError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ email });
  if(existingUser){
    throw new AppError(400, "User already exists");
  }
  const newUser = await User.create({ name, email, password});
  if(!newUser){
    throw new AppError(400, "User not created");
  }
  const token = jwt.sign({ id: newUser._id },config.jwt_secret as string, {
    expiresIn: "7d",
  })
  res.status(201).json(new ApiResponse(201, "User created successfully", {access:token}));
});
export { createUser };
