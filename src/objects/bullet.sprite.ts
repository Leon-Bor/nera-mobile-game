import { GameObjects, Geom } from "phaser";
import { GameConfig } from "../game.config";
import { Scenes } from "../state/reducers/scene.reducer";
import { getState } from "../state/store";
import { phaserGame } from "../utils/phaser";
import { Player } from "./player.sprite";

export class Bullet extends Phaser.Physics.Arcade.Sprite {
  public constructor() {
    const { sceneManager } = phaserGame();
    super(sceneManager.getScene(Scenes.GameScene), 0, 0, "bullet");
    this.setScale(1.5);
    this.setOrigin(0.5, 0);
  }

  fireAt(fromObject: Player, toObject: Player, speed: number) {
    const { x, y } = fromObject;
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.scene.physics.moveToObject(this, toObject, speed);
  }

  preUpdate(time: number, delta: number) {
    const { scaleManager } = phaserGame();

    super.preUpdate(time, delta);

    if (this.y < 0 || this.y > scaleManager.baseSize.height) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  removeBullet() {
    if (this.active === true) {
      this.setVisible(false);
      this.setActive(false);
    }
  }
}
