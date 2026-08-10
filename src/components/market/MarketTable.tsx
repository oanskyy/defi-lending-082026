import type { Asset } from "@/types/lending"

type MarketTableProps = {
	assets: Asset[]
}

export function MarketTable({ assets }: MarketTableProps) {
	return (
		<table>
			<thead>
				<tr>
					<th>Asset</th>
					<th>Supply APY</th>
					<th>Borrow APY</th>
					<th>Liquidity</th>
					<th>Utilization</th>
				</tr>
			</thead>

			<tbody>
				{assets.map(asset => (
					<tr key={asset.address}>
						<td>{asset.symbol}</td>
						<td>{asset.supplyAPY}%</td>
						<td>{asset.borrowAPY}%</td>
						<td>{asset.liquidity}</td>
						<td>{asset.utilizationRate}%</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
