import { AaveV3Sepolia } from "@bgd-labs/aave-address-book"
import { IUiPoolDataProvider_ABI } from "@bgd-labs/aave-address-book/abis"
import type { PublicClient } from "viem"

export async function getAaveReserves(client: PublicClient) {
	return client.readContract({
		address: AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
		abi: IUiPoolDataProvider_ABI,
		functionName: "getReservesData",
		args: [AaveV3Sepolia.POOL_ADDRESSES_PROVIDER]
	})
}

// src/lib/aave.ts
//        │
//        ├── addresses
//        ├── ABI
//        └── Aave configuration

// lib/
// ├── aave/
// │   ├── client.ts
// │   ├── mapper.ts
// │   └── types.ts

// aave.ts
//     ↓
// knows Aave
//     ↓
// does NOT know
//     ↓
// how your app creates its RPC client
