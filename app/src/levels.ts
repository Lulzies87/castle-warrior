import { CollisionBlock } from "./classes/CollisionBlock";
import { Diamond } from "./classes/Diamond";
import { Door } from "./classes/Door";
import { Enemy } from "./classes/Enemy";
import { InstructionManager } from "./classes/InstructionManager";
import { Sprite } from "./classes/Sprite";
import { canvas, player } from "./main";
import { Level, LevelData } from "./types/LevelData";
import { createObjectsFrom2D, parse2D } from "./utils";

const instructionText = document.getElementById(
  "instructionText"
) as HTMLParagraphElement;
if (!instructionText) throw new Error("Instruction element not found");
export let instructionManager = new InstructionManager(instructionText);

let parsedCollisions;
let collisionBlocks: CollisionBlock[] = [];
export let background: Sprite;
export let doors: Door[] = [];
export let diamonds: Diamond[] = [];
export let enemies: Enemy[] = [];

export const levels: LevelData = {
  1: {
    background: {
      imageSrc: "../src/assets/img/backgroundLevel1.png",
      position: {
        x: 0,
        y: 0,
      },
    },
    player: { position: { x: 200, y: 200 } },
    collisions: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292,
      292, 292, 292, 292, 0, 0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
      0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0, 0, 292, 292, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 292, 0, 0, 292, 292, 292, 292, 292, 292, 292, 292,
      292, 292, 292, 292, 292, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    doors: [
      {
        position: {
          x: 767,
          y: 270,
        },
      },
    ],
    diamonds: [],
    enemies: [],
    instructions: [
      {
        position: {
          top: 64,
          left: 512,
        },
        message: {
          text: `A - Move left\nD - Move right\nW - Jump / Enter door`,
          duration: 6,
        },
      },
      {
        position: {
          top: 64,
          left: 512,
        },
        message: {
          text: "Enter the door to get to the next level.",
          duration: 5,
        },
      },
    ],
  },
  2: {
    background: {
      imageSrc: "../src/assets/img/backgroundLevel2.png",
      position: {
        x: 0,
        y: 0,
      },
    },
    player: { position: { x: 60, y: 70 } },
    collisions: [
      292, 292, 292, 292, 292, 292, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0, 0,
      0, 0, 0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0, 0, 0, 0, 0, 292, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 292, 292, 292, 292, 0, 0, 292, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 292, 0, 0, 292, 0, 0, 292, 292, 292, 292, 292, 292, 0, 0, 292,
      292, 292, 0, 0, 292, 292, 292, 292, 0, 0, 0, 0, 292, 0, 0, 292, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0, 0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 292,
      292, 292, 292, 292, 0, 0, 292, 292, 292, 292, 292, 292, 292, 292, 292,
      292, 292, 0, 0, 0, 0,
    ],
    doors: [
      {
        position: {
          x: 772,
          y: 335,
        },
      },
    ],
    diamonds: [
      {
        position: { x: 300, y: 280 },
      },
      {
        position: { x: 200, y: 440 },
      },
      {
        position: { x: 715, y: 380 },
      },
      {
        position: { x: 480, y: 440 },
      },
    ],
    enemies: [],
    instructions: [
      {
        position: {
          top: 128,
          left: 704,
        },
        message: {
          text: "Collect diamonds to earn points.",
          duration: 5,
        },
      },
    ],
  },
  3: {
    background: {
      imageSrc: "../src/assets/img/backgroundLevel3.png",
      position: {
        x: 0,
        y: 0,
      },
    },
    player: { position: { x: 680, y: 140 } },
    collisions: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 250, 250, 250, 250,
      250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 0, 0, 250, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 250, 0, 0, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 250, 0, 0, 250, 0, 0, 0, 0, 0, 0, 0, 0, 250, 250, 250, 250, 250, 0, 0,
      250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 250, 0, 0, 0, 250, 250, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 250, 250, 0, 0, 0, 250, 250, 250, 250, 250, 250, 250, 250,
      250, 250, 250, 250, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0,
    ],
    doors: [
      {
        position: {
          x: 176,
          y: 334,
        },
      },
    ],
    diamonds: [],
    enemies: [{ position: { x: 700, y: 370 } }],
    instructions: [
      {
        position: {
          top: 0,
          left: 512,
        },
        message: {
          text: "Press SPACE to attack enemies",
          duration: 6,
        },
      },
    ],
  },
};

export function init(levelData: Level) {
  parsedCollisions = parse2D(levelData.collisions);
  collisionBlocks = createObjectsFrom2D(parsedCollisions);

  player.collisionBlocks = collisionBlocks;
  player.lastDirection = "left";
  player.position.x = levelData.player.position.x;
  player.position.y = levelData.player.position.y;

  doors = [];
  diamonds = [];
  enemies = [];

  if (player.currentAnimation) player.currentAnimation.isActive = false;

  background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: levelData.background.imageSrc,
  });

  const doorsData = levelData.doors;
  if (doorsData.length > 0) {
    doorsData.forEach((door) => {
      doors.push(
        new Door({
          position: { x: door.position.x, y: door.position.y },
        })
      );
    });
  }

  const diamondsData = levelData.diamonds;
  if (diamondsData.length > 0) {
    diamondsData.forEach((diamond) => {
      diamonds.push(
        new Diamond({
          position: { x: diamond.position.x, y: diamond.position.y },
          onCollision: () => {
            console.log("Diamond Collected!");
          },
        })
      );
    });
  }

  const enemiesData = levelData.enemies;
  if (enemiesData.length > 0) {
    enemiesData.forEach((enemy) => {
      enemies.push(
        new Enemy({
          imageSrc: "../src/assets/img/pig/idle.png",
          frameRate: 11,
          position: {
            x: enemy.position.x,
            y: enemy.position.y,
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
        })
      );
    });
  }

  if (levelData.instructions && levelData.instructions.length > 0) {
    levelData.instructions.forEach((instruction) => {
      const topPosition = canvas.offsetTop;
      const leftPosition = canvas.offsetLeft;

      instruction.position.top += topPosition;
      instruction.position.left += leftPosition;
    });

    instructionManager.start(levelData.instructions);
  }
}