import gsap from "gsap";
import "./assets/styles/style.scss";
import "./assets/styles/game.scss";
import { Player } from "./classes/Player";
import { handleKeyDown, handleKeyUp } from "./eventListeners";
import {
  background,
  diamonds,
  doors,
  enemies,
  init,
  instructionManager,
  levels,
} from "./levels";
import { isUserLoggedIn, setupWindowSizeCheck } from "./utils";

if (!isUserLoggedIn()) window.location.href = "/login";

setupWindowSizeCheck();

export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
if (!canvas) throw new Error("Canvas element not found");
canvas.width = 64 * 16;
canvas.height = 64 * 9;

const c = canvas.getContext("2d");
if (!c) throw new Error("Canvas context not found");

let level: number = 1;
let fps: number = 60;
let interval: number = Math.floor(1000 / fps);
let startTime: number = performance.now();
let previousTime: number = startTime;
let currentTime: number = 0;
let deltaTime: number = 0;

export const player = new Player();

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

export function nextLevel() {
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
}

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

function animate(timestamp: number) {
  if (!canvas || !c) throw new Error("Canvas or canvas context wasn't found");

  currentTime = timestamp;
  deltaTime = currentTime - previousTime;

  if (deltaTime > interval) {
    previousTime = currentTime - (deltaTime % interval);

    player.handleInput(keys);
    update(c);
    drawLevel(c);

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = "#3f3851";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
  }

  window.requestAnimationFrame(animate);
}

init(levels[level]);
animate(0);

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
