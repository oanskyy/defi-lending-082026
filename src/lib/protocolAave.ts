import { AaveV3Sepolia } from "@bgd-labs/aave-address-book"
import { IUiPoolDataProvider_ABI } from "@bgd-labs/aave-address-book/abis"
import { ERC20_ABI, AAVE_POOL_ABI } from "@/lib/abis"

import type { PublicClient } from "viem"


export async function getAaveReserves(client: PublicClient) {
	return client.readContract({
		address: AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
		abi: IUiPoolDataProvider_ABI,
		functionName: "getReservesData",
		args: [AaveV3Sepolia.POOL_ADDRESSES_PROVIDER]
	})
}

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
