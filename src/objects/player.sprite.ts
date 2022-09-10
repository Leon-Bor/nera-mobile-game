import { GameObjects, Geom } from "phaser";
import { GameConfig } from "../game.config";
import { getState } from "../state/store";
import { phaserGame } from "../utils/phaser";
import { Matchfield } from "./matchfield.container";

export class Player extends GameObjects.Sprite {
  protected health: number = GameConfig.playerHealth;
  protected speed: number = GameConfig.playerSpeed;
  protected movementBoundaires!: GameObjects.Rectangle;
  protected clickableBoundaires!: GameObjects.Rectangle;
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
    this.init();
  }

  protected init(): void {
    this.addClickableBoundaries();
    this.addMovementBoundaries();
    this.activatePlayerInput();
  }

  protected addClickableBoundaries(x: number = 50, y: number = 960): void {
    this.clickableBoundaires = new GameObjects.Rectangle(
      this.scene,
      x,
      y,
      Matchfield.size.width, // width
      Matchfield.size.height, // height
      0x00ff00
    );
    this.clickableBoundaires.setOrigin(0, 0);
    this.clickableBoundaires.setAlpha(0.3);

    this.scene.children.add(this.clickableBoundaires);
  }
  protected addMovementBoundaries(x: number = 50, y: number = 960): void {
    this.movementBoundaires = new GameObjects.Rectangle(
      this.scene,
      x + this.playerRadius,
      y + this.playerRadius,
      Matchfield.size.width - 2 * this.playerRadius, // width
      Matchfield.size.height - 2 * this.playerRadius, // height
      0xff0000
    );
    this.movementBoundaires.setOrigin(0, 0);
    this.movementBoundaires.setAlpha(0.3);

    this.scene.children.add(this.movementBoundaires);
  }

  protected activatePlayerInput(): void {
    this.clickableBoundaires.setInteractive();
    this.clickableBoundaires.on(
      Phaser.Input.Events.POINTER_DOWN,
      (pointer: Phaser.Input.Pointer) => {
        console.log("pointer down", pointer);
        const { x, y } = pointer;

        const clampX = Phaser.Math.Clamp(
          x,
          this.movementBoundaires.x,
          this.movementBoundaires.x + this.movementBoundaires.width
        );

        const clampY = Phaser.Math.Clamp(
          y,
          this.movementBoundaires.y,
          this.movementBoundaires.y + this.movementBoundaires.height
        );

        this.moveTo(clampX, clampY);
      }
    );
  }

  public moveTo(x: number, y: number) {
    if (this.playerMoveTween?.isPlaying()) {
      this.playerMoveTween.stop();
    }

    const distance = Phaser.Math.Distance.Between(x, y, this.x, this.y);
    const speed = distance * (1 - this.speed / 1000);
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
