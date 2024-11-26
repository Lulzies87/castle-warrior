import { CollisionBlock } from "../classes/CollisionBlock";
import { Player } from "../classes/Player";

export type EnemyConstructor = {
  position: Vector2D;
  collisionBlocks: CollisionBlock[];
  player: Player;
};
