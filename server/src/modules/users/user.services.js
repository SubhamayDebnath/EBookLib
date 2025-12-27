import User from "./user.model.js";
import AppError from "../../utils/appError.js";
class UserService {
	async createUserService(userData) {
		const existingUser = await User.findOne({ email: userData.email });
		if (existingUser) {
			throw new AppError(409, "User with this email already exists");
		}
		const user = await User.create(userData);
		return user;
	}
}

export default new UserService();
