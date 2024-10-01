import { Request, Response } from "express";
import { User } from "../models/User";
import { HttpCode } from "../core/constants";

export class UserController {
	async createUser(req: Request, res: Response): Promise<void> {
		try {
			const { connectedUserAddress } = req.body;
			const user = new User({ connectedUserAddress });
			await user.save();
			res.status(HttpCode.CREATED).json(user);
		} catch (error) {
			res.status(HttpCode.BAD_REQUEST).json({ message: "Error creating user", error });
		}
	}

	async getUser(req: Request, res: Response): Promise<void> {
		try {
			const { connectedUserAddress } = req.params;
			const user = await User.findOne({ connectedUserAddress });
			if (!user) {
				res.status(HttpCode.NOT_FOUND).json({ message: "User not found" });
			}
			res.json(user);
		} catch (error) {
			res.status(HttpCode.BAD_REQUEST).json({ message: "Error fetching user", error });
		}
	}
}
