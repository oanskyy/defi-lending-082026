"use client"
// approve → wait → supply → wait → refresh → optimistic UX
// multi-step async workflow.

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { parseUnits } from "viem"

import { ERC20_ABI, AAVE_POOL_ABI } from "@/lib/abis"
import { AaveV3Sepolia } from "@bgd-labs/aave-address-book"

export function useSupply() {
	const {
		writeContractAsync,
		data: approvalHash,
		isPending: isApprovalPending,
		error: approvalError
	} = useWriteContract()

	const {
		writeContractAsync: writeSupply,
		data: supplyHash,
		isPending: isSupplyPending,
		error: supplyError
	} = useWriteContract()

	const { isLoading: isApprovalConfirming, isSuccess: isApprovalConfirmed } =
		useWaitForTransactionReceipt({
			hash: approvalHash
		})

	const { isLoading: isSupplyConfirming, isSuccess: isSupplyConfirmed } =
		useWaitForTransactionReceipt({
			hash: supplyHash
		})

	const supply = async (
		tokenAddress: `0x${string}`,
		amount: string,
		decimals: number,
		userAddress: `0x${string}`
	) => {
		const parsedAmount = parseUnits(amount, decimals)

		// 1. Approve
		await writeContractAsync({
			address: tokenAddress,
			abi: ERC20_ABI,
			functionName: "approve",
			args: [AaveV3Sepolia.POOL, parsedAmount]
		})

		// approve submitted
		//       ↓
		// await writeContractAsync()
		//       ↓
		// returns transaction hash
		//       ↓
		// SUPPLY STARTS

		// 2. Supply
		await writeSupply({
			address: AaveV3Sepolia.POOL,
			abi: AAVE_POOL_ABI,
			functionName: "supply",
			args: [tokenAddress, parsedAmount, userAddress, 0]
		})
	}

	return {
		supply,

		approvalHash,
		supplyHash,

		isApprovalPending,
		isApprovalConfirming,
		isApprovalConfirmed,

		isSupplyPending,
		isSupplyConfirming,
		isSupplyConfirmed,

		approvalError,
		supplyError
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
