import { Game, GameObjects, Geom } from "phaser";
import { GameConfig } from "../game.config";
import { Scenes } from "../state/reducers/scene.reducer";
import { phaserGame } from "../utils/phaser";
import { Bullet } from "./bullet.sprite";
import { Bullets } from "./bullets.group";
import { Matchfield } from "./matchfield.container";

export class Player extends Phaser.Physics.Arcade.Sprite {
  protected health = GameConfig.playerHealth;
  protected velocity = GameConfig.playerVelocity;
  protected bulletVelocity = GameConfig.bulletVelocity;
  protected fireFrquency = GameConfig.playerFireFrquency;

  protected movementBoundaires!: GameObjects.Rectangle;
  protected clickableBoundaires!: GameObjects.Rectangle;
  protected playerRadius = 100;
  protected playerMoveTween!: Phaser.Tweens.Tween;
  protected bullets: Bullets;

  private autoFireInterval!: ReturnType<typeof setInterval>;

  private _enemyTarget!: Player;

  public constructor(name: string = "player") {
    const { scaleManager, sceneManager } = phaserGame();
    super(
      sceneManager.getScene(Scenes.GameScene),
      scaleManager.baseSize.width / 2,
      (scaleManager.baseSize.height / 4) * 3,
      "player"
    );

    this.bullets = new Bullets(name, this.bulletVelocity);

    this.setScale(1.5);
    this.name = name;

    this.scene.children.add(this);
    this.active = true;
    this.init();
  }

  public set enemyTarget(enemyTarget: Player) {
    this._enemyTarget = enemyTarget;
    this.enableCollision();
  }

  public get enemyTarget(): Player {
    return this._enemyTarget;
  }

  protected init(): void {
    this.addClickableBoundaries();
    this.addMovementBoundaries();
    this.activatePlayerInput();
  }

  protected enableCollision(): void {
    const { game } = phaserGame();

    this.scene.physics.add.existing(this, false);
    this.body.immovable = true;
    this.body.setCircle(this.playerRadius - 35, 10, 10);

    this.scene.physics.add.collider(this, this.enemyTarget.bullets);

    this.scene.physics.add.overlap(
      this,
      this.enemyTarget.bullets,
      (player, bullet) => this.onEnemyCollision(player as any, bullet as any)
    );

    // this.body.setCircle(this.playerRadius);
  }

  private onEnemyCollision(player: Player, bullet: Bullet) {
    bullet.removeBullet();
  }

  public startAutoFire(): void {
    if (!this.enemyTarget) {
      console.log(`Can't shoot at enemy. No enemy provided.`);
      return;
    }
    if (this.autoFireInterval) clearInterval(this.autoFireInterval);
    this.autoFireInterval = setInterval(() => {
      this.bullets.fireBulletAt(this, this.enemyTarget);
    }, this.fireFrquency);
  }

  protected stopAutoFire(): void {
    if (this.autoFireInterval) {
      clearInterval(this.autoFireInterval);
    }
  }

  protected addClickableBoundaries(x: number = 50, y: number = 960): void {
    this.clickableBoundaires = new GameObjects.Rectangle(
      this.scene,
      x,
      y,
      Matchfield.size.width, // width
      Matchfield.size.height, // height
      GameConfig.debug ? 0x00ff00 : undefined
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
      GameConfig.debug ? 0xff0000 : undefined
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

    this.stopAutoFire();

    const distance = Phaser.Math.Distance.Between(x, y, this.x, this.y);
    const speed = distance * (1 - this.velocity / 1000);
    this.playerMoveTween = this.scene.add.tween({
      targets: this,
      duration: speed,
      y: y,
      x: x,
      ease: "Linear",
      onComplete: () => {
        this.startAutoFire();
      },
    });
  }
}
