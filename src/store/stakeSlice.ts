// src/store/stakeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StakeState {
    stake: number;
}

const initialState: StakeState = {
    stake: 0,
};

const stakeSlice = createSlice({
    name: "stake",
    initialState,
    reducers: {
        setStake(state, action: PayloadAction<number>) {
            state.stake = action.payload;
        },
    },
});

export const { setStake } = stakeSlice.actions;
export default stakeSlice.reducer;
