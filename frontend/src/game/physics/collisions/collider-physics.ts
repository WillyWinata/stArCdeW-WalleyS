import { GameConfiguration } from "../../constants";
import type { GameObject } from "../../manager/model/game-object";
import type { Position } from "../../manager/model/transform/position";
import type { Scale } from "../../manager/model/transform/scale";
import {
  defaultTransform,
  Transform,
} from "../../manager/model/transform/transform";

export interface ColliderContext {
  gameObject: GameObject;
  transform?: Transform;
  relativeToGameObject?: boolean;
}

export interface ColliderDebugLinesContext {
  canvasContext: CanvasRenderingContext2D;
  color: string | CanvasGradient | CanvasPattern;
}

export abstract class Collider {
  public gameObject: GameObject;
  public transform: Transform;
  public relative: boolean;

  constructor(colliderContext: ColliderContext) {
    this.gameObject = colliderContext.gameObject;
    this.transform = colliderContext.transform ?? defaultTransform;
    this.relative = colliderContext.relativeToGameObject ?? true;
  }

  protected abstract debugLines(ctx: ColliderDebugLinesContext): void;

  public drawDebugLines(ctx: ColliderDebugLinesContext): void {
    if (GameConfiguration.DEBUG_MODE) {
      this.debugLines(ctx);
    }
  }
}

export interface BoxColliderContext extends ColliderContext {
  width?: number;
  height?: number;
}

export class BoxCollider extends Collider {
  private width: number = 1;
  private height: number = 1;

  constructor(boxColliderContext: BoxColliderContext) {
    super({
      transform: boxColliderContext.transform,
      gameObject: boxColliderContext.gameObject,
    });
    this.width = boxColliderContext.width ?? this.width;
    this.height = boxColliderContext.height ?? this.height;
  }

  protected debugLines(ctx: ColliderDebugLinesContext): void {
    let canvasContext: CanvasRenderingContext2D = ctx.canvasContext;

    try {
      canvasContext.strokeStyle = ctx.color ?? "red";
    } catch {
      canvasContext.strokeStyle = "red";
    }

    canvasContext.beginPath();

    let position: Position = this.transform.position;
    let scale: Scale = this.transform.scale;

    let finalPosition: Position = this.relative
      ? {
          x: position.x + this.gameObject.transform.position.x,
          y: position.y + this.gameObject.transform.position.y,
        }
      : position;
    let finalScale: Scale = this.relative
      ? {
          x: scale.x + this.gameObject.transform.scale.x,
          y: scale.y + this.gameObject.transform.scale.y,
        }
      : scale;

    canvasContext.moveTo(finalPosition.x, finalPosition.y);
    canvasContext.lineTo(
      finalPosition.x + this.width * finalScale.x,
      finalPosition.y,
    );
    canvasContext.lineTo(
      finalPosition.x + this.width * finalScale.x,
      finalPosition.y - this.height * finalScale.y,
    );
    canvasContext.lineTo(
      finalPosition.x,
      finalPosition.y - this.height * finalScale.y,
    );
    canvasContext.lineTo(finalPosition.x, finalPosition.y);

    canvasContext.stroke();

    canvasContext.closePath();
  }
}
