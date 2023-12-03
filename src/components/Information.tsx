import { useState } from "react";
import WhatIsHexModal from "./WhatIsHexModal";
import RulesModal from "./RulesModal";
import CreditsModal from "./CreditsModal";

export default function Information() {
	const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
	const [isRulesModalVisible, setIsRulesModalVisible] = useState(false);
	const [isCreditsModalVisible, setIsCreditsModalVisible] = useState(false);

	const showInfoModal = () => {
		setIsInfoModalVisible(true);
	};

	const showRulesModal = () => {
		setIsRulesModalVisible(true);
	};

	const showCreditsModal = () => {
		setIsCreditsModalVisible(true);
	};

	return (
		<div className="bg-white text-black rounded-xl px-10 py-8 text-center">
			<h1 className="font-bold text-4xl font-['Roboto_Mono',_monospace] mb-5">
				HexGuess
			</h1>
			<p className="text-lg">
				You will have 5 attempts to correctly guess the hex code of
				the colour displayed on screen. After each guess, you will
				see if your guess was too low, too high, or spot on! Use
				these as guides to decipher how close your guess is.
			</p>
			<div className="flex flex-col sm:flex-row flex-wrap w-full justify-center items-center mt-5 gap-y-1">
				<button
					className="bg-blue-600 text-white
					hover:text-blue-600 hover:bg-white
					transition-colors duration-150
					border border-solid border-blue-600
					px-2 py-2 rounded-lg mx-2 whitespace-nowrap"
					onClick={showInfoModal}
				>
					WHAT IS HEX?
				</button>
				<div className="flex flex-row">
					<button
						className="bg-blue-600 text-white
						hover:text-blue-600 hover:bg-white
						transition-colors duration-150
						border border-solid border-blue-600
						px-2 py-2 rounded-lg mx-2"
						onClick={showRulesModal}
					>
						RULES
					</button>
					<button
						className="bg-blue-600 text-white
						hover:text-blue-600 hover:bg-white
						transition-colors duration-150
						border border-solid border-blue-600
						px-2 py-2 rounded-lg mx-2"
						onClick={showCreditsModal}
					>
						CREDITS
					</button>
				</div>
			</div>
			<WhatIsHexModal
				isOpen={isInfoModalVisible}
				setIsOpen={setIsInfoModalVisible}
				okButtonProps={{
					style: { backgroundColor: "#3a743a" },
				}}
			/>
			<RulesModal
				isOpen={isRulesModalVisible}
				setIsOpen={setIsRulesModalVisible}
				okButtonProps={{
					style: { backgroundColor: "#3a743a" },
				}}
			/>
			<CreditsModal
				isOpen={isCreditsModalVisible}
				setIsOpen={setIsCreditsModalVisible}
				okButtonProps={{
					style: { backgroundColor: "#3a743a" },
				}}
			/>
		</div>
	);
}
