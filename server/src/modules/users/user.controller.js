import ApiResponse from "../../utils/apiResponseHandler.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import UserService from "./user.services.js";

export const createUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		throw new AppError(400, "All fields are required");
	}
	await UserService.createUserService({ username, email, password });
	return res
		.status(201)
		.json(new ApiResponse(201, "User created successfully"));
});
