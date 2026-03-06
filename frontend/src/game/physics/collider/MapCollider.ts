import { Position } from "../../manager/model/transform/Position";
import type { BoundingBox } from "../../Types";
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

  public getWorldBoxAt(position: Position): BoundingBox[] {
    return this.positionList.map((tilePos) => {
      return this.getWorldBoxByTilePositionAt(position, tilePos);
    });
  }

  public getWorldBoxByTilePositionAt(
    worldPosition: Position,
    tilePos: Position,
  ): BoundingBox {
    if (!this.gameObject) {
      throw new Error("Game object not found");
    }

    const goScale = this.gameObject.transform.scale;

    const x =
      worldPosition.x +
      this.offset.x * goScale.x +
      tilePos.x * this.tileSize * goScale.x;
    const y =
      worldPosition.y +
      this.offset.y * goScale.y +
      tilePos.y * this.tileSize * goScale.y;
    const w = this.tileSize * goScale.x;
    const h = this.tileSize * goScale.y;

    return { x, y, w, h };
  }

  protected debugLines(ctx: CanvasRenderingContext2D): void {
    this.positionList.forEach((tilePos) => {
      ctx.strokeStyle = this.debugColor;
      const { x, y, w, h } = this.getWorldBoxByTilePositionAt(
        this.gameObject!.transform.position,
        tilePos,
      );
      ctx.strokeRect(x, y, w, h);
    });
  }
}
