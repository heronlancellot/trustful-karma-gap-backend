import mongoose from "mongoose";

//TODO: Create a typing for user address
const userSchema = new mongoose.Schema({
	connectedUserAddress: { type: String, required: true, unique: true },
	createdAt: Date,
	updatedAt: Date
});

export const User = mongoose.model("User", userSchema);
