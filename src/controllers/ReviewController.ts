import { Request, Response } from "express";
import { PreReview } from "../models/Review";
import { User } from "../models/User";
import { HttpCode } from "../core/constants";

export class ReviewController {
	async createPreReview(req: Request, res: Response): Promise<void> {
		try {
			const { preReviewAnswers, connectedUserAddress } = req.body;
			const user = await User.findOne({ connectedUserAddress });
			if (!user) {
				res.status(HttpCode.NOT_FOUND).json({ message: "User not found" });
				return;
			}
			const newPreReview = new PreReview({
				user: user._id,
				preReviewAnswers
			});
			await newPreReview.save();
			res.status(HttpCode.CREATED).json(newPreReview);
		} catch (error) {
			res.status(HttpCode.BAD_REQUEST).json({ message: "Error creating pre-review", error });
		}
	}

	async getPreReview(req: Request, res: Response): Promise<void> {
		try {
			const { connectedUserAddress } = req.params;
			const user = await User.findOne({ connectedUserAddress });
			if (!user) {
				res.status(HttpCode.NOT_FOUND).json({ message: "User not found" });
				return;
			}
			const preReviews = await PreReview.find({ user: user._id });
			res.json(preReviews);
		} catch (error) {
			res.status(HttpCode.BAD_REQUEST).json({ message: "Error fetching pre-reviews", error });
		}
	}
}
