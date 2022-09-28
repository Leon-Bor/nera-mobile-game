import { Scene } from "phaser";
import { Button } from "../objects/button.container";
import { Scenes } from "../state/reducers/scene.reducer";

export class MenuScene extends Scene {
  public constructor() {
    super(Scenes.MenuScene);
  }

  preload(): void {}

  create(): void {
    console.log("now menu scene");

    const button = new Button({
      scene: this,
      text: "Super button",
      height: 100,
      width: 800,
    });

    button.y = 100;

    this.add.existing(button);
  }
}
