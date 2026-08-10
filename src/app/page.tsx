import { Header } from "@/components/layout/Header"
import { AaveV3Sepolia } from "@bgd-labs/aave-address-book"

console.log(AaveV3Sepolia)

export default function Home() {
	console.log(AaveV3Sepolia)
	return (
		<main>
			{" "}
			Home
			<Header />
		</main>
	)
}
