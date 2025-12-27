import { connect } from "mongoose";
import { config } from "./config.js";

const databaseConnection = async () =>{
    try {
    const { connection } = await connect(config.mongoURI);
    console.log("Database connected: ", connection.host);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
}

export default databaseConnection;