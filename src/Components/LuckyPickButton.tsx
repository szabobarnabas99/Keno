import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelections } from "../store/selectedNumbersSlice";
import { RootState } from "../store/store";

interface Props {
    onSelectNumber: (number: number) => void;
    disabled: boolean; // Add disabled prop
    onPickStart: () => void; // Add onPickStart prop
    onPickFinish: () => void; // Add onPickFinish prop
}

const LuckyPickButton: React.FC<Props> = ({
    onSelectNumber,
    disabled,
    onPickStart,
    onPickFinish,
}) => {
    const dispatch = useDispatch();
    const selectedNumbers = useSelector(
        (state: RootState) => state.selectedNumbers.selectedNumbers
    );
    const [isPicking, setIsPicking] = useState<boolean>(false); // State to track if auto picking is ongoing

    const generateUniqueRandomNumbers = (count: number): number[] => {
        const randomNumbers: number[] = [];
        const pickedNumbers = new Set<number>(selectedNumbers); // Track picked numbers

        while (randomNumbers.length < count) {
            const random = Math.floor(Math.random() * 80) + 1;
            if (!pickedNumbers.has(random)) {
                // Check if number is not picked
                pickedNumbers.add(random); // Add number to set of picked numbers
                randomNumbers.push(random); // Add number to array
            }
        }

        return randomNumbers;
    };

    const handleLuckyPick = () => {
        setIsPicking(true); // Set auto picking in progress
        onPickStart(); // Notify parent component that auto-picking has started
        handleReset(); // Reset picked numbers
        const randomNumbers = generateUniqueRandomNumbers(5);
        randomNumbers.forEach((number, index) => {
            if (index === 0) {
                onSelectNumber(number); // Display the first number instantly
            } else {
                setTimeout(() => {
                    onSelectNumber(number);
                    if (index === randomNumbers.length - 1) {
                        setIsPicking(false); // Set auto picking finished
                        onPickFinish(); // Notify parent component that auto-picking has finished
                    }
                }, index * 200); // Delay for subsequent numbers
            }
        });
    };

    const handleReset = () => {
        dispatch(clearSelections()); // Clear selected numbers
    };

    return (
        <button
            className="number-btn"
            onClick={handleLuckyPick}
            disabled={disabled || isPicking} // Disable button if disabled prop is true or auto picking is in progress
        >
            {isPicking ? "Picking..." : "Auto Pick"}
        </button>
    );
};

export default LuckyPickButton;
