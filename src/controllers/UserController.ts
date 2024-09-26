import { Request, Response } from "express";
import { User } from "../models/User";

export class UserController {
	async createUser(req: Request, res: Response) {
		try {
			const { connectedUserAddress } = req.body;
			const user = new User({ connectedUserAddress });
			await user.save();
			res.status(201).json(user);
		} catch (error) {
			res.status(400).json({ message: "Error creating user", error });
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const { blockchainAddress } = req.params;
			const user = await User.findOne({ blockchainAddress });
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			res.json(user);
		} catch (error) {
			res.status(400).json({ message: "Error fetching user", error });
		}
	}
}
