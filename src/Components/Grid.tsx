import React from "react";
import { useDispatch } from "react-redux";
import { deselectNumber } from "../store/selectedNumbersSlice";

interface GridProps {
    onSelectNumber: (number: number) => void;
    selectedNumbers: number[];
    isPicking: boolean; // New prop to indicate if auto-picking is ongoing
}

const Grid: React.FC<GridProps> = ({
    onSelectNumber,
    selectedNumbers,
    isPicking,
}) => {
    const dispatch = useDispatch();

    const handleSelectNumber = (number: number) => {
        if (!isPicking) {
            // Disable selection if auto-picking is ongoing
            if (selectedNumbers.includes(number)) {
                dispatch(deselectNumber(number)); // Deselect the number if already selected
            } else if (selectedNumbers.length < 5) {
                onSelectNumber(number);
            } else {
                alert("You can only select up to 5 numbers.");
            }
        }
    };

    return (
        <div className="grid-container">
            <div className="grid">
                {Array.from({ length: 80 }, (_, index) => index + 1).map(
                    (number) => {
                        const isSelected = selectedNumbers.includes(number);
                        const isDisabled =
                            selectedNumbers.length === 5 && !isSelected;

                        return (
                            <button
                                key={number}
                                onClick={() => handleSelectNumber(number)}
                                className={
                                    isSelected
                                        ? "selected btn-size"
                                        : "btn btn-size"
                                }
                                disabled={isDisabled || isPicking} // Disable if auto-picking is ongoing
                            >
                                {number}
                            </button>
                        );
                    }
                )}
            </div>
        </div>
    );
};

export default Grid;
