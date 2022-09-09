import { GameObjects, Geom } from "phaser";
import { GameConfig } from "../game.config";
import { getState } from "../state/store";
import { phaserGame } from "../utils/phaser";

export class Player extends GameObjects.Sprite {
  protected health: number = GameConfig.playerHealth;
  protected speed: number = GameConfig.playerSpeed;
  protected movementBoundaires!: GameObjects.Rectangle;
  protected playerRadius = 100;

  protected playerMoveTween!: Phaser.Tweens.Tween;

  public constructor(name: string = "player") {
    const { scaleManager } = phaserGame();
    super(
      getState().scene.scene,
      scaleManager.baseSize.width / 2,
      (scaleManager.baseSize.height / 4) * 3,
      "player"
    );
    this.setScale(1.5);
    this.name = name;

    this.scene.children.add(this);
    this.showMovementBoundaries();
  }

  private showMovementBoundaries(): void {
    this.movementBoundaires = new GameObjects.Rectangle(
      this.scene,
      50 + this.playerRadius,
      960 + this.playerRadius,
      980 - 2 * this.playerRadius, // width
      910 - 2 * this.playerRadius, // height
      0xff0000
    );
    this.movementBoundaires.setOrigin(0, 0);
    this.movementBoundaires.setAlpha(0.3);

    this.scene.children.add(this.movementBoundaires);
  }

  public moveTo(x: number, y: number) {
    if (this.playerMoveTween?.isPlaying()) {
      this.playerMoveTween.stop();
    }

    const distance = Phaser.Math.Distance.Between(x, y, this.x, this.y);

    const speed = distance * (1 - this.speed / 1000);
    console.log("distance", distance, speed);
    this.playerMoveTween = this.scene.add.tween({
      targets: this,
      duration: speed,
      y: y,
      x: x,
      ease: "Linear",
    });
    console.log(`player goes to: ${x}, ${y}`);
  }
}
