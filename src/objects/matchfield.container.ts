import { GameObjects, Geom } from "phaser";
import { GameConfig } from "../game.config";
import { getState } from "../state/store";
import { phaserGame } from "../utils/phaser";

export class Matchfield extends GameObjects.Container {
  public static size = new Geom.Rectangle(0, 0, 980, 910);

  private background!: Phaser.GameObjects.Sprite;

  public constructor() {
    const { scaleManager } = phaserGame();
    super(
      getState().scene.scene,
      scaleManager.baseSize.width / 2,
      scaleManager.baseSize.height / 2
    );

    this.addBackground();
  }

  addBackground(): void {
    this.background = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      0,
      "matchfield"
    );

    this.background.setOrigin(0, 0);
    this.background.setScale(1.5);
    this.add(this.background);
  }
}
