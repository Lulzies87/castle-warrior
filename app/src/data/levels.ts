import { CollisionBlock } from "../classes/CollisionBlock";
import { Diamond } from "../classes/Diamond";
import { Door } from "../classes/Door";
import { Enemy } from "../classes/Enemy";
import { InstructionManager } from "../classes/InstructionManager";
import { Sprite } from "../classes/Sprite";
import { canvas, player } from "../main";
import { LevelData } from "../types/LevelData";
import { createObjectsFrom2D, parse2D } from "../utils";

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
      imageSrc: "../assets/img/backgroundLevel1.png",
      position: {
        x: 0,
        y: 0,
      },
    },
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

    init: () => {
      parsedCollisions = parse2D(levels[1].collisions);
      collisionBlocks = createObjectsFrom2D(parsedCollisions);
      player.collisionBlocks = collisionBlocks;

      doors = [];
      diamonds = [];
      enemies = [];

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "../src/assets/img/backgroundLevel1.png",
      });

      const doorsData = levels[1].doors;
      if (doorsData.length > 0) {
        doorsData.forEach((door) => {
          doors.push(
            new Door({
              position: { x: door.position.x, y: door.position.y },
            })
          );
        });
      }

      const diamondsData = levels[1].diamonds;
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

      const enemiesData = levels[1].enemies;
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

      instructionText.style.top = `${canvas!.offsetTop}px`;
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
    background: {
      imageSrc: "../src/assets/img/backgroundLevel2.png",
      position: {
        x: 0,
        y: 0,
      },
    },
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

    init: () => {
      parsedCollisions = parse2D(levels[2].collisions);
      collisionBlocks = createObjectsFrom2D(parsedCollisions);

      player.collisionBlocks = collisionBlocks;
      player.position.x = 60;
      player.position.y = 70;

      doors = [];
      diamonds = [];
      enemies = [];

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "../src/assets/img/backgroundLevel2.png",
      });

      const doorsData = levels[2].doors;
      if (doorsData.length > 0) {
        doorsData.forEach((door) => {
          doors.push(
            new Door({
              position: { x: door.position.x, y: door.position.y },
            })
          );
        });
      }

      const diamondsData = levels[2].diamonds;
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

      const enemiesData = levels[2].enemies;
      if (enemiesData.length > 0) {
        enemiesData.forEach((enemy) => {
          enemies.push(
            new Enemy({
              position: {
                x: enemy.position.x,
                y: enemy.position.y,
              },
              collisionBlocks: collisionBlocks,
              player: player,
            })
          );
        });
      }

      const newTopValue = canvas!.offsetTop + 128;
      instructionText.style.top = `${newTopValue}px`;
      instructionText.style.left = "calc(50% + 160px)";
      instructionManager.addInstruction("Collect diamonds to earn points.", 5);
      instructionManager.start();
    },
  },
  3: {
    background: {
      imageSrc: "../src/assets/img/backgroundLevel3.png",
      position: {
        x: 0,
        y: 0,
      },
    },
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

    init: () => {
      parsedCollisions = parse2D(levels[3].collisions);
      collisionBlocks = createObjectsFrom2D(parsedCollisions);

      player.collisionBlocks = collisionBlocks;
      player.lastDirection = "left";
      player.position.x = 680;
      player.position.y = 140;

      doors = [];
      diamonds = [];
      enemies = [];

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "../src/assets/img/backgroundLevel3.png",
      });

      const doorsData = levels[3].doors;
      if (doorsData.length > 0) {
        doorsData.forEach((door) => {
          doors.push(
            new Door({
              position: { x: door.position.x, y: door.position.y },
            })
          );
        });
      }

      const diamondsData = levels[3].diamonds;
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

      const enemiesData = levels[3].enemies;
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

      instructionText.style.top = `${canvas!.offsetTop}px`;
      instructionText.style.left = "50%";
      instructionManager.addInstruction("Press SPACE to attack enemies", 6);
      instructionManager.start();
    },
  },
};
