import { Sprite } from "./Sprite";
import { nextLevel } from "../main";
import { CollisionBlock } from "./CollisionBlock";

export class Player extends Sprite {
  velocity: Vector2D = { x: 0, y: 0 };
  gravity: number = 1;
  collisionBlocks: CollisionBlock[] = [];
  hitbox?: Box;
  preventInput: boolean = false;
  lastDirection: "left" | "right" = "right";
  isAttacking: boolean = false;
  isHit: boolean = false;

  constructor() {
    super({
      position: { x: 200, y: 200 },
      imageSrc: "../src/assets/img/king/idle.png",
      frameRate: 11,
      animations: {
        idle: {
          frameRate: 11,
          frameBuffer: 4,
          loop: true,
          imageSrc: "../src/assets/img/king/idle.png",
        },
        run: {
          frameRate: 8,
          frameBuffer: 4,
          loop: true,
          imageSrc: "../src/assets/img/king/run.png",
        },
        attack: {
          frameRate: 3,
          frameBuffer: 4,
          loop: false,
          imageSrc: "../src/assets/img/king/attack.png",
          onComplete: () => {
            this.switchSprite("idle");
          },
        },
        hit: {
          frameRate: 2,
          frameBuffer: 4,
          loop: true,
          imageSrc: "../src/assets/img/king/hit.png",
        },
        enterDoor: {
          frameRate: 8,
          frameBuffer: 6,
          loop: false,
          imageSrc: "../src/assets/img/king/enterDoor.png",
          onComplete: () => {
            nextLevel();
          },
        },
      },
    });
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
    if (this.preventInput || this.isAttacking || this.isHit) return;
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
    setTimeout(() => {
      this.isAttacking = false;
    }, 400);
  }

  hit(staggerDirection: "left" | "right") {
    this.isHit = true;
    this.switchSprite("hit");
    if (staggerDirection === "left") {
      this.lastDirection = "right";
      this.velocity.x = -5;
    } else {
      this.lastDirection = "left";
      this.velocity.x = 5;
    }
    this.velocity.y = -6;

    if (this.preventInput) {
      return;
    } else {
      setTimeout(() => {
        this.isHit = false;
        this.velocity.x = 0;
      }, 250);
    }
  }

  reset() {
    this.preventInput = true;
    this.isHit = false;
    this.velocity.x = 0;
    this.velocity.y = 0;
  }
}
