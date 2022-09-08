import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Scenes } from "./scene.reducer";

// Define a type for the slice state
export interface IUiState {
  showUi: boolean;
}

// Define the initial state using that type
const initialState: IUiState = {
  showUi: false,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowUi: (state, action: PayloadAction<boolean>) => {
      state.showUi = action?.payload;
    },
  },
});

export const { setShowUi } = slice.actions;
export const uiReducer = slice.reducer;
