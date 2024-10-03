import mongoose from "mongoose";

/**
 * Custom type for the Ethereum address format
 * @extends {mongoose.SchemaType}
 * @property {string} key - Key of the field in the MongoDB document
 * @property {mongoose.SchemaTypeOptions<any>} options - Options for the custom type
 */
class EthereumAddressType extends mongoose.SchemaType {
	constructor(key: string, options: mongoose.SchemaTypeOptions<any>) {
		super(key, options, "EthereumAddress");
	}

	cast(val: string): string {
		if (typeof val !== "string") {
			throw new Error("EthereumAddress: " + val + " is not a string");
		}
		if (!/^0x[a-fA-F0-9]{40}$/.test(val)) {
			throw new Error("EthereumAddress: " + val + " is not a valid Ethereum address");
		}
		return val.toLowerCase();
	}
}

// Register the custom type
mongoose.Schema.Types.EthereumAddress = EthereumAddressType;

// Add type definition
declare module "mongoose" {
	namespace Schema {
		namespace Types {
			export class EthereumAddress extends mongoose.SchemaType {}
		}
	}
}

export default EthereumAddressType;
