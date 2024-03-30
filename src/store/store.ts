import { configureStore } from "@reduxjs/toolkit";
import selectedNumbersReducer from "./selectedNumbersSlice";
import stakeReducer from "./stakeSlice";

const store = configureStore({
    reducer: {
        selectedNumbers: selectedNumbersReducer,
        stake: stakeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
