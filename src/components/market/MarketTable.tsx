import type { Asset } from "@/types/lending"

type MarketTableProps = {
	assets: Asset[]
}

export function MarketTable({ assets }: MarketTableProps) {
	return (
		<section className='mx-auto mt-6 max-w-7xl px-4 sm:mt-10 sm:px-6'>
			<div className='mb-5'>
				<h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
					Market
				</h1>

				<p className='mt-1 text-sm text-gray-500'>
					Supply and borrow rates across supported assets
				</p>
			</div>

			<div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
				<div className='overflow-x-auto'>
					<table className='w-full text-left'>
						<thead className='border-b border-gray-200 bg-gray-50'>
							<tr>
								<th className='px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500'>
									Asset
								</th>

								<th className='px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500'>
									Supply APY
								</th>

								<th className='px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500'>
									Borrow APY
								</th>

								<th className='px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500'>
									Liquidity
								</th>

								<th className='px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500'>
									Utilization
								</th>
							</tr>
						</thead>

						<tbody className='divide-y divide-gray-100'>
							{assets.map(asset => (
								<tr key={asset.address} className='transition hover:bg-gray-50'>
									<td className='px-6 py-4'>
										<div className='flex items-center gap-3'>
											<div className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700'>
												{asset.symbol.slice(0, 2)}
											</div>

											<span className='font-medium text-gray-900'>
												{asset.symbol}
											</span>
										</div>
									</td>

									<td className='px-6 py-4 text-right font-mono text-sm text-emerald-600'>
										{asset.supplyAPY.toFixed(2)}%
									</td>

									<td className='px-6 py-4 text-right font-mono text-sm text-gray-700'>
										{asset.borrowAPY.toFixed(2)}%
									</td>

									<td className='px-6 py-4 text-right font-mono text-sm text-gray-700'>
										{asset.liquidity.toLocaleString()}
									</td>

									<td className='px-6 py-4'>
										<div className='flex items-center justify-end gap-3'>
											<div className='h-2 w-20 overflow-hidden rounded-full bg-gray-100'>
												<div
													className='h-full rounded-full bg-gray-400'
													style={{
														width: `${Math.min(asset.utilizationRate, 100)}%`
													}}
												/>
											</div>

											<span className='w-12 text-right font-mono text-sm text-gray-600'>
												{asset.utilizationRate.toFixed(1)}%
											</span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	)
}
