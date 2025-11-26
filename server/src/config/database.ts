import { connect } from "mongoose";
import { config } from "./config.ts";

const connectDatabase = async() => {
  try {
    const { connection } = await connect(config.databaseURL as string);
    console.log("Database connected: ", connection.host);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectDatabase;