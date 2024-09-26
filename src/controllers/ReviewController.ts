import { Request, Response } from "express";
import { PreReview } from "../models/Review";
import { User } from "../models/User";

export class ReviewController {
    async createPreReview(req: Request, res: Response) {
        try {
            const { user, PreReviewAnswers } = req.body;
            const preReview = new PreReview({})
        }
    }
}
