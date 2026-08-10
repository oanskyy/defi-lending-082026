// That's another useful boundary principle:
// Model the external data you consume, not everything the external system happens to expose.

export type AaveReserve = {
	underlyingAsset: string
	symbol: string
	decimals: bigint
	liquidityRate: bigint
	variableBorrowRate: bigint
	availableLiquidity: bigint
	totalScaledVariableDebt: bigint
}
