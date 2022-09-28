import { ContainerView, RectangleView, TextView, View } from "../models/view";

export interface IButton {
  scene: Phaser.Scene;
  text: string;
  height: number;
  width?: number;
  fullWidth?: boolean;
  onPointerdown?: () => void;
}

export class Button extends ContainerView {
  text: TextView;
  backgroundColor: RectangleView;

  constructor({
    scene,
    text,
    fullWidth,
    width,
    height,
    onPointerdown = () => {},
  }: IButton) {
    super(scene, 0, 0);

    this.width = width || 0;
    this.height = height;

    if (fullWidth || this.width == 0) {
      this.fullWidth();
    }

    this.backgroundColor = new RectangleView(
      scene,
      0,
      0,
      this.width,
      this.height,
      0x00ff00
    );
    this.add(this.backgroundColor);
    this.backgroundColor.centerX();

    this.text = new TextView(scene, 0, 0, text, { fontSize: "60px" });
    this.add(this.text);
    this.text.center();

    // Add click function on reactable. Containers do not work.
    this.backgroundColor.setInteractive({ useHandCursor: true });
    this.backgroundColor.on("pointerdown", () => {
      console.log("pointer down");
      onPointerdown();
    });
    this.backgroundColor.on("pointerover", () => {
      this.backgroundColor.fillColor = 0x00aa00;
    });
    this.backgroundColor.on("pointerout", () => {
      this.backgroundColor.fillColor = 0x00ff00;
    });
  }
}
