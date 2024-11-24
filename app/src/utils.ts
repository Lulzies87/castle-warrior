import { CollisionBlock } from "./classes/CollisionBlock";

function isUserLoggedIn(): boolean {
  const userToken = document.cookie.includes("token=");
  if (userToken) {
    return true;
  } else {
    return false;
  }
}

function parse2D(arr: number[]): number[][] {
  const rows: number[][] = [];
  for (let i = 0; i < arr.length; i += 16) {
    rows.push(arr.slice(i, i + 16));
  }

  return rows;
}

function createObjectsFrom2D(array: number[][]): CollisionBlock[] {
  const objects: CollisionBlock[] = [];
  array.forEach((row: number[], y: number) => {
    row.forEach((symbol: number, x: number) => {
      if (symbol === 292 || symbol === 250) {
        const position = {
          x: x * 64,
          y: y * 64,
        };
        const width = 64;
        const height = 64;
        const sides = {
          top: position.y,
          bottom: position.y + height,
          left: position.x,
          right: position.x + width,
        };

        objects.push(
          new CollisionBlock({
            position,
            width,
            height,
            sides,
          })
        );
      }
    });
  });

  return objects;
}

function isWindowSizeOk(): boolean {
  if (window.innerWidth < 1024 || window.innerHeight < 576) return false;
  return true;
}

function showMessage(message: string) {
  const messageContainer = document.getElementById("messageContainer");
  const messageElement = document.getElementById("message");

  if (messageContainer && messageElement) {
    messageElement.innerText = message;
    messageContainer.style.visibility = "visible";
  }
}

function hideMessage() {
  const messageContainer = document.getElementById("messageContainer");
  const messageElement = document.getElementById("message");

  if (messageContainer && messageElement) {
    messageContainer.style.visibility = "hidden";
    messageElement.innerText = "";
  }
}

function checkWindowSize() {
  if (!isWindowSizeOk()) {
    showMessage(
      "This game is designed to run on a PC with minimum resolution of 1024x576 please adjust window size or run on a compatible screen"
    );
  } else {
    hideMessage();
  }
}

function setupWindowSizeCheck() {
  checkWindowSize();
  window.addEventListener("resize", checkWindowSize);
}

function updateScoreDisplay(score: number): void {
  const scoreElement = document.getElementById("score");
  if (!scoreElement) throw new Error("Score element wasn't found");
  scoreElement.innerText = `Score: ${score}`;
}

export {
  isUserLoggedIn,
  parse2D,
  createObjectsFrom2D,
  isWindowSizeOk,
  showMessage,
  hideMessage,
  checkWindowSize,
  setupWindowSizeCheck,
  updateScoreDisplay
};
