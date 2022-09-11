import { GameObjects, Geom } from "phaser";
import { GameConfig } from "../game.config";
import { Scenes } from "../state/reducers/scene.reducer";
import { phaserGame } from "../utils/phaser";
import { Bullet } from "./bullet.sprite";
import { Player } from "./player.sprite";

export class Bullets extends Phaser.Physics.Arcade.Group {
  private velocity: number;

  constructor(name: string, velocity: number) {
    const { sceneManager } = phaserGame();
    const scene = sceneManager.getScene(Scenes.GameScene);
    super(scene.physics.world, scene);

    this.name = name;
    this.velocity = velocity;

    this.createMultiple({
      frameQuantity: 5,
      key: `${name}Bullets`,
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBulletAt(fromObject: Player, toObject: Player) {
    let bullet: Bullet = this.getFirstDead();

    if (bullet) {
      bullet.setImmovable(true);
      bullet.body.setSize(10);
      bullet.fireAt(fromObject, toObject, this.velocity);
    }
  }
}
