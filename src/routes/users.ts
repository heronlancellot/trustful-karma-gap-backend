import express from "express";
import { UserController } from "../controllers/UserController";

const userRouter = express.Router();
const userController = new UserController();

/**
 * Routes for the user endpoints to be used in the {@link server.ts} file
 * @param {express.Router} userRouter - Express router object
 * @param {UserController} userController - UserController object
 * @returns {express.Router} - Express router object with the user routes
 */
userRouter.post("/", userController.createUser);
userRouter.get("/:connectedUserAddress", userController.getUser);

export default userRouter;
