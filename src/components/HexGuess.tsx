"use client";

import React, { useState, useEffect, useCallback } from "react";
import GameOverModal from "./GameOverModal";
import ShareAltOutlined from "@ant-design/icons/ShareAltOutlined";

type HexColor = [string, string];

const ACCEPTABLE_HEX_CHARS = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "A", "B", "C", "D", "E", "F",
];

const GUESS_LIMIT = 5;

const generateColor = (): HexColor => {
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .toUpperCase()
    .padStart(6, "0");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return [`rgb(${r},${g},${b})`, `#${hex}`];
};

const processGuess = (guess: string, answer: string) => {
  return guess.split("").map((char, i) => {
    if (char === answer[i]) return "✅";
    const diff = Math.abs(
      ACCEPTABLE_HEX_CHARS.indexOf(char) - ACCEPTABLE_HEX_CHARS.indexOf(answer[i])
    );
    const isLarger = ACCEPTABLE_HEX_CHARS.indexOf(char) > ACCEPTABLE_HEX_CHARS.indexOf(answer[i]);
    if (diff >= 3 && !isLarger) return "⏫";
    if (diff < 3 && !isLarger) return "🔼";
    if (diff >= 3 && isLarger) return "⏬";
    return "🔽";
  });
};

export default function HexCodle({ initialColor }: { initialColor?: HexColor }) {
  const [color, setColor] = useState<HexColor>(initialColor ?? generateColor());
  const [guessedColor, setGuessedColor] = useState("");
  const [inputValue, setInputValue] = useState("#");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessResults, setGuessResults] = useState<string[][]>([]);
  const [transparent, setTransparent] = useState(true);
  const [guessCount, setGuessCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isGameOverModalVisible, setIsGameOverModalVisible] = useState(false);
  const [resultString, setResultString] = useState("");

  const showGameOverModal = useCallback(() => setIsGameOverModalVisible(true), []);

  const newGame = useCallback(() => {
    setColor(generateColor());
    setGuesses([]);
    setGuessResults([]);
    setGuessCount(0);
    setGameOver(false);
    setGameWon(false);
    setGuessedColor("");
    setTransparent(true);
    setInputValue("#");
  }, []);

  useEffect(() => {
    setGameOver(guessCount === GUESS_LIMIT || gameWon);
  }, [guessCount, gameWon]);

  useEffect(() => {
    if (guessedColor === color[1]) setGameWon(true);
  }, [color, guessedColor]);

  useEffect(() => {
    setResultString(
      guessResults.map((result) => result.slice(1).join("")).join("\n")
    );
  }, [guessResults]);

  useEffect(() => {
    if (gameOver) showGameOverModal();
  }, [gameOver, showGameOverModal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length !== 7) return;
    setGuessCount((prev) => prev + 1);
    setTransparent(false);
    setGuessedColor(inputValue);
    setGuessResults((prev) => [...prev, processGuess(inputValue, color[1])]);
    setGuesses((prev) => [...prev, inputValue]);
    setInputValue("#");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (val[0] !== "#") {
      setInputValue("#");
      return;
    }
    if (gameOver) return;
    if (
      val.length > 1 &&
      !ACCEPTABLE_HEX_CHARS.includes(val[val.length - 1])
    ) {
      return;
    }
    setInputValue(val);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mt-10">
      <GameOverModal
        isOpen={isGameOverModalVisible}
        setIsOpen={setIsGameOverModalVisible}
        okButtonProps={{ style: { backgroundColor: "#3a743a" } }}
        guessCount={guessCount}
        gameWon={gameWon}
        guessLimit={GUESS_LIMIT}
        resultString={resultString}
      />

      <div className="w-full bg-white text-black rounded-xl px-0 md:px-10 py-8 text-center">
        <div className="w-full flex flex-row justify-center items-center">
          <div className="flex flex-col w-1/3">
            <h2 className="text-center font-bold sm:text-xl">Target</h2>
            <div
              style={{ backgroundColor: color[0] }}
              className="aspect-square rounded-xl border border-black border-solid"
            />
          </div>
          <div className="flex flex-col w-1/3 ml-5">
            <h2 className="text-center font-bold sm:text-xl">Your Guess</h2>
            <div
              style={{ backgroundColor: guessedColor }}
              className={`aspect-square rounded-xl border border-black border-solid ${
                transparent ? "transparentBg" : ""
              }`}
            />
          </div>
        </div>
        <div className="w-full flex flex-row pb-6">
          <form
            className="flex flex-row justify-center w-full mt-5"
            onSubmit={handleSubmit}
            role="form"
          >
            <input
              id="textInput"
              type="text"
              className="w-[6.5em] border border-black border-solid rounded-md px-3 py-2 font-[Roboto_Mono,_monospace] text-xl"
              maxLength={7}
              value={inputValue}
              onChange={handleInputChange}
              style={{
                cursor: gameOver ? "not-allowed" : "text",
                pointerEvents: gameOver ? "none" : "auto",
              }}
              aria-label="Input field for guessing hex value"
              tabIndex={0}
            />
            <input
              id="submitButton"
              type="submit"
              value="Guess!"
              className="bg-green-700 text-white hover:bg-white hover:text-green-700 border border-solid border-green-700 rounded-xl px-5 py-2 ml-2 transition-colors duration-100"
              style={{
                cursor: gameOver ? "not-allowed" : "pointer",
              }}
              aria-label="Submit button for guessing"
              tabIndex={1}
            />
            {gameOver && (
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white rounded-xl px-4 py-2 mr-2 transition-colors duration-100 ml-1"
                onClick={showGameOverModal}
                aria-label="Share game result"
                tabIndex={2}
                type="button"
              >
                <ShareAltOutlined alt="Share icon" />
              </button>
            )}
          </form>
        </div>

        <div className="flex flex-col justify-center items-center">
          {!gameOver && (
            <span className="text-lg">
              You have {GUESS_LIMIT - guessCount} guess
              {GUESS_LIMIT - guessCount > 1 && "es"}
              {guessCount !== 0 && " left"}!
            </span>
          )}
          {gameOver && (gameWon ? "You guessed it!" : "You lost :(")}

          {gameOver && (
            <button
              className="bg-green-600 hover:bg-green-500 text-white rounded-xl px-5 py-2 mt-5 w-1/2 transition-colors duration-100"
              onClick={newGame}
              type="button"
            >
              Play Again
            </button>
          )}
        </div>
      </div>
      <div className="w-full bg-white text-black rounded-xl px-0 sm:px-10 py-8 text-center mt-5 overflow-visible">
        <h1 className="font-bold text-xl mb-3">Guesses</h1>
        <div className="w-full flex flex-col-reverse justify-start font-['Roboto_Mono',_monospace]">
          {guesses.length === 0 && "Guesses will appear here!"}
          {guesses.map((guess, guessIndex) => (
            <div
              className="flex flex-row justify-center mb-2"
              key={guessIndex}
            >
              {guess.split("").map((char, resultIndex) => {
                if (char === "#") return null;
                return (
                  <div
                    key={resultIndex}
                    className="flex flex-col justify-start rounded-xl border-4 border-solid px-1 md:px-3 py-1 md:py-2 mx-1 md:mx-2 scale"
                    style={{
                      borderColor: guesses[guessIndex],
                      transform:
                        guessIndex === guessCount - 1
                          ? "scale(1.2)"
                          : "scale(1)",
                      marginBottom:
                        guessIndex === guessCount - 1 ? "10px" : "0px",
                    }}
                  >
                    <span className="md:text-xl">{char}</span>
                    <span>
                      {guessResults[guessIndex][resultIndex]}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}