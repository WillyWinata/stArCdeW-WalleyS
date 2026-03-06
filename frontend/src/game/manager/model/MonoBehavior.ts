import type { GameObject } from "./GamaObject";

export abstract class MonoBehavior {
  start?(): void;

  id: string = crypto.randomUUID();
  order: number;
  gameObject!: GameObject;

  abstract clone(): MonoBehavior;
  abstract update(dt: number): void;
  draw?(ctx: CanvasRenderingContext2D): void;

  constructor(order: number) {
    this.order = order;
  }
}
