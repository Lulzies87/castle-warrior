type Vector2D = {
  x: number;
  y: number;
};

type Sides = {
  top: number;
  bottom: number;
  right: number;
  left: number;
};

type Box = {
  position: Vector2D;
  width: number;
  height: number;
  sides: Sides;
};
