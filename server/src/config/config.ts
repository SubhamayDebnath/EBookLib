import {config as dotenvConfig} from "dotenv";
dotenvConfig();

const _config = {
  port: process.env.PORT,
  databaseURL: process.env.MONGO_URI,
  environment: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET
};

export const config = Object.freeze(_config);