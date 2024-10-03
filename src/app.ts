import { Server } from "./server";
import dotenv from "dotenv";

dotenv.config();

/**
 * Main function to start the server
 * @returns {Promise<void>} - Promise that resolves when the server is started
 */
async function main() {
	const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

	if (isNaN(port)) {
		console.error("Invalid PORT specified in environment variables");
		process.exit(1);
	}

	const server = new Server({
		port: port,
		apiPrefix: "/api/v1"
	});

	await server.start();
}

main().catch((error) => {
	console.error("Failed to start server:", error);
	process.exit(1);
});
