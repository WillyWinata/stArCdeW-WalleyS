import type { PlayerStateManager } from "./PlayerStateManager";

export abstract class PlayerBaseState {
  abstract onEnter(manager: PlayerStateManager): void;
  abstract onUpdate(manager: PlayerStateManager, dt: number): void;
  abstract onDraw(
    manager: PlayerStateManager,
    ctx: CanvasRenderingContext2D,
  ): void;
  abstract onExit(manager: PlayerStateManager): void;
}
