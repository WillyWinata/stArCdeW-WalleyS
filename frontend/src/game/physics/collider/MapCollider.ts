import { Position } from "../../manager/model/transform/position";
import { BoxCollider } from "./BoxCollider";
import { Collider } from "./Collider";

export class MapCollider extends Collider {
  private positionList: Position[];
  private tileSize: number;
  private done: boolean = false;

  constructor(
    offset: Position = { x: 0, y: 0 },
    tileSize: number,
    positionList: Position[],
    options?: {
      debugColor?: string;
      isTrigger?: boolean;
    },
  ) {
    const { debugColor, isTrigger = false } = options ?? {};
    super(offset, isTrigger, debugColor);
    this.tileSize = tileSize;
    this.positionList = positionList;
  }

  public getWorldBox(tilePos: Position): {
    x: number;
    y: number;
    w: number;
    h: number;
  } {
    if (!this.gameObject) {
      throw new Error("Game object not found");
    }

    const goPos = this.gameObject.transform.position;
    const goScale = this.gameObject.transform.scale;

    const x =
      goPos.x +
      this.offset.x * goScale.x +
      tilePos.x * this.tileSize * goScale.x;
    const y =
      goPos.y +
      this.offset.y * goScale.y +
      tilePos.y * this.tileSize * goScale.y;
    const w = this.tileSize * goScale.x;
    const h = this.tileSize * goScale.y;

    return { x, y, w, h };
  }

  protected debugLines(ctx: CanvasRenderingContext2D): void {
    const { x, y, w, h } = this.getWorldBox(this.positionList[0]);

    this.positionList.forEach((position) => {
      ctx.strokeStyle = this.debugColor;
      const { x, y, w, h } = this.getWorldBox(position);
      ctx.strokeRect(x, y, w, h);
    });
  }
}
