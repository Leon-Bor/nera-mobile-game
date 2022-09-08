import { GameObjects } from "phaser";
import { getState, store } from "../state/store";

export class GameContainer extends GameObjects.Container {
  public constructor() {
    super(getState().scene.scene, 0, 0);
  }
}
