import { CollisionBlock } from "./classes/CollisionBlock";

export function parse2D(arr: number[]): number[][] {
  const rows: number[][] = [];
  for (let i = 0; i < arr.length; i += 16) {
    rows.push(arr.slice(i, i + 16));
  }

  return rows;
}

export function createObjectsFrom2D(array: number[][]): CollisionBlock[] {
  const objects: CollisionBlock[] = [];
  array.forEach((row: number[], y: number) => {
    row.forEach((symbol: number, x: number) => {
      if (symbol === 292 || symbol === 250) {
        const position = {
          x: x * 64,
          y: y * 64,
        };
        const width = 64;
        const height = 64;
        const sides = {
          top: position.y,
          bottom: position.y + height,
          left: position.x,
          right: position.x + width,
        };

        objects.push(
          new CollisionBlock({
            position,
            width,
            height,
            sides,
          })
        );
      }
    });
  });

  return objects;
}
