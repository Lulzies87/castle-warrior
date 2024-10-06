import { Animation } from "../types/Animation";
import { SpriteConstructor } from "../types/SpriteConstructor";

export class Sprite {
  position: Vector2D = { x: 0, y: 0 };
  image: HTMLImageElement;
  loaded: boolean;
  width: number = 0;
  height: number = 0;
  frameRate: number;
  currentFrame: number = 0;
  elapsedFrames: number = 0;
  frameBuffer: number;
  animations?: {
    [key: string]: Animation;
  };
  loop: boolean;
  autoplay: boolean;
  currentAnimation?: Animation;
  visible: boolean = true;
  flip: boolean = false;

  constructor({
    position,
    imageSrc,
    frameRate = 1,
    animations,
    frameBuffer = 2,
    loop = true,
    autoplay = true,
    visible = true,
  }: SpriteConstructor) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.frameBuffer = frameBuffer;
    this.animations = animations;
    this.loop = loop;
    this.autoplay = autoplay;
    this.visible = visible;

    if (this.animations) {
      for (const key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
  }

  draw(c: CanvasRenderingContext2D) {
    if (!this.loaded || !this.visible) return;
    const cropBox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

    c.save();

    if (this.flip) {
      c.scale(-1, 1);
      c.translate(-this.position.x - this.width, this.position.y);
    } else {
      c.translate(this.position.x, this.position.y);
    }

    c.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.height,
      0,
      0,
      this.width,
      this.height
    );

    c.restore();

    this.updateFrames();
  }

  play() {
    this.autoplay = true;
  }

  updateFrames() {
    if (!this.autoplay) return;
    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else if (this.loop) this.currentFrame = 0;
    }

    if (this.currentAnimation?.onComplete) {
      if (
        this.currentFrame === this.frameRate - 1 &&
        !this.currentAnimation.isActive
      ) {
        this.currentAnimation.onComplete();
        this.currentAnimation.isActive = true;
      }
    }
  }
}
