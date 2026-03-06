import type { Position } from "../../manager/model/transform/Position";
import type { BoundingBox } from "../../Types";
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

  public getWorldBoxAt(position: Position): BoundingBox {
    if (!this.gameObject) {
      throw new Error("Game object not found");
    }

    const goScale = this.gameObject.transform.scale;

    const x = position.x + this.offset.x * goScale.x;
    const y = position.y + this.offset.y * goScale.y;
    const w = this.width * goScale.x;
    const h = this.height * goScale.y;

    return { x, y, w, h };
  }

  protected debugLines(ctx: CanvasRenderingContext2D): void {
    if (!this.gameObject) return;

    ctx.strokeStyle = this.debugColor;

    const { x, y, w, h } = this.getWorldBoxAt(
      this.gameObject.transform.position,
    );
    ctx.strokeText("Box", x, y);
    ctx.strokeRect(x, y, w, h);
  }
}
