import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.post("/", userController.createUser);
router.get("/:connectedUserAddress", userController.getUser);

export default router;
