import { Sprite } from "./Sprite";
import { EnemyConstructor } from "../types/EnemyConstructor";
import { Player } from "./Player";

export class Enemy extends Sprite {
  velocity: Vector2D = { x: 0, y: 0 };
  gravity: number = 1;
  collisionBlocks: Box[];
  hitbox?: Box;
  visionbox?: Box;
  player: Player;
  lastDirection?: string;
  isAttacking?: boolean;
  lastAttackTime: number;

  constructor({
    position,
    collisionBlocks,
    imageSrc = "../src/assets/img/pig/idle.png",
    frameRate = 11,
    animations = {
      idle: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: "../src/assets/img/pig/idle.png",
      },
      run: {
        frameRate: 6,
        frameBuffer: 4,
        loop: true,
        imageSrc: "../src/assets/img/pig/run.png",
      },
      attack: {
        frameRate: 5,
        frameBuffer: 6,
        loop: true,
        imageSrc: "../src/assets/img/pig/attack.png",
      },
    },
    loop,
    player,
  }: EnemyConstructor) {
    super({
      position,
      imageSrc,
      frameRate,
      animations,
      loop,
    });

    this.position = position;
    if (!collisionBlocks || !player)
      throw new Error("collisionBlocks or player data missing");
    this.collisionBlocks = collisionBlocks;
    this.player = player;
    this.lastAttackTime = 0;
  }

  update(player: Player) {
    this.player = player;
    this.position.x += this.velocity.x;

    this.updateHitbox();
    this.updateVisionbox();

    this.checkForHorizontalCollisions();
    this.applyGravity();

    this.updateHitbox();
    this.updateVisionbox();

    this.checkForVerticalCollisions();
    this.checkForPlayerCollision();
    this.checkReach();
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
    const offsetX = this.position.x + 20;
    const offsetY = this.position.y + 18;
    const width = 40;
    const height = 38;

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

  updateVisionbox() {
    const offsetX = this.hitbox!.width / 2;
    const visionDistance = this.hitbox!.width * 7;
    const width = visionDistance * 2;
    const height = this.hitbox!.height * 4;

    this.visionbox = {
      position: {
        x: this.hitbox!.position.x + offsetX - visionDistance,
        y: this.hitbox!.position.y - this.hitbox!.height * 3,
      },
      width: width,
      height: height,
      sides: {
        top: this.hitbox!.position.y - this.hitbox!.height * 3,
        bottom: this.hitbox!.position.y + height * 3,
        left: this.hitbox!.position.x + offsetX - visionDistance,
        right: this.hitbox!.position.x + offsetX + visionDistance,
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

  checkForPlayerCollision() {
    this.velocity.x = 0;
    if (this.isAttacking) return;
    if (
      this.visionbox &&
      this.player.hitbox &&
      this.visionbox.sides.left <= this.player.hitbox.sides.right &&
      this.visionbox.sides.right >= this.player.hitbox.sides.left &&
      this.visionbox.sides.bottom >= this.player.hitbox.sides.top &&
      this.visionbox.sides.top <= this.player.hitbox.sides.bottom
    ) {
      this.switchSprite("run");
      if (this.player.hitbox.position.x < this.hitbox!.position.x) {
        this.flip = false;
        this.velocity.x = -2;
        this.lastDirection = "left";
      } else {
        this.flip = true;
        this.velocity.x = 2;
        this.lastDirection = "right";
      }
    } else {
      this.switchSprite("idle");
      this.flip = this.lastDirection !== "left";
    }
  }

  checkReach() {
    const currentTime = Date.now();
    const attackCooldown = 2000;

    if (
      this.hitbox &&
      this.player.hitbox &&
      this.hitbox.sides.left - 20 <= this.player.hitbox.sides.right &&
      this.hitbox.sides.right + 20 >= this.player.hitbox.sides.left &&
      this.hitbox.sides.bottom + 20 >= this.player.hitbox.sides.top &&
      this.hitbox.sides.top - 20 <= this.player.hitbox.sides.bottom
    ) {
      const playerCenterX =
        this.player.hitbox.position.x + this.player.hitbox.width / 2;
      const enemyCenterX = this.hitbox.position.x + this.hitbox.width / 2;

      if (currentTime - this.lastAttackTime >= attackCooldown) {
        this.isAttacking = true;
        this.switchSprite("attack");
        this.flip = enemyCenterX <= playerCenterX;
        this.lastAttackTime = currentTime;
      }
    } else {
      this.isAttacking = false;
    }
  }
}
