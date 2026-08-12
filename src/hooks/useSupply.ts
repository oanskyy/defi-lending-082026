"use client"

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseUnits } from "viem"

import { AaveV3Sepolia } from "@bgd-labs/aave-address-book"
import { ERC20_ABI } from "@/lib/abis"
import { AAVE_POOL_ABI } from "@/lib/abis"

export function useSupply() {
	const {
		data: hash,
		writeContract,
		isPending: isWriting,
		error
	} = useWriteContract()

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash
		})

	const supply = ({
		tokenAddress,
		amount,
		decimals,
		userAddress
	}: {
		tokenAddress: `0x${string}`
		amount: string
		decimals: number
		userAddress: `0x${string}`
	}) => {
		const parsedAmount = parseUnits(amount, decimals)

		// TODO: approve first
	}

	return {
		supply,
		hash,
		isWriting,
		isConfirming,
		isConfirmed,
		error
	}
}
