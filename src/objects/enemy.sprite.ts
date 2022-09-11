import { GameObjects } from "phaser";
import { GameConfig } from "../game.config";
import { getState } from "../state/store";
import { phaserGame } from "../utils/phaser";
import { Player } from "./player.sprite";

export class Enemy extends Player {
  tintColor = 0x00ff00;

  public constructor() {
    const { scaleManager } = phaserGame();
    super("enemy");

    this.setPosition(this.x, scaleManager.baseSize.height / 4);

    this.setTint(this.tintColor);
    this.bullets.setTint(this.tintColor);
  }

  protected override init(): void {
    this.addClickableBoundaries(50, 50);
    this.addMovementBoundaries(50, 50);
    this.activatePlayerInput();
  }
}
