import { doors } from "./levels";
import { canvas, keys, player } from "./main";

export function handleKeyDown(event: KeyboardEvent) {
  if (player.preventInput) return;
  switch (event.code) {
    case "KeyW":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
          player.hitbox &&
          player.hitbox.sides.left >= door.position.x &&
          player.hitbox.sides.right <= door.position.x + door.width &&
          player.hitbox.sides.bottom >= door.position.y &&
          player.hitbox.sides.top <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite("enterDoor");
          door.play();
          return;
        }
      }
      if (player.velocity.y === 0) {
        player.velocity.y = -17;
      }
      break;
    case "KeyA":
      keys.KeyA.pressed = true;
      break;
    case "KeyD":
      keys.KeyD.pressed = true;
      break;
    case "Space":
      player.attack();
      break;
  }
}

export function handleKeyUp(event: KeyboardEvent) {
  switch (event.code) {
    case "KeyA":
      keys.KeyA.pressed = false;
      break;
    case "KeyD":
      keys.KeyD.pressed = false;
      break;
  }
}

let isDisplayingWindowSizeMessage: boolean = false;

export function checkWindowSize() {
  if (canvas.width > window.innerWidth || canvas.height > window.innerHeight) {
    if (isDisplayingWindowSizeMessage) return;
    showMessage(
      "This game is designed to run on a PC with minimum resolution of 1024x576 please adjust window size or run on a compatible screen"
    );
    isDisplayingWindowSizeMessage = true;
  } else {
    if (isDisplayingWindowSizeMessage) {
      hideMessage();
      isDisplayingWindowSizeMessage = false;
    }
  }
}

function showMessage(message: string) {
  const messageElement = document.getElementById("message");
  const messageContainer = document.getElementById("messageContainer");

  if (messageElement && messageContainer) {
    messageElement.innerText = message;
    messageContainer.style.visibility = "visible";
  }
}

function hideMessage() {
  const messageContainer = document.getElementById("messageContainer");
  if (messageContainer) {
    messageContainer.style.visibility = "hidden";
  }
}
