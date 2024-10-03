import { Animation } from "./Animation";

export type SpriteConstructor = {
  position: Vector2D;
  imageSrc: string;
  frameRate?: number;
  animations?: { [key: string]: Animation };
  frameBuffer?: number;
  loop?: boolean;
  autoplay?: boolean;
  visible?: boolean;
};
