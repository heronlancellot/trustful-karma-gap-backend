import express, { Express, Request, Response } from "express";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { connectToDatabase } from "./core/database/databaseConnection";
import reviewRouter from "./routes/reviews";
import { errorHandler } from "./middleware/errorHandler";
import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from "./core/constants";
import cors from "cors";

interface ServerOptions {
	port: number;
	apiPrefix: string;
}

/**
 * Class to manage the server
 * @property {Express} app - Express app object
 * @property {number} port - Port number to listen on
 * @property {string} apiPrefix - API prefix for the routes
 * @returns {Server} - Server object
 */
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
		this.app.use(cors());
		//  limit repeated requests to public APIs
		this.app.use(
			rateLimit({
				max: ONE_HUNDRED,
				windowMs: SIXTY * SIXTY * ONE_THOUSAND,
				message: "Too many requests from this IP, please try again in one hour"
			})
		);

		// Test rest api
		this.app.use(`${this.apiPrefix}/reviews`, reviewRouter);

		this.app.use(errorHandler);

		this.app.set("trust proxy", 1);

		this.app.listen(this.port, "0.0.0.0", () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
