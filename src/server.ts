// import express, { type Request, type Response } from "express";
import express, { Express, Request, Response } from "express";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { connectToDatabase } from "./core/database/databaseConnection";
import userRoutes from "./routes/users";
import reviewRoutes from "./routes/review";
import { errorHandler } from "./middleware/errorHandler";
import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from "./core/constants";

interface ServerOptions {
	port: number;
	apiPrefix: string;
}

export class Server {
	private readonly app: Express = express();
	private readonly port: number;
	private readonly apiPrefix: string;

	constructor(options: ServerOptions) {
		const { port, apiPrefix } = options;
		this.port = port;
		this.apiPrefix = apiPrefix;
	}

	async start(): Promise<void> {
		await connectToDatabase();
		//* Middlewares
		this.app.use(express.json()); // parse json in request body (allow raw)
		this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
		this.app.use(compression());
		//  limit repeated requests to public APIs
		this.app.use(
			rateLimit({
				max: ONE_HUNDRED,
				windowMs: SIXTY * SIXTY * ONE_THOUSAND,
				message: "Too many requests from this IP, please try again in one hour"
			})
		);

		// Test rest api
		this.app.use(`${this.apiPrefix}/users`, userRoutes);
		this.app.use(`${this.apiPrefix}/reviews`, reviewRoutes);

		this.app.use(errorHandler);

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
