/* eslint-disable @typescript-eslint/no-magic-numbers */

export const SIXTY = 60 as const;
export const ONE_HUNDRED = 100 as const;
export const ONE_THOUSAND = 1000 as const;

export enum HttpCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}

export enum Category {
	DevTooling = "Dev tooling",
	Education = "Education",
	MarketingAndGrowth = "Marketing and Growth",
	DeFi = "DeFi",
	DAOsAndGovernance = "DAOs and Governance",
	Community = "Community",
	Gaming = "Gaming",
	PublicGoods = "Public Goods",
	ZKAndPrivacy = "ZK and privacy",
	Other = "Other"
}

export enum ReceivedGrant {
	Yes = "Yes, I got approved",
	No = "No",
	Pending = "I don't have the answer yet"
}

export type EthereumAddress = `0x${string}`;
