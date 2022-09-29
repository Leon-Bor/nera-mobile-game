import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Scenes {
  Loading = "Loading",
  Menu = "Menu",
  Queue = "Queue",
  Game = "Game",
}

// Define a type for the slice state
export interface ISceneState {
  name: Scenes;
  scene: Phaser.Scene;
}

// Define the initial state using that type
const initialState: ISceneState = {
  name: Scenes.Loading,
  scene: new Phaser.Scene("init"),
};

const slice = createSlice({
  name: "scene",
  initialState,
  reducers: {
    setActiveScene: (
      state,
      action: PayloadAction<{
        name: Scenes;
        scene: Phaser.Scene;
      }>
    ) => {
      state.name = action?.payload.name;
      state.scene = action?.payload.scene as any;
    },
  },
});

export const { setActiveScene } = slice.actions;
export const sceneReducer = slice.reducer;
