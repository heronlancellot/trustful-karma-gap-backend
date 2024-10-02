import { Request, Response, NextFunction } from "express";
import { HttpCode } from "../core/constants";

/**
 * Function used in the <server.ts> file to handle errors
 * @param err - Error object containing the error details
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns {void} - Returns nothing
 */
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	console.error(err.stack);
	res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong!" });
}
