import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const _config = {
	port: process.env.PORT ?? 5000,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
	mongoURI: process.env.MONGO_URI,
	env: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
