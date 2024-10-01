import mongoose from "mongoose";
import { EthereumAddress } from "../core/constants";
import "../utils/mongooseEthereumType";

const userSchema = new mongoose.Schema({
	connectedUserAddress: { type: mongoose.Schema.Types.EthereumAddress, required: true, unique: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", userSchema);
