import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { RootState } from "./store/store";
import { selectNumber, clearSelections } from "./store/selectedNumbersSlice";
import { setStake } from "./store/stakeSlice";
import Grid from "./Components/Grid";
import LuckyPickButton from "./Components/LuckyPickButton";
import store from "./store/store";
import pound from "./assets/pound.png";
import "./App.css";

const App: React.FC = () => {
    const [scaleFactor, setScaleFactor] = useState<number>(1); // State to track the scale factor
    const [isPicking, setIsPicking] = useState<boolean>(false); // State to track if auto picking is ongoing
    const dispatch = useDispatch();
    const selectedNumbers = useSelector(
        (state: RootState) => state.selectedNumbers.selectedNumbers
    );
    const sortedSelectedNumbers =
        selectedNumbers.length > 0
            ? [...selectedNumbers].sort((a, b) => a - b)
            : selectedNumbers;
    const stake = useSelector((state: RootState) => state.stake.stake);
    const [customStake, setCustomStake] = useState<string>("");
    const [placeholders, setPlaceholders] = useState<number[]>([1, 2, 3, 4, 5]);

    useEffect(() => {
        const handleResize = () => {
            // Calculate the scale factor based on window width
            const newScaleFactor =
                window.innerWidth > 800 ? 1 : window.innerWidth / 900;
            setScaleFactor(newScaleFactor);
        };

        // Call handleResize initially and add event listener for window resize
        handleResize();
        window.addEventListener("resize", handleResize);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSelectNumber = (number: number) => {
        console.log("Selected number:", number);
        if (!selectedNumbers.includes(number)) {
            dispatch(selectNumber(number));
            setPlaceholders((prevState) => prevState.slice(0, -1));
        }
    };

    const handlePlaceBet = () => {
        if (selectedNumbers.length === 5 && stake > 0) {
            alert("Bet placed successfully!");
            dispatch(clearSelections());
            setCustomStake("");
            dispatch(setStake(0));
            setPlaceholders([1, 2, 3, 4, 5]); // Reset placeholders
        } else {
            alert("Please select 5 numbers and enter a valid stake.");
        }
    };

    const handleReset = () => {
        dispatch(clearSelections());
        setPlaceholders([1, 2, 3, 4, 5]);
    };

    const handleSetCustomStake = (value: string) => {
        const newValue =
            value.length > 1 && value.startsWith("0") ? value.slice(1) : value; // Remove leading zeros
        const parsedValue = parseInt(newValue);
        if (!isNaN(parsedValue) && parsedValue <= 9999) {
            // Limit to 4 digit
            setCustomStake(newValue);
            dispatch(setStake(parsedValue));
        }
    };

    const popularStakes = [1, 5, 10, 20];

    // Function to render placeholder items
    const renderPlaceholders = () => {
        return placeholders.map((index) => <li key={index}>...</li>);
    };

    return (
        <Provider store={store}>
            <div className="App" style={{ transform: `scale(${scaleFactor})` }}>
                <div className="indicator-container">
                    <div className="indicator">
                        <h2 className="h2 centered">Select 5 Numbers:</h2>
                        <ul className="centered">
                            {sortedSelectedNumbers.map((number, index) => (
                                <li key={index}>
                                    {index !== 4 ? `${number},` : number}
                                </li>
                            ))}
                            {placeholders.length > 0 && renderPlaceholders()}
                        </ul>
                    </div>
                </div>
                <div className="control-panel">
                    <div className="event-btn-container">
                        <div className="stake-container">
                            {popularStakes.map((stake) => (
                                <button
                                    className="stake-btn"
                                    key={stake}
                                    onClick={() =>
                                        handleSetCustomStake(String(stake))
                                    }
                                >
                                    {`£ ${stake}`}
                                </button>
                            ))}
                        </div>
                        <div className="centered input">
                            <input
                                type="number"
                                min="1"
                                id="numberInput"
                                placeholder="Enter stake"
                                value={customStake}
                                onChange={(e) =>
                                    handleSetCustomStake(e.target.value)
                                }
                            />
                            <img className="pound" src={pound} alt="pound" />
                        </div>
                        <div className="centered number-btn-container">
                            <LuckyPickButton
                                onSelectNumber={handleSelectNumber}
                                disabled={selectedNumbers.length === 5} // Disable auto pick if there are already 5 selected numbers
                                onPickStart={() => setIsPicking(true)} // Callback to set isPicking to true
                                onPickFinish={() => setIsPicking(false)} // Callback to set isPicking to false
                            />
                            <button
                                className="number-btn"
                                onClick={handleReset}
                                disabled={isPicking}
                            >
                                Reset
                            </button>
                            <button
                                className="bet-btn"
                                onClick={handlePlaceBet}
                            >
                                Place Bet
                            </button>
                        </div>
                    </div>

                    <Grid
                        onSelectNumber={handleSelectNumber}
                        selectedNumbers={selectedNumbers}
                        isPicking={isPicking} // Pass isPicking state to Grid component
                    />
                </div>
                <div className="centered">
                    <div className="bottom-container">
                        <div className="h1">
                            <h1>Keno</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Provider>
    );
};

export default App;
