import mongoose from "mongoose";
import "../utils/mongooseEthereumType";

/**
 * Schema definition for the user model
 * @property {string} connectedUserAddress - Ethereum address of the user
 * @property {Date} createdAt - Date when the user document was created
 * @property {Date} updatedAt - Date when the user document was last updated
 * @returns {Schema} - Mongoose schema definition for the user model
 * @throws {Error} - Throws an error if the connectedUserAddress is not a valid Ethereum address or if the connectedUserAddress is not unique
 */
const userSchema = new mongoose.Schema({
	connectedUserAddress: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (v: string) {
				return /^0x[a-fA-F0-9]{40}$/.test(v);
			},
			message: (props: any) => `${props.value} is not a valid Ethereum address!`
		}
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", userSchema);
