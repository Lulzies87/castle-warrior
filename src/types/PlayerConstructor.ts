import { Animation } from "./Animation";

export type PlayerConstructor = {
  collisionBlocks: Box[];
  imageSrc: string;
  frameRate: number;
  animations: { [key: string]: Animation };
  loop?: boolean;
  hitbox?: Box;
};
