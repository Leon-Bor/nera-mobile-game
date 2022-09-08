import { GameObjects } from "phaser";
import { GameConfig } from "../game.config";
import { getState } from "../state/store";
import { phaserGame } from "../utils/phaser";

export class Player extends GameObjects.Sprite {
  health: number = GameConfig.playerHealth;
  speed: number = GameConfig.playerSpeed;

  private playerMoveTween!: Phaser.Tweens.Tween;

  public constructor(name: string) {
    const { scaleManager } = phaserGame();
    super(getState().scene.scene, scaleManager.baseSize.width / 2, 0, "player");
    this.setScale(1.5);
    this.name = name;
    this.scene.children.add(this);
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
  }
}
