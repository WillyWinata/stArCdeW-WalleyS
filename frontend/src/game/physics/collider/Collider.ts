import { GameConfiguration } from "../../constants";
import type { GameObject } from "../../manager/model/game-object";
import type { Position } from "../../manager/model/transform/position";

export abstract class Collider {
  public gameObject?: GameObject;

  public offset: Position;
  public isTrigger: boolean;
  public debugColor: string;

  constructor(
    offset: Position = { x: 0, y: 0 },
    isTrigger: boolean = false,
    debugColor: string = GameConfiguration.GAME.COLLIDER.COLLIDER_COLOR,
  ) {
    this.offset = offset;
    this.isTrigger = isTrigger;
    this.debugColor = debugColor;
  }

  public attach(gameObject: GameObject): this {
    this.gameObject = gameObject;
    return this;
  }

  public drawDebugLines(canvas: CanvasRenderingContext2D): void {
    if (!GameConfiguration.GAME.COLLIDER.DEBUG_MODE) return;
    if (!this.gameObject) return;
    this.debugLines(canvas);
  }

  protected abstract debugLines(ctx: CanvasRenderingContext2D): void;
}
