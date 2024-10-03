import { DiamondConstructor } from "../types/DiamondConstructor";
import { Player } from "./Player";
import { Sprite } from "./Sprite";

export class Diamond extends Sprite {
  collected: boolean;
  onCollision: () => void;

  constructor({
    position,
    imageSrc = "../src/assets/img/diamond/BigDiamondIdle.png",
    frameRate = 10,
    frameBuffer = 4,
    loop = true,
    autoplay = true,
    visible = true,
    onCollision,
  }: DiamondConstructor) {
    super({
      position,
      imageSrc,
      frameRate,
      frameBuffer,
      loop,
      autoplay,
      visible,
    });
    this.onCollision = onCollision;
    this.collected = false;
  }

  checkCollision(player: Player) {
    if (this.collected) return;
    if (
      player.hitbox &&
      player.hitbox.sides.left <= this.position.x + this.width &&
      player.hitbox.sides.right >= this.position.x &&
      player.hitbox.sides.bottom >= this.position.y &&
      player.hitbox.sides.top <= this.position.y + this.height
    ) {
      this.onCollision();
      this.collect();
    }
  }

  collect() {
    const imagePath = "../src/assets/img/diamond/bigDiamondHit.png";
    const newImage = new Image();
    newImage.src = imagePath;
    newImage.onload = () => {
      this.image = newImage;
      this.currentFrame = 0;
      this.autoplay = true;
      this.loop = false;
      this.collected = true;

      this.currentAnimation = {
        imageSrc: imagePath,
        image: newImage,
        frameRate: 2,
        frameBuffer: 8,
        loop: false,
        isActive: false,
        onComplete: () => {
          this.visible = false;
        },
      };
    };
  }
}
