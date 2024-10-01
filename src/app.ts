import { envs } from "./core/config/env";
import { Server } from "./server";

async function main() {
	const server = new Server({
		port: envs.PORT,
		apiPrefix: "/api/v1"
	});

	await server.start();
}

main().catch((error) => {
	console.error("Failed to start server:", error);
	process.exit(1);
});
