import { useState, useCallback } from "react";
import WhatIsHexModal from "./WhatIsHexModal";
import RulesModal from "./RulesModal";
import CreditsModal from "./CreditsModal";

const MODAL_BUTTON_STYLE = { backgroundColor: "#3a743a" };

export default function Information() {
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
    const [isRulesModalVisible, setIsRulesModalVisible] = useState(false);
    const [isCreditsModalVisible, setIsCreditsModalVisible] = useState(false);

    const showInfoModal = useCallback(() => setIsInfoModalVisible(true), []);
    const showRulesModal = useCallback(() => setIsRulesModalVisible(true), []);
    const showCreditsModal = useCallback(() => setIsCreditsModalVisible(true), []);

    return (
        <div className="bg-white text-black rounded-xl px-10 py-8 text-center">
            <h1 className="font-bold text-4xl font-['Roboto_Mono',_monospace] mb-5">
                HexGuess
            </h1>
            <p className="text-lg">
                You will have 5 attempts to correctly guess the hex code of the colour displayed on screen.
                After each guess, you will see if your guess was too low, too high, or spot on! Use these as guides to decipher how close your guess is.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap w-full justify-center items-center mt-5 gap-y-1">
                <button
                    className="bg-blue-600 text-white hover:text-blue-600 hover:bg-white transition-colors duration-150 border border-solid border-blue-600 px-2 py-2 rounded-lg mx-2 whitespace-nowrap"
                    onClick={showInfoModal}
                    type="button"
                >
                    WHAT IS HEX?
                </button>
                <div className="flex flex-row">
                    <button
                        className="bg-blue-600 text-white hover:text-blue-600 hover:bg-white transition-colors duration-150 border border-solid border-blue-600 px-2 py-2 rounded-lg mx-2"
                        onClick={showRulesModal}
                        type="button"
                    >
                        RULES
                    </button>
                    <button
                        className="bg-blue-600 text-white hover:text-blue-600 hover:bg-white transition-colors duration-150 border border-solid border-blue-600 px-2 py-2 rounded-lg mx-2"
                        onClick={showCreditsModal}
                        type="button"
                    >
                        CREDITS
                    </button>
                </div>
            </div>
            <WhatIsHexModal
                isOpen={isInfoModalVisible}
                setIsOpen={setIsInfoModalVisible}
                okButtonProps={{ style: MODAL_BUTTON_STYLE }}
            />
            <RulesModal
                isOpen={isRulesModalVisible}
                setIsOpen={setIsRulesModalVisible}
                okButtonProps={{ style: MODAL_BUTTON_STYLE }}
            />
            <CreditsModal
                isOpen={isCreditsModalVisible}
                setIsOpen={setIsCreditsModalVisible}
                okButtonProps={{ style: MODAL_BUTTON_STYLE }}
            />
        </div>
    );
}