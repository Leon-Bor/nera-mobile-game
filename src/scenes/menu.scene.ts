import { Scene } from "phaser";
import { Scenes } from "../state/reducers/scene.reducer";

export class MenuScene extends Scene {
  public constructor() {
    super(Scenes.MenuScene);
  }

  preload(): void {}

  create(): void {
    console.log("now menu scene");
  }
}
