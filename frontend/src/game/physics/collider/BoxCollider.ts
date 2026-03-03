import type { Position } from "../../manager/model/transform/position";
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
      relative?: boolean;
    },
  ) {
    const { debugColor, isTrigger = false, relative = true } = options ?? {};
    super(offset, relative, isTrigger, debugColor);
    this.width = width;
    this.height = height;
  }

  private getWorldBox(): { x: number; y: number; w: number; h: number } {
    if (!this.gameObject) {
      return {
        x: this.offset.x,
        y: this.offset.y,
        w: this.width,
        h: this.height,
      };
    }

    const goPos = this.gameObject.transform.position;
    const goScale = this.gameObject.transform.scale;

    if (!this.relative) {
      return {
        x: this.offset.x,
        y: this.offset.y,
        w: this.width,
        h: this.height,
      };
    }

    const x = goPos.x + this.offset.x * goScale.x;
    const y = goPos.y + this.offset.y * goScale.y;
    const w = this.width * goScale.x;
    const h = this.height * goScale.y;

    return { x, y, w, h };
  }

  protected debugLines(
    canvas: CanvasRenderingContext2D,
    color: string | CanvasGradient | CanvasPattern,
  ): void {
    canvas.strokeStyle = color;

    const { x, y, w, h } = this.getWorldBox();

    canvas.strokeRect(x, y, w, h);
  }
}
