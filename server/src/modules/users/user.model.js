import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../../config/config.js";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "name is required"],
			minLength: [2, "name must be at least 3 characters"],
			maxLength: [20, "name must be at most 20 characters"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "email is required"],
			unique: [true, "email already exists"],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"please provide a valid email",
			],
			trim: true,
			lowercase: true,
			index: true,
		},
		password: {
			type: String,
			required: [true, "password is required"],
			select: false,
		},
		role: {
			type: String,
			enum: ["user", "author", "admin"],
			default: "user",
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		refreshToken: {
			type: String,
			select: false,
		},
		forgotPasswordToken: {
			type: String,
			select: false,
		},
		forgotPasswordTokenExpiry: {
			type: Date,
			select: false,
		},
		verificationToken: {
			type: String,
			select: false,
		},
	},
	{ timestamps: true }
);
userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});
// compare the new password with hashed saved password
userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};
// generate access token
userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{ _id: this._id, role: this.role },
		config.ACCESS_TOKEN_SECRET,
		{ expiresIn: config.ACCESS_TOKEN_EXPIRY }
	);
};
// generate refresh token
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign({ _id: this._id }, config.REFRESH_TOKEN_SECRET, {
		expiresIn: config.REFRESH_TOKEN_EXPIRY,
	});
};
const User = mongoose.model("User", userSchema);

export default User;
