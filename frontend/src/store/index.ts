import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./slices/scoreSlice";
import distributionReducer from "./slices/distributionSlice";

export const store = configureStore({
  reducer: {
    score: scoreReducer,
    distribution: distributionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
