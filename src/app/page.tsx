"use client";

import dynamic from "next/dynamic";
import Information from "../components/Information";

// replace with <p>Loading...</p>
const HexGuess = dynamic(() => import("../components/HexGuess"), {
	loading: () => (
		<p className="text-center mt-10 text-2xl">Loading Game...</p>
	),
	ssr: false,
});

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center py-20 px-1 md:px-5 lg:px-0">
			<div className="max-w-7xl flex flex-col items-center">
				<div className="w-full md:2/3 lg:w-1/2">
					<Information />
					<div className="w-full">
						<HexGuess />
					</div>
				</div>
			</div>
		</main>
	);
}
