import { Positon } from "./position";
import type { Rotation } from "./rotation";
import type { Scale } from "./scale";

export class Transform {
  position: Positon;
  scale: Scale;
  rotation: Rotation;
  constructor(position: Positon, scale: Scale, rotation: Rotation) {
    this.position = position;
    this.scale = scale;
    this.rotation = rotation;
  }
}
