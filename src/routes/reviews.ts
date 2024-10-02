import express from "express";
import { ReviewController } from "../controllers/ReviewController";

const reviewRouter = express.Router();
const reviewController = new ReviewController();

/**
 * Routes for the pre-review endpoints to be used in the {@link server.ts} file
 * @param {express.Router} reviewRouter - Express router object
 * @param {ReviewController} reviewController - ReviewController object
 * @returns {express.Router} - Express router object with the pre-review routes
 */
reviewRouter.post("/", reviewController.createPreReview);
reviewRouter.get("/user/:userId", reviewController.getPreReviewsByUser);

export default reviewRouter;
