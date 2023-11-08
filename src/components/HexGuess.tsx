"use client";

import React, { useState, useEffect } from "react";
import GameOverModal from "./GameOverModal";

export default function HexCodle() {
	const acceptableHexChars: string[] = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
	];

	// returns RGB and hex value
	const generateColor = () => {
		const hex = Math.floor(Math.random() * 16777215)
			.toString(16)
			.toUpperCase()
			.padStart(6, "0")
			.toUpperCase();
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		return [`rgb(${r},${g},${b})`, `#${hex}`];
	};

	const processGuess = (guess: string) => {
		const resultArray: string[] = [];
		// compare each character
		// if character is correct, append letter G
		// if character's index in acceptableHexChars < index of the correct character, append letter L (Too Low)
		// if character's index in acceptableHexChars > the index of the correct character, append letter H (Too High)

		for (let i = 0; i < guess.length; i++) {
			let difference = Math.abs(
				acceptableHexChars.indexOf(guess[i]) -
					acceptableHexChars.indexOf(color[1][i])
			);
			let larger =
				acceptableHexChars.indexOf(guess[i]) >
				acceptableHexChars.indexOf(color[1][i]);

			// ⏬⏫🔽🔼
			if (guess[i] === color[1][i]) {
				resultArray.push("✅");
			} else if (difference >= 3 && !larger) {
				resultArray.push("⏫");
			} else if (difference < 3 && !larger) {
				resultArray.push("🔼");
			} else if (difference >= 3 && larger) {
				resultArray.push("⏬");
			} else {
				resultArray.push("🔽");
			}
		}

		return resultArray;
	};

	const [color, setColor] = useState(generateColor());
	const [guessedColor, setGuessedColor] = useState("");
	const [inputValue, setInputValue] = useState("#");
	const [guesses, setGuesses] = useState<string[]>([]);
	const [guessResults, setGuessResults] = useState<string[][]>([]);
	const [transparent, setTransparent] = useState<boolean>(true);
	const [guessCount, setGuessCount] = useState<number>(0); // 5 guesses
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [gameWon, setGameWon] = useState<boolean>(false); // if guess is correct, set to true
	const [isGameOverModalVisible, setIsGameOverModalVisible] =
		useState(false);
	const [resultString, setResultString] = useState<string>("");

	const showGameOverModal = () => {
		setIsGameOverModalVisible(true);
	};

	const guessLimit = 5;

	const newGame = () => {
		setColor(generateColor());
		setGuesses([]);
		setGuessResults([]);
		setGuessCount(0);
		setGameOver(false);
		setGameWon(false);
		setGuessedColor("");
		setTransparent(true);
		setInputValue("#");
	};

	useEffect(() => {
		setGameOver(guessCount === guessLimit || gameWon);
	}, [guessCount, gameWon]);

	useEffect(() => {
		if (guessedColor === color[1]) {
			setGameWon(true);
		}
	}, [color, guessedColor]);

	useEffect(() => {
		setResultString(
			guessResults.map((result) => result.slice(1).join("")).join("\n")
		);
	}, [guessResults]);

	useEffect(() => {
		if (gameOver) {
			showGameOverModal();
		}
	}, [gameOver]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (inputValue.length !== 7) {
			return;
		}
		setGuessCount(guessCount + 1);
		setTransparent(false);
		setGuessedColor(inputValue);
		setGuessResults([...guessResults, processGuess(inputValue)]);
		setGuesses([...guesses, inputValue]);
		setInputValue("#");
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value[0] !== "#") {
			setInputValue(`#`);
			return;
		}

		if (gameOver) {
			return;
		}

		// if character is not a valid hex character, do not update input value
		if (
			!acceptableHexChars.includes(
				e.target.value[e.target.value.length - 1].toUpperCase()
			) &&
			e.target.value.length !== 1
		) {
			return;
		}

		setInputValue(e.target.value.toUpperCase());
	};

	return (
		<div className="w-full flex flex-col justify-center items-center mt-10">
			<GameOverModal
				isOpen={isGameOverModalVisible}
				setIsOpen={setIsGameOverModalVisible}
				okButtonProps={{
					style: { backgroundColor: "#3a743a" },
				}}
				guessCount={guessCount}
				gameWon={gameWon}
				guessLimit={guessLimit}
				resultString={resultString}
			/>
			<div className="w-full bg-white text-black rounded-xl px-0 md:px-10 py-8 text-center">
				<div className="w-full flex flex-row justify-center items-center">
					<div className="flex flex-col w-1/3">
						<h2 className="text-center font-bold text-xl">
							Target
						</h2>
						<div
							style={{ backgroundColor: color[0] }}
							className="aspect-square rounded-xl border border-black border-solid"
						></div>
					</div>
					<div className="flex flex-col w-1/3 ml-5">
						<h2 className="text-center font-bold text-xl">
							Your Guess
						</h2>
						<div
							style={{ backgroundColor: guessedColor }}
							className={`aspect-square rounded-xl border border-black border-solid ${
								transparent ? "transparentBg" : ""
							}`}
						></div>
					</div>
				</div>
				<div className="w-full flex flex-row pb-6">
					<form
						className="flex flex-row justify-center w-full mt-5"
						onSubmit={handleSubmit}
					>
						<input
							type="text"
							className="w-[6.5em] border border-black border-solid rounded-md px-3 py-2 font-[Roboto_Mono,_monospace] text-xl"
							maxLength={7}
							value={inputValue}
							onChange={(e) => handleInputChange(e)}
							style={{
								cursor: gameOver
									? "not-allowed"
									: "text",
								pointerEvents: gameOver
									? "none"
									: "auto",
							}}
						/>
						<input
							type="submit"
							value="Guess!"
							className="bg-green-500 hover:bg-green-400 text-white rounded-xl px-5 py-2 ml-2 transition-colors duration-100"
							style={{
								cursor: gameOver
									? "not-allowed"
									: "pointer",
							}}
						/>
					</form>
				</div>
				<div className="flex flex-col justify-center items-center">
					{!gameOver && (
						<span
							className="text-lg"
							style={{
								display: gameOver ? "none" : "block",
							}}
						>
							You have {guessLimit - guessCount} guess
							{guessLimit - guessCount > 1 && "es"}
							{guessCount !== 0 && " left"}!
						</span>
					)}
					{gameOver &&
						(gameWon ? "You guessed it!" : "You lost :(")}

					{gameOver && (
						// on hover, make it greener
						<button
							className="bg-green-500 hover:bg-green-400 text-white rounded-xl px-5 py-2 mt-5 w-1/2 transition-colors duration-100"
							onClick={() => newGame()}
						>
							Play Again
						</button>
					)}
				</div>
			</div>
			<div className="w-full bg-white text-black rounded-xl px-10 py-8 text-center mt-5">
				<h1 className="font-bold text-xl mb-3">Guesses</h1>
				<div className="w-full flex flex-col-reverse justify-start font-['Roboto_Mono',_monospace]">
					{guesses.length === 0 && "Guesses will appear here!"}
					{guesses.map((guess, guessIndex) => {
						return (
							<div
								className="flex flex-row justify-center mb-2"
								key={guessIndex}
							>
								{guess
									.split("")
									.map((char, resultIndex) => {
										if (char === "#") {
											return;
										}

										return (
											<div
												key={resultIndex}
												className="flex flex-col justify-start
											rounded-xl border-4 border-solid px-3 py-2
											mx-2 scale"
												style={{
													borderColor:
														guesses[
															guessIndex
														],
													transform:
														guessIndex ===
														guessCount -
															1
															? "scale(1.2)"
															: "scale(1)",
													marginBottom:
														guessIndex ===
														guessCount -
															1
															? "10px"
															: "0px",
												}}
											>
												<span className="text-xl">
													{char}
												</span>
												<span>
													{
														guessResults[
															guessIndex
														][
															resultIndex
														]
													}
												</span>
											</div>
										);
									})}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
