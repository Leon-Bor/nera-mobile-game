import { Scene } from "phaser";
import { Scenes, setActiveScene } from "../state/reducers/scene.reducer";
import { store } from "../state/store";

export class LoadingScene extends Scene {
  constructor() {
    super(Scenes.LoadingScene);
  }
  create(): void {
    this.scene.start(Scenes.GameScene);
  }
  preload(): void {
    store.dispatch(setActiveScene({ name: Scenes.LoadingScene, scene: this }));

    console.log("loading");
    this.load.baseURL = "assets/";

    this.load.image(`gameBullet`, `sprites/gameBullet.png`);
    this.load.image(`gameField`, `sprites/gameField.png`);
    this.load.image(`gameCircle`, `sprites/gamePlayer.png`);
  }
}
