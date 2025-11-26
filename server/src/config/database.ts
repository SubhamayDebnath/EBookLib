import { connect } from "mongoose";
import { config } from "./config.ts";

const connectDatabase = async() => {
  try {
    const {connection} = await connect(config.MONGO_URI as string);
    console.log("Database connected: ", connection.name);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectDatabase;