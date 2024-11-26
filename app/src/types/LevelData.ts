export interface Position {
  position: Vector2D;
}

interface Instruction {
  position: {
    top: number;
    left: number;
  };
  message: {
    text: string;
    duration: number;
  };
}

export interface Level {
  background: {
    imageSrc: string;
    position: Vector2D;
  };
  player: { position: Vector2D; direction: "left" | "right" };
  collisions: number[];
  doors: Position[];
  diamonds: Position[];
  enemies: Position[];
  instructions?: Instruction[];
}

export interface LevelData {
  [key: number]: Level;
}
