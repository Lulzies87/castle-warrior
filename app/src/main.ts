import gsap from "gsap";
import "./assets/styles/style.css";
import { Player } from "./classes/Player";
import { Sprite } from "./classes/Sprite";
import { collisions } from "./data/collisions";
import { createObjectsFrom2D, parse2D } from "./utils";
import { handleKeyDown, handleKeyUp } from "./eventListeners";
import { InstructionManager } from "./classes/InstructionManager";
import { Diamond } from "./classes/Diamond";
import { Enemy } from "./classes/Enemy";
import { CollisionBlock } from "./classes/CollisionBlock";

const canvas = document.querySelector("canvas");
if (!canvas) throw new Error("Canvas element not found");
canvas.width = 64 * 16;
canvas.height = 64 * 9;

const c = canvas.getContext("2d");
if (!c) throw new Error("Canvas context not found");

const instructionText = document.getElementById(
  "instructionText"
) as HTMLParagraphElement;
if (!instructionText) throw new Error("Instruction element not found");
instructionText.style.top = `${canvas.offsetTop}px`;
let instructionManager = new InstructionManager(instructionText);

let parsedCollisions;
let collisionBlocks: CollisionBlock[] = [];
let background: Sprite;
export let doors: Sprite[];
let diamonds: Diamond[] = [];
let enemies: Enemy[] = [];

export const player = new Player({
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
        player.isAttacking = false;
        player.switchSprite("idle");
      },
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 6,
      loop: false,
      imageSrc: "../src/assets/img/king/enterDoor.png",
      onComplete: () => {
        instructionManager.stop();
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;
            if (level === 4) level = 1;
            levels[level].init();
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
  collisionBlocks: collisionBlocks,
});

let level = 1;
let levels: { [key: number]: { init: () => void } } = {
  1: {
    init: () => {
      parsedCollisions = parse2D(collisions.level1);
      collisionBlocks = createObjectsFrom2D(parsedCollisions);
      player.collisionBlocks = collisionBlocks;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "../src/assets/img/backgroundLevel1.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 767,
            y: 270,
          },
          imageSrc: "../src/assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];

      diamonds = [];

      enemies = [];

      instructionText.style.top = `${canvas.offsetTop}px`;
      instructionText.style.left = "50%";
      instructionManager.addInstruction(
        `A - Move left\nD - Move right\nW - Jump / Enter door`,
        6
      );
      instructionManager.addInstruction(
        "Enter the door to get to the next level.",
        5
      );
      instructionManager.start();
    },
  },
  2: {
    init: () => {
      parsedCollisions = parse2D(collisions.level2);
      collisionBlocks = createObjectsFrom2D(parsedCollisions);
      player.collisionBlocks = collisionBlocks;
      player.position.x = 60;
      player.position.y = 70;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "../src/assets/img/backgroundLevel2.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 772,
            y: 335,
          },
          imageSrc: "../src/assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];

      diamonds = [
        new Diamond({
          position: {
            x: 300,
            y: 280,
          },
          onCollision: () => {
            console.log("Diamond Collected!");
          },
        }),
        new Diamond({
          position: {
            x: 200,
            y: 440,
          },
          onCollision: () => {
            console.log("Diamond Collected!");
          },
        }),
        new Diamond({
          position: {
            x: 715,
            y: 380,
          },
          onCollision: () => {
            console.log("Diamond Collected!");
          },
        }),
        new Diamond({
          position: {
            x: 480,
            y: 440,
          },
          onCollision: () => {
            console.log("Diamond Collected!");
          },
        }),
      ];

      enemies = [];

      const newTopValue = canvas.offsetTop + 128;
      instructionText.style.top = `${newTopValue}px`;
      instructionText.style.left = "calc(50% + 160px)";
      instructionManager.addInstruction("Collect diamonds to earn points.", 5);
      instructionManager.start();
    },
  },
  3: {
    init: () => {
      parsedCollisions = parse2D(collisions.level3);
      collisionBlocks = createObjectsFrom2D(parsedCollisions);
      player.collisionBlocks = collisionBlocks;
      player.lastDirection = "left";
      player.position.x = 680;
      player.position.y = 140;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "../src/assets/img/backgroundLevel3.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 176,
            y: 334,
          },
          imageSrc: "../src/assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];

      diamonds = [];

      enemies = [
        new Enemy({
          imageSrc: "../src/assets/img/pig/idle.png",
          frameRate: 11,
          position: {
            x: 700,
            y: 370,
          },
          collisionBlocks: collisionBlocks,
          player: player,
          animations: {
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
        }),
      ];

      instructionText.style.top = `${canvas.offsetTop}px`;
      instructionText.style.left = "50%";
      instructionManager.addInstruction("Press SPACE to attack enemies", 6);
      instructionManager.start();
    },
  },
};

export const keys = {
  KeyW: {
    pressed: false,
  },
  KeyA: {
    pressed: false,
  },
  KeyD: {
    pressed: false,
  },
};
const overlay = {
  opacity: 0,
};

function update(c: CanvasRenderingContext2D) {
  player.update();

  enemies.forEach((enemy) => {
    enemy.update(player);
  });

  diamonds.forEach((diamond) => {
    diamond.checkCollision(player);
  });
}

function drawLevel(c: CanvasRenderingContext2D) {
  background.draw(c);

  doors.forEach((door) => {
    door.draw(c);
  });

  diamonds.forEach((diamond) => {
    diamond.draw(c);
  });

  enemies.forEach((enemy) => {
    enemy.draw(c);
  });

  player.draw(c);
}

function animate() {
  window.requestAnimationFrame(animate);

  if (!canvas || !c) throw new Error("Canvas or canvas context wasn't found");
  player.handleInput(keys);
  update(c);
  drawLevel(c);

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "#3f3851";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init();
animate();

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
