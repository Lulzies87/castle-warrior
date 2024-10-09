import { DoorConstructor } from "../types/DoorConstructor";
import { Sprite } from "./Sprite";

export class Door extends Sprite {
  constructor({
    position,
    imageSrc = "../src/assets/img/doorOpen.png",
    frameRate = 5,
    frameBuffer = 5,
    loop = false,
    autoplay = false,
  }: DoorConstructor) {
    super({
      position,
      imageSrc,
      frameRate,
      frameBuffer,
      loop,
      autoplay,
    });
  }
}
