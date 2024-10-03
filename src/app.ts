import { envs } from "./core/config/env";
import { Server } from "./server";

main();

async function main(): Promise<void> {
	const server = new Server({
		port: envs.PORT,
		apiPrefix: "/api"
	});
	await server.start();
}
