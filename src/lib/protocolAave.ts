import { AaveV3Sepolia } from "@bgd-labs/aave-address-book"
import { IUiPoolDataProvider_ABI } from "@bgd-labs/aave-address-book/abis"
import { ERC20_ABI, AAVE_POOL_ABI } from "@/lib/abis"

// import type { PublicClient } from "viem"
import { createPublicClient, http } from "viem"
import { sepolia } from "viem/chains"

const publicClient = createPublicClient({
	chain: sepolia,
	transport: http()
})

export async function getAaveReserves() {
	return publicClient.readContract({
		address: AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
		abi: IUiPoolDataProvider_ABI,
		functionName: "getReservesData",
		args: [AaveV3Sepolia.POOL_ADDRESSES_PROVIDER]
	})
}

// Full read path before touching writes.

// Aave contracts
//       ↓
// readContract()
//       ↓
// raw Aave reserve data
//       ↓
// Aave mapper
//       ↓
// Asset domain model
//       ↓
// MarketTable
//       ↓
// USER SEES REAL MARKET DATA

// So Milestone 3.4 established:

// "I can take raw on-chain protocol data, isolate the protocol-specific infrastructure, transform it into an application/domain model, and render that model without the UI knowing anything about Aave."

// Aave infrastructure
//        │
//        ├── Aave addresses
//        ├── Aave ABIs
//        ├── Aave raw contract calls
//        └── Aave-specific configuration

//    src/lib/aave.ts
//        │
//        ├── addresses
//        ├── ABI
//        └── Aave configuration

// src/lib/
// └── protocolAave/
//     ├── client.ts       ← readContract / writeContract plumbing
//     ├── contracts.ts    ← addresses + ABIs
//     ├── mapper.ts       ← Aave → domain
//     └── types.ts        ← Aave raw types

// aave.ts
//     ↓
// knows Aave
//     ↓
// does NOT know
//     ↓
// how your app creates its RPC client
