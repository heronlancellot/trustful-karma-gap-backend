import { Request, Response, NextFunction } from "express";
import { HttpCode } from "../core/constants";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	console.error(err.stack);
	res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong!" });
}
