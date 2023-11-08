import Modal from "antd/lib/modal";
import { useState } from "react";

type GameOverProps = {
	guessCount: number;
	guessLimit: number;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	gameWon: boolean;
	resultString: string;
	okButtonProps: {
		style: {
			backgroundColor: string;
		};
	};
};

const GameOverModal = ({
	isOpen,
	setIsOpen,
	okButtonProps,
	gameWon,
	guessCount,
	guessLimit,
	resultString,
}: GameOverProps): JSX.Element => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		// setCopied to true, then 1 second later, set it back to false
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	return (
		<Modal
			okButtonProps={okButtonProps}
			title={gameWon ? "Congrats!" : "Game Over"}
			open={isOpen}
			onOk={() => {
				setIsOpen(false);
			}}
			onCancel={() => {
				setIsOpen(false);
			}}
			cancelButtonProps={{ style: { display: "none" } }}
		>
			<div className="flex flex-col justify-center items-center relative">
				<p className="text-lg">
					{gameWon
						? `You solved the puzzle in ${guessCount} guesses!`
						: "You ran out of guesses!"}
				</p>
				<div
					className="flex flex-col justify-center items-center 
				text-xl 
				my-3 px-3 py-3 rounded-xl 
				bg-gray-100"
				>
					{resultString.split("\n").map((result, index) => {
						return (
							<p key={index} className="font-bold">
								{result}
							</p>
						);
					})}
				</div>
				<p className="my-2">
					{guessCount === 1
						? "You sure you're not cheating? :P"
						: guessCount === 2
						? "You're pretty good at this!"
						: guessCount === 3
						? "That was excellent!"
						: guessCount === 4
						? "Bet you can do better than that!"
						: guessCount === 5 && gameWon
						? "Phew! That was close :D"
						: "Better luck next time!"}
				</p>
				<button
					className="border border-solid border-black 
							rounded-xl px-5 py-2 w-fit 
							hover:bg-black hover:text-white
							transition-colors duration-100"
					onClick={() => {
						navigator.clipboard.writeText(
							`HexGuess ${guessCount}/${guessLimit}\n\n${resultString}`
						);
						handleCopy();
					}}
				>
					&#128203; Copy to Clipboard!
				</button>
			</div>
			<div className="relative">
				<div
					className="absolute -bottom-12 left-1/2 opacity-0 transition-all duration-500 px-2 py-1 rounded-md bg-gray-100"
					style={{
						transform: copied
							? "translateX(-50%)"
							: "translateX(-50%) translateY(2rem)",
						opacity: copied ? 100 : 0,
					}}
				>
					Copied!
				</div>
			</div>
		</Modal>
	);
};

export default GameOverModal;
