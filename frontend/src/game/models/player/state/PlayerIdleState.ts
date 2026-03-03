import { PlayerBaseState } from "./PlayerBaseState";
import type { PlayerStateManager } from "./PlayerStateManager";

export class PlayerIdleState extends PlayerBaseState {
  onEnter(manager: PlayerStateManager): void {
    throw new Error("Method not implemented.");
  }

  onUpdate(manager: PlayerStateManager, dt: number): void {
    throw new Error("Method not implemented.");
  }

  onDraw(manager: PlayerStateManager, ctx: CanvasRenderingContext2D): void {
    const baseX = manager.getPlayerObject().transform.position.x;
    const baseY = manager.getPlayerObject().transform.position.y;

    const scX = manager.getPlayerObject().transform.scale.x;
    const scY = manager.getPlayerObject().transform.scale.y;

    const legOffsetX = manager.getOffset().LEGS.x * scX;
    const legOffsetY = manager.getOffset().LEGS.y * scY;

    manager
      .getLegIdleSprite()
      .draw(ctx, baseX + legOffsetX, baseY + legOffsetY, scX, scY);
  }

  onExit(manager: PlayerStateManager): void {
    throw new Error("Method not implemented.");
  }
}
