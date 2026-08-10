import type { AaveReserve } from "@/types/protocolAave"
import type { Asset } from "@/types/lending"

export function mapAaveReserveToAsset(reserve: AaveReserve): Asset {
	return {
		address: reserve.underlyingAsset,
		symbol: reserve.symbol,
		decimals: Number(reserve.decimals),

		supplyAPY: 0,
		borrowAPY: 0,
		liquidity: 0,
		utilizationRate: 0
	}
}

// We're establishing the shape of the transformation first.
// AaveReserve
//      │
//      ├── underlyingAsset ──→ address
//      ├── symbol ───────────→ symbol
//      ├── decimals ─────────→ decimals
//      │
//      ├── liquidityRate ────→ supplyAPY
//      ├── variableBorrowRate → borrowAPY
//      ├── availableLiquidity → liquidity
//      │
//      └── debt ─────────────→ utilizationRate


// I deliberately keep the protocol model separate from the application domain model. Aave's AggregatedReserveData contains protocol-specific fields and representations that aren't meaningful to the UI. The mapper acts as an anti-corruption boundary: it normalizes and curates that external data into the Asset model our application actually needs. That means if we replace Aave with another lending protocol, the protocol adapter and mapper can change without forcing changes through the React component tree.

// aave.ts
//    ↓
// Aave infrastructure
// addresses / contract reads

// aave.ts types
//    ↓
// what Aave gives us

// aaveMapper.ts
//    ↓
// Aave → application model

// lending.ts
//    ↓
// what OUR application needs

