export class CollisionBlock {
  position: Vector2D;
  width: number;
  height: number;
  sides: Sides;

  constructor({ position }: Box) {
    this.position = position;
    this.width = 64;
    this.height = 64;
    this.sides = {
      top: position.y,
      bottom: position.y + this.height,
      left: position.x,
      right: position.x + this.width,
    };
  }

  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = "rgba(255, 0, 0, 0.3)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
