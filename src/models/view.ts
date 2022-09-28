import { Mixin } from "ts-mixer";

export class View {
  private this(): Phaser.GameObjects.Sprite {
    return this as unknown as Phaser.GameObjects.Sprite;
  }

  center(): View {
    this.centerX();
    this.centerY();
    return this;
  }

  centerX(): View {
    this.this()?.setOrigin?.(0, 0);
    this.this().setPosition(
      this.parentWidth / 2 - this.this().width / 2,
      this.this().y
    );
    return this;
  }

  centerY(): View {
    this.this()?.setOrigin?.(0, 0);
    this.this().setPosition(
      this.this().x,
      this.parentHeight / 2 - this.this().height / 2
    );
    return this;
  }

  fullWidth(): View {
    this.this().width = this.parentWidth;
    this.this().setPosition(0, this.this().y);
    return this;
  }

  fullHeight(): View {
    this.this().height = this.parentHeight;
    this.this().setPosition(this.this().x, 0);
    return this;
  }

  get parentWidth(): number {
    return this.this()?.parentContainer?.width || this.this().scene.scale.width;
  }

  get parentHeight(): number {
    return (
      this.this()?.parentContainer?.height || this.this().scene.scale.height
    );
  }
}

export class RectangleView extends Mixin(Phaser.GameObjects.Rectangle, View) {}

export class TextView extends Mixin(Phaser.GameObjects.Text, View) {}

export class ContainerView extends Mixin(Phaser.GameObjects.Container, View) {}

export class SpriteView extends Mixin(Phaser.GameObjects.Sprite, View) {}
