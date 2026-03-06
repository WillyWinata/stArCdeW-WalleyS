import type { Speed } from "./Speed";

export class Physic {
  speed: Speed;
  constructor(speed: Speed) {
    this.speed = speed;
  }

  public calculateSpeedMagnitude(): number {
    return Math.sqrt(Math.pow(this.speed.x, 2) + Math.pow(this.speed.y, 2));
  }
}
