import { GameObject } from "../../manager/model/game-object";
import { MonoBehavior } from "../../manager/model/mono-behavior";
import { Position } from "../../manager/model/transform/position";
import { PlayerStateManager } from "./state/PlayerStateManager";

export class Player {
  private stateManager: PlayerStateManager;

  constructor() {
    this.stateManager = new PlayerStateManager();
  }

  public getStateManager() {
    return this.stateManager;
  }
}
