import type { GameObject } from "./game-object";

export abstract class MonoBehaviour {
  start?(): void;

  id: string = crypto.randomUUID();
  order: number;
  gameObject!: GameObject;

  abstract clone(): MonoBehaviour;
  abstract update(dt: number): void;
  draw?(ctx: CanvasRenderingContext2D): void;

  constructor(order: number) {
    this.order = order;
  }
}
