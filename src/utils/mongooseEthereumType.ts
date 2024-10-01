import mongoose from "mongoose";

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

mongoose.Schema.Types.EthereumAddress = EthereumAddressType as any;

declare module "mongoose" {
	namespace Schema {
		namespace Types {
			class EthereumAddress extends mongoose.SchemaType {}
		}
	}
}

export default EthereumAddressType;
