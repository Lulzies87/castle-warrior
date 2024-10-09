export interface DoorConstructor {
  position: Vector2D;
  imageSrc?: string;
  frameRate?: number;
  frameBuffer?: number;
  loop?: boolean;
  autoplay?: boolean;
}
