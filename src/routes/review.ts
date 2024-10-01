import express from "express";
import { ReviewController } from "../controllers/ReviewController";

const reviewRouter = express.Router();
const reviewController = new ReviewController();

reviewRouter.post("/", reviewController.createPreReview);
reviewRouter.get("/:userId", reviewController.getPreReview);

export default reviewRouter;
