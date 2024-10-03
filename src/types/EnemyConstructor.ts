import { Player } from "../classes/Player";
import { Animation } from "./Animation";

export type EnemyConstructor = {
  position: Vector2D;
  collisionBlocks: Box[];
  imageSrc: string;
  frameRate: number;
  animations: { [key: string]: Animation };
  loop?: boolean;
  player: Player;
};
