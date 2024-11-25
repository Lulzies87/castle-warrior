import { Player } from "../classes/Player";

export type EnemyConstructor = {
  position: Vector2D;
  collisionBlocks: Box[];
  player: Player;
};
