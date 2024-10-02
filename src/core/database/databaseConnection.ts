import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * Function used in the {@link_server.ts} file to connect to the MongoDB database
 * @returns {Promise<void>} - Promise that resolves when the connection is successful
 */
export async function connectToDatabase(): Promise<void> {
	const mongoUrl = process.env.MONGO_URL;

	if (!mongoUrl) {
		throw new Error("MONGO_URL is not defined in the environment variables");
	}

	try {
		await mongoose.connect(mongoUrl);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
}
