import type { Position } from "../../manager/model/transform/position";
import type { BoundingBox } from "../../types";
import { Collider } from "./Collider";

export class BoxCollider extends Collider {
  private width: number;
  private height: number;

  constructor(
    width: number = 1,
    height: number = 1,
    offset: Position = { x: 0, y: 0 },
    options?: {
      debugColor?: string;
      isTrigger?: boolean;
    },
  ) {
    const { debugColor, isTrigger = false } = options ?? {};
    super(offset, isTrigger, debugColor);
    this.width = width;
    this.height = height;
  }

  public getWorldBox(): BoundingBox {
    if (!this.gameObject) {
      throw new Error("Game object not found");
    }

    const goPos = this.gameObject.transform.position;
    const goScale = this.gameObject.transform.scale;

    const x = goPos.x + this.offset.x * goScale.x;
    const y = goPos.y + this.offset.y * goScale.y;
    const w = this.width * goScale.x;
    const h = this.height * goScale.y;

    return { x, y, w, h };
  }

  protected debugLines(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = this.debugColor;

    const { x, y, w, h } = this.getWorldBox();
    ctx.strokeText(`Nigger`, x, y);
    ctx.strokeRect(x, y, w, h);
  }
}
