import { Scene } from "phaser";
import { Button } from "../objects/button.container";
import { Scenes, setActiveScene } from "../state/reducers/scene.reducer";
import { store } from "../state/store";

export class MenuScene extends Scene {
  public constructor() {
    super(Scenes.Menu);
  }

  preload(): void {
    store.dispatch(setActiveScene({ name: Scenes.Menu, scene: this }));
  }

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
