export const ERC20_ABI = [
	{
		type: "function",
		name: "approve",
		stateMutability: "nonpayable",
		inputs: [
			{
				name: "spender",
				type: "address"
			},
			{
				name: "amount",
				type: "uint256"
			}
		],
		outputs: [
			{
				name: "",
				type: "bool"
			}
		]
	}
] as const

export const AAVE_POOL_ABI = [
	{
		type: "function",
		name: "supply",
		stateMutability: "nonpayable",
		inputs: [
			{
				name: "asset",
				type: "address"
			},
			{
				name: "amount",
				type: "uint256"
			},
			{
				name: "onBehalfOf",
				type: "address"
			},
			{
				name: "referralCode",
				type: "uint16"
			}
		],
		outputs: []
	}
] as const

// abis.ts
//    │
//    ├── ERC20_ABI
//    │       └── approve()
//    │
//    └── AAVE_POOL_ABI
//            └── supply()
