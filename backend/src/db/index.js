import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME,
    });
    console.log(
      `\nMONGODB connected: \nHost: ${connectionInstance.connection.host} \nName: ${connectionInstance.connection.name} \nDatabase Port: ${connectionInstance.connection.port} \nDatabase Name: ${connectionInstance.connection.db.databaseName}`
    );
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
