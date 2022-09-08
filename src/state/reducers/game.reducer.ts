import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface IGameState {
  isGameStarted: boolean;
}

// Define the initial state using that type
const initialState: IGameState = {
  isGameStarted: false,
};

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action?.payload;
    },
  },
});

export const { setIsGameStarted } = slice.actions;
export const gameReducer = slice.reducer;
