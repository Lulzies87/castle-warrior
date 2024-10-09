import { Player } from "../classes/Player";
import { Animation } from "./Animation";

export type EnemyConstructor = {
  position: Vector2D;
  imageSrc?: string;
  frameRate?: number;
  animations?: { [key: string]: Animation };
  loop?: boolean;
  collisionBlocks: Box[];
  player: Player;
};
