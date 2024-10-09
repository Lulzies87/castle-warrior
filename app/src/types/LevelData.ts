export interface Position {
  position: Vector2D;
}

export interface LevelData {
  [key: number]: {
    background: {
      imageSrc: string;
      position: Vector2D;
    };
    collisions: number[];
    doors: Position[];
    diamonds: Position[];
    enemies: Position[];
    init: () => void;
  };
}
