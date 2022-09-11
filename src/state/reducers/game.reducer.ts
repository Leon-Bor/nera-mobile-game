import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Enemy } from "../../objects/enemy.sprite";
import { Player } from "../../objects/player.sprite";

// Define a type for the slice state
export interface IGameState {
  isGameStarted: boolean;
  player: Player | undefined;
  enemy: Enemy | undefined;
}

// Define the initial state using that type
const initialState: IGameState = {
  isGameStarted: false,
  player: undefined,
  enemy: undefined,
};

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action?.payload;
    },
    setPlayer: (state, action: PayloadAction<Player>) => {
      state.player = action.payload as any;
    },
    setEnemy: (state, action: PayloadAction<Enemy>) => {
      state.enemy = action.payload as any;
    },
  },
});

export const { setIsGameStarted, setPlayer, setEnemy } = slice.actions;
export const gameReducer = slice.reducer;
