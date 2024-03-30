import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedNumbersState {
    selectedNumbers: number[];
}

const initialState: SelectedNumbersState = {
    selectedNumbers: [],
};

export const selectedNumbersSlice = createSlice({
    name: "selectedNumbers",
    initialState,
    reducers: {
        selectNumber: (state, action: PayloadAction<number>) => {
            if (!state.selectedNumbers.includes(action.payload)) {
                state.selectedNumbers.push(action.payload);
            }
        },
        deselectNumber: (state, action: PayloadAction<number>) => {
            const index = state.selectedNumbers.indexOf(action.payload);
            if (index !== -1) {
                state.selectedNumbers.splice(index, 1);
            }
        },
        clearSelections: (state) => {
            state.selectedNumbers = [];
        },
    },
});

export const { selectNumber, deselectNumber, clearSelections } =
    selectedNumbersSlice.actions;

export default selectedNumbersSlice.reducer;
