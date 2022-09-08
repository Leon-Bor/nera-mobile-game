import { GameObjects } from "phaser";
import { GameConfig } from "src/game.config";
import { getState } from "../state/store";

export class Player extends GameObjects.Sprite {
  health: number = GameConfig.playerHealth;

  public constructor() {
    super(getState().scene.scene, 0, 0, "gamePlayer");
  }

  public moveTo(x: number, y: number) {}
}
