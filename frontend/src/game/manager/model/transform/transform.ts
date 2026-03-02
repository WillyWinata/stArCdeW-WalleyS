import { Position } from "./position";
import type { Rotation } from "./rotation";
import type { Scale } from "./scale";

export class Transform {
  position: Position;
  scale: Scale;
  rotation: Rotation;
  constructor(position: Position, scale: Scale, rotation: Rotation) {
    this.position = position;
    this.scale = scale;
    this.rotation = rotation;
  }
}
