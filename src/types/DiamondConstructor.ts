export type DiamondConstructor = {
  position: Vector2D;
  imageSrc?: string;
  frameRate?: number;
  frameBuffer?: number;
  loop?: boolean;
  autoplay?: boolean;
  collected?: boolean;
  onCollision: () => void;
  visible?: boolean;
};
