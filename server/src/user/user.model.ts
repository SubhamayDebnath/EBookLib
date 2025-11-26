import {Schema,model} from "mongoose";
import type { IUser } from "./user.types.ts";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>(
	{
		name: {
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
		},
		password: {
			type: String,
			required: [true, "password is required"],
			select: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		}
	},
	{ timestamps: true }
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return ;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});
const User = model<IUser>("User",userSchema);

export default User