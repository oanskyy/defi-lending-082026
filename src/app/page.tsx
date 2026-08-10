"use client"

import { useEffect, useState } from "react"
import { usePublicClient } from "wagmi"

import { getAaveReserves } from "@/lib/protocolAave"
import { mapAaveReserveToAsset } from "@/lib/protocolAaveMapper"

import type { Asset } from "@/types/lending"

import { Header } from "@/components/layout/Header"
import { MarketTable } from "@/components/market/MarketTable"

export default function Home() {
	const client = usePublicClient()

	const [assets, setAssets] = useState<Asset[]>([])

	useEffect(() => {
		if (!client) {
			console.log("NO PUBLIC CLIENT")
			return
		}

		console.log("CLIENT EXISTS", client)

		async function load() {
			console.log("LOAD STARTED")

			const result = await getAaveReserves(client)

			console.log("RAW RESULT", result)

			const [reserves, baseCurrencyInfo] = result

			console.log("RAW RESERVES", reserves)
			console.log("BASE CURRENCY INFO", baseCurrencyInfo)

			const assets = reserves.map(mapAaveReserveToAsset)

			console.log("DOMAIN ASSETS", assets)

			setAssets(assets)
		}

		load()
	}, [client])

	return (
		<main>
			<Header />

			<MarketTable assets={assets} />
		</main>
	)
}
