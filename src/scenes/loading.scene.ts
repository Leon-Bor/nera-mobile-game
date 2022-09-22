import { GameObjects, Scene } from "phaser";
import { Scenes, setActiveScene } from "../state/reducers/scene.reducer";
import { store } from "../state/store";

export class LoadingScene extends Scene {
  progressBar: Phaser.GameObjects.Rectangle;
  progressBox: Phaser.GameObjects.Rectangle;

  loadingText: Phaser.GameObjects.Text;
  percentText: Phaser.GameObjects.Text;
  assetText: Phaser.GameObjects.Text;

  constructor() {
    super(Scenes.LoadingScene);
  }

  create(): void {
    this.scene.start(Scenes.GameScene);
  }
  preload(): void {
    this.createProgressBar();
    this.loadAssets();
  }

  loadAssets(): void {
    this.load.image(`bullet`, `sprites/bullet.png`);
    this.load.image(`matchfield`, `sprites/matchfield.png`);
    this.load.image(`player`, `sprites/player.png`);
  }

  createProgressBar(): void {
    store.dispatch(setActiveScene({ name: Scenes.LoadingScene, scene: this }));

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    const progressBarMaxWidth = 600;
    const progressBarMaxheight = 50;

    this.progressBox = this.add.rectangle(
      width / 2,
      height / 2,
      progressBarMaxWidth + 20,
      progressBarMaxheight + 20,
      0x666666
    );

    this.progressBar = this.add.rectangle(
      width / 2,
      height / 2,
      progressBarMaxWidth,
      progressBarMaxheight,
      0xffffff
    );

    this.loadingText = this.add.text(
      width / 2 + 10,
      height / 2 - 100,
      "Loading Game...",
      {
        font: "50px roboto",
        color: "#ffffff",
      }
    );

    this.percentText = this.add.text(width / 2, height / 2, "0%", {
      font: "28px roboto",
      color: "#000000",
    });

    this.assetText = this.add.text(width / 2, height / 2 + 60, "", {
      font: "18px roboto",
      color: "#ffffff",
    });

    console.log("loading");
    this.load.baseURL = "assets/";

    this.loadingText.setOrigin(0.5, 0.5);
    this.percentText.setOrigin(0.5, 0.5);
    this.assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value: any) => {
      this.percentText.setText(Math.round(value * 100) + "%");
      this.progressBar.width = progressBarMaxWidth * value;
    });

    this.load.on("fileprogress", (file: any) => {
      this.assetText.setText(`Loading ${file.key} asset.`);
    });

    this.load.on("complete", () => {
      this.progressBar?.destroy();
      this.progressBox?.destroy();
      this.loadingText?.destroy();
      this.percentText?.destroy();
      this.assetText?.destroy();
    });
  }
}
