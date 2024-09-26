import mongoose from "mongoose";
import { envs } from "../config/env";
import dotenv from "dotenv";
dotenv.config();

//TODO: Review code to connect to the detabase

export async function connectToDatabase(): Promise<void> {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
}
