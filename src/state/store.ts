import { configureStore, Store } from "@reduxjs/toolkit";
import { BehaviorSubject } from "rxjs";
import { gameReducer, IGameState } from "./reducers/game.reducer";
import { sceneReducer } from "./reducers/scene.reducer";
import { uiReducer, IUiState } from "./reducers/ui.reducer";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    ui: uiReducer,
    scene: sceneReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const state$ = () => {
  const state$ = new BehaviorSubject(store.getState());
  store.subscribe(() => {
    state$.next(store.getState());
  });
  return state$;
};

export const getState = () => store.getState();
