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

    this.load.image(`bullet`, `sprites/bullet.png`);
    this.load.image(`matchfield`, `sprites/matchfield.png`);
    this.load.image(`player`, `sprites/player.png`);
  }
}
