import {config as dotenvConfig} from "dotenv";
dotenvConfig();

const _config = {
  port: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI
};

export const config = Object.freeze(_config);