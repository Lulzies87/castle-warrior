import { Sprite } from "./Sprite";
import { PlayerConstructor } from "../types/PlayerConstructor";

export class Player extends Sprite {
  velocity: Vector2D = { x: 0, y: 0 };;
  gravity: number = 1;
  collisionBlocks: Box[];
  hitbox?: Box;
  preventInput?: boolean;
  lastDirection?: string;
  isAttacking?: boolean = false;

  constructor({
    collisionBlocks,
    imageSrc,
    frameRate,
    animations,
    loop,
  }: PlayerConstructor) {
    super({
      position: { x: 200, y: 200 },
      imageSrc,
      frameRate,
      animations,
      loop,
    });

    this.collisionBlocks = collisionBlocks;
  }

  update() {
    this.position.x += this.velocity.x;

    this.updateHitbox();

    this.checkForHorizontalCollisions();
    this.applyGravity();

    this.updateHitbox();

    this.checkForVerticalCollisions();
  }

  handleInput(keys: { [key: string]: { pressed: boolean } }) {
    if (this.preventInput || this.isAttacking) return;
    this.velocity.x = 0;
    if (keys.KeyD.pressed) {
      this.switchSprite("run");
      this.flip = false;
      this.velocity.x = 5;
      this.lastDirection = "right";
    } else if (keys.KeyA.pressed) {
      this.switchSprite("run");
      this.flip = true;
      this.velocity.x = -5;
      this.lastDirection = "left";
    } else {
      this.switchSprite("idle");
      if (this.lastDirection === "left") this.flip = true;
      else this.flip = false;
    }
  }

  switchSprite(name: string) {
    if (this.image === this.animations?.[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations?.[name].image!;
    this.frameRate = this.animations?.[name].frameRate!;
    this.frameBuffer = this.animations?.[name].frameBuffer!;
    this.loop = this.animations?.[name].loop!;
    this.currentAnimation = this.animations?.[name];
  }

  updateHitbox() {
    const offsetX = this.position.x + 58;
    const offsetY = this.position.y + 34;
    const width = 50;
    const height = 53;

    this.hitbox = {
      position: {
        x: offsetX,
        y: offsetY,
      },
      width: width,
      height: height,
      sides: {
        top: offsetY,
        bottom: offsetY + height,
        left: offsetX,
        right: offsetX + width,
      },
    };
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock: Box = this.collisionBlocks[i];
      if (
        this.hitbox &&
        this.hitbox.sides.left <= collisionBlock.sides.right &&
        this.hitbox.sides.right >= collisionBlock.sides.left &&
        this.hitbox.sides.bottom >= collisionBlock.sides.top &&
        this.hitbox.sides.top <= collisionBlock.sides.bottom
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.sides.left - this.position.x;
          this.position.x = collisionBlock.sides.right - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset = this.hitbox.sides.right - this.position.x;
          this.position.x = collisionBlock.sides.left - offset - 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock: Box = this.collisionBlocks[i];
      if (
        this.hitbox &&
        this.hitbox.sides.left <= collisionBlock.sides.right &&
        this.hitbox.sides.right >= collisionBlock.sides.left &&
        this.hitbox.sides.bottom >= collisionBlock.sides.top &&
        this.hitbox.sides.top <= collisionBlock.sides.bottom
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.sides.top - this.position.y;
          this.position.y = collisionBlock.sides.bottom - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.sides.bottom - this.position.y;
          this.position.y = collisionBlock.sides.top - offset - 0.01;
          break;
        }
      }
    }
  }

  attack() {
    if (this.isAttacking) return;
    this.isAttacking = true;
    this.switchSprite("attack");

    const attackAnimation = this.animations?.["attack"];
    if (attackAnimation) {
      attackAnimation.onComplete = () => {
        this.isAttacking = false;
        this.switchSprite("idle");
      };
    }
  }
}
