import * as z from "zod";

export const createUserSchema = z.object({
	body: z.object({
		username: z
			.string({
				required_error: "username is required",
				invalid_type_error: "username must be a string",
			})
			.min(2, "username must be at least 2 characters")
			.max(20, "username must be at most 20 characters")
			.trim(),

		email: z
			.string({
				required_error: "email is required",
				invalid_type_error: "email must be a string",
			})
			.email("please provide a valid email")
			.trim()
			.toLowerCase(),

		password: z
			.string({
				required_error: "password is required",
				invalid_type_error: "password must be a string",
			})
			.min(6, "password must be at least 6 characters"),
		verificationToken: z.string().optional(),
	}),
});
