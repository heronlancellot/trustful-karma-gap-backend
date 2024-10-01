import mongoose from "mongoose";
import { Category, ReceivedGrant } from "../core/constants";

const preReviewSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	preReviewAnswers: {
		category: { type: String, enum: Object.values(Category), required: true },
		otherCategoryDescriptions: {
			type: String,
			required: function (this: { category: string }) {
				return this.category === Category.Other;
			}
		},
		receivedGrant: { type: String, enum: Object.values(ReceivedGrant), required: true }
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

export const PreReview = mongoose.model("PreReview", preReviewSchema);
