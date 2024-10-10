import gsap from "gsap";
import "./assets/styles/style.css";
import { Player } from "./classes/Player";
import { handleKeyDown, handleKeyUp } from "./eventListeners";
import { CollisionBlock } from "./classes/CollisionBlock";
import {
  background,
  diamonds,
  doors,
  enemies,
  init,
  instructionManager,
  levels,
} from "./levels";

export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
if (!canvas) throw new Error("Canvas element not found");
canvas.width = 64 * 16;
canvas.height = 64 * 9;

const c = canvas.getContext("2d");
if (!c) throw new Error("Canvas context not found");

let collisionBlocks: CollisionBlock[] = [];
let level = 1;

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
            init(levels[level]);
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

init(levels[level]);
animate();

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
