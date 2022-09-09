import { GameObjects } from "phaser";
import { GameConfig } from "../game.config";
import { getState } from "../state/store";
import { phaserGame } from "../utils/phaser";
import { Player } from "./player.sprite";

export class Enemy extends Player {
  public constructor() {
    const { scaleManager } = phaserGame();
    super("enemy");
    this.setPosition(this.x, scaleManager.baseSize.height / 4);
  }
}
