import { Request, Response } from "express";
import { User } from "../models/User";
import { HttpCode } from "../core/constants";

/**
 * Class to manage the CRUD operations for the user model
 */
export class UserController {
	/**
	 * Function to create a user document in MongoDB
	 * @param req - Express request object containing the user data
	 * @param res - Express response object to send the user document
	 * @returns {Promise<void>} - Promise that resolves when the user document is created
	 */
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

	/**
	 * Function to get a user document in MongoDB
	 * @param req - Express request object containing the user data
	 * @param res - Express response object to send the user document
	 * @returns {Promise<void>} - Promise that resolves when the user document is created
	 */
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
