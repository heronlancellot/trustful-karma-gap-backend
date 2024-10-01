import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { HttpCode } from "../core/constants";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const connectedUserAddress = req.headers["x-blockchain-address"];
	if (!connectedUserAddress) {
		return res.status(HttpCode.UNAUTHORIZED).json({ message: "No blockchain address provided" });
	}
	const user = await User.findOne({ connectedUserAddress });
	if (!user) {
		return res.status(HttpCode.UNAUTHORIZED).json({ message: "User not found" });
	}
	(req as any).user = user;
	next();
}
