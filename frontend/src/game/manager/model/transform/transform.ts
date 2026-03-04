import { Position } from "./position";
import type { Rotation } from "./rotation";
import type { Scale } from "./scale";

export class Transform {
  position: Position;
  scale: Scale;
  rotation: Rotation;
  offset?: Position;

  constructor(position: Position, scale: Scale, rotation: Rotation, offset?: Position) {
    this.position = position;
    this.scale = scale;
    this.rotation = rotation;
    this.offset = offset;
  }
}

export const defaultTransform: Transform = new Transform(
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 0,
  },
  {
    z: 0,
  },
);
