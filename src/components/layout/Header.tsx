"use client"

// Header
// ├── Brand
// │
// └── Wallet area
//     ├── Network
//     ├── Balance
//     ├── Address
//     └── Disconnect

import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi"
import { formatUnits } from "viem"

export function Header() {
	const { address, isConnected, chain } = useAccount()

	const { connect, connectors } = useConnect()

	const { data: balance } = useBalance({
		address
	})

	const { disconnect } = useDisconnect()

	const connector = connectors[0]

	const formattedBalance = balance
		? formatUnits(balance.value, balance.decimals)
		: null

	const isSepolia = chain?.id === 11155111
	const isMainnet = chain?.id === 1

	return (
		<header className='border-b border-gray-200 bg-white'>
			<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
				{/* Brand */}
				<div className='flex items-center gap-3'>
					<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white'>
						◈
					</div>

					<span className='text-lg font-semibold tracking-tight text-gray-900'>
						DeFiLend
					</span>
				</div>

				{/* Wallet */}
				{isConnected ? (
					<div className='flex items-center gap-3'>
						{/* Network */}
						{chain && (
							<div className='flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2'>
								<span
									className={`h-2 w-2 rounded-full ${
										isSepolia
											? "bg-green-500"
											: isMainnet
												? "bg-red-500"
												: "bg-gray-400"
									}`}
								/>

								<span className='text-sm text-gray-700'>{chain.name}</span>
							</div>
						)}

						{/* Balance */}
						{formattedBalance && balance && (
							<div className='rounded-lg border border-gray-200 bg-gray-50 px-3 py-2'>
								<span className='font-mono text-sm text-gray-700'>
									{Number(formattedBalance).toFixed(4)} {balance.symbol}
								</span>
							</div>
						)}

						{/* Address + disconnect */}
						<div className='flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2'>
							<div className='flex items-center gap-2'>
								<span className='h-2 w-2 rounded-full bg-green-500' />

								<span className='font-mono text-sm text-gray-700'>
									{address?.slice(0, 6)}...
									{address?.slice(-4)}
								</span>
							</div>

							<button
								onClick={() => disconnect()}
								className='rounded-md px-2 py-1 text-xs text-gray-500 transition hover:bg-gray-200 hover:text-gray-900'
							>
								Disconnect
							</button>
						</div>
					</div>
				) : (
					<button
						onClick={() => {
							if (connector) {
								connect({ connector })
							}
						}}
						className='rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700'
					>
						Connect Wallet
					</button>
				)}
			</div>
		</header>
	)
}
