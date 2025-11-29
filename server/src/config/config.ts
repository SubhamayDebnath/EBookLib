import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const _config = {
	port: process.env.PORT ?? 3000,
	databaseURL: process.env.MONGO_URI ?? "",
	environment: process.env.NODE_ENV ?? "development",
	jwt_secret: process.env.JWT_SECRET ?? "secretweredaseqeqwewqww",
	jwt_expires_in: Number(process.env.JWT_EXPIRY_DAYS ?? 1) * 24 * 60 * 60,
	cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "cloud_name",
	cloudinary_api_key: process.env.CLOUDINARY_API_KEY ?? "api_key",
	cloudinary_api_secret: process.env.CLOUDINARY_SECRET ?? "api_secret",
};

export const config = Object.freeze(_config);
