import { create } from "domain";
import mongoose from "mongoose";

const preReviewSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	preReviewAnswers: {
		category: { type: String, required: true },
		receivedGrant: { type: String, required: true }
	},
	createdAt: Date,
	updatedAt: Date
});

export const PreReview = mongoose.model("PreReview", preReviewSchema);
