import { GameObjects, Scene } from "phaser";
import { SceneService } from "../services/scene.service";
import { autoInjectable } from "tsyringe"; 
import { Scenes } from "src/game.config";

@autoInjectable()
export class LoadingScene extends Scene {
  private king!: GameObjects.Sprite;

  constructor(public sceneService: SceneService) {
    super(Scenes.LoadingScene);
  }
  create(): void {
    this.scene.start(Scenes.GameScene);
  }
  preload(): void {
    this.sceneService.setCurrentScene(this);
    console.log("loading");
    this.load.baseURL = "assets/";

 
    this.load.image(`gameBullet`, `sprites/gameBullet.png`);
    this.load.image(`gameField`, `sprites/gameField.png`);
    this.load.image(`gameCircle`, `sprites/gameCircle.png`);

    // this.load.audio("reelStop", "sounds/reel-spin-end.mp3");
  }
}
