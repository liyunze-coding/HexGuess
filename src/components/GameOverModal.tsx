import { useState } from "react";
import { Modal } from "antd";

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

const getFeedbackMessage = (guessCount: number, gameWon: boolean): string => {
  switch (guessCount) {
    case 1:
      return "You sure you're not cheating? :P";
    case 2:
      return "You're pretty good at this!";
    case 3:
      return "That was excellent!";
    case 4:
      return "Bet you can do better than that!";
    case 5:
      return gameWon ? "Phew! That was close :D" : "Better luck next time!";
    default:
      return "Better luck next time!";
  }
};

const GameOverModal = ({
  isOpen,
  setIsOpen,
  okButtonProps,
  gameWon,
  guessCount,
  guessLimit,
  resultString,
}: GameOverProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `HexGuess ${guessCount}/${guessLimit}\nhttps://hex-guess.vercel.app/\n\n${resultString}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      // Optionally handle clipboard error
    }
  };

  return (
    <Modal
      okButtonProps={okButtonProps}
      title={gameWon ? "Congrats!" : "Game Over"}
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div className="flex flex-col justify-center items-center relative">
        <p className="text-lg">
          {gameWon
            ? `You solved the puzzle in ${guessCount} guesses!`
            : "You ran out of guesses!"}
        </p>
        <div className="flex flex-col justify-center items-center text-xl my-3 px-3 py-3 rounded-xl bg-gray-100">
          {resultString.split("\n").map((result, index) => (
            <p key={index} className="font-bold">
              {result}
            </p>
          ))}
        </div>
        <p className="my-2">{getFeedbackMessage(guessCount, gameWon)}</p>
        <button
          className="border border-solid border-black rounded-xl px-5 py-2 hover:bg-black hover:text-white transition-colors duration-100"
          onClick={handleCopy}
          type="button"
        >
          {copied ? "Copied!" : "📋 Copy to Clipboard!"}
        </button>
      </div>
    </Modal>
  );
};

export default GameOverModal;