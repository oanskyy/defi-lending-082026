"use client"

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseUnits } from "viem"

import { ERC20_ABI, AAVE_POOL_ABI } from "@/lib/abis"
import { AaveV3Sepolia } from "@bgd-labs/aave-address-book"

export function useSupply() {
	const {
		writeContract,
		data: hash,
		isPending: isWalletPending,
		error
	} = useWriteContract()

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash
		})

	const supply = async (
		tokenAddress: `0x${string}`,
		amount: string,
		decimals: number
	) => {
		const parsedAmount = parseUnits(amount, decimals)

		await writeContract({
			address: tokenAddress,
			abi: ERC20_ABI,
			functionName: "approve",
			args: [AaveV3Sepolia.POOL, parsedAmount]
		})
	}

	return {
		supply,
		hash,
		isWalletPending,
		isConfirming,
		isConfirmed,
		error
	}
}
// The important mental model
//              useSupply()
//                  │
//         ┌────────┴────────┐
//         ▼                 ▼
//     APPROVE             SUPPLY
//         │                 │
//      ERC20              Aave Pool
//         │                 │
//         └────────┬────────┘
//                  ▼
//              blockchain

// And your state is now derived from the transaction lifecycle, rather than inventing random UI state:

// idle
//  ↓
// approving
//  ↓
// approved
//  ↓
// supplying
//  ↓
// success
