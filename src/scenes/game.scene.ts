import { Scene } from "phaser";
import { Scenes, setActiveScene } from "../state/reducers/scene.reducer";
import { state$, store } from "../state/store";

export class GameScene extends Scene {
  public constructor() {
    super(Scenes.GameScene);
  }

  preload(): void {
    store.dispatch(setActiveScene({ name: Scenes.GameScene, scene: this }));
  }

  create(): void {
    console.log("now game scene");
    state$().subscribe(({ ui }) => {
      console.log(ui);
    });

    this.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        console.log("pointer down");
      },
      this
    );
  }
}
