import { GameConfiguration } from "../../../constants";
import { AnimatedSprite } from "../../../manager/model/animated-sprite";
import type { GameObject } from "../../../manager/model/game-object";
import { PlayerBaseState } from "./PlayerBaseState";
import { PlayerIdleState } from "./PlayerIdleState";
import { PlayerWalkingState } from "./PlayerWalkingState";

export class PlayerStateManager {
  private static instance: PlayerStateManager;
  private currentState: PlayerBaseState;

  private asset = GameConfiguration.GAME.ASSETS.PLAYER.LEGS;
  private offset = GameConfiguration.GAME.PLAYER.OFFSET;
  private playerObject!: GameObject;

  private idleState: PlayerIdleState = new PlayerIdleState();
  private walkingState: PlayerWalkingState = new PlayerWalkingState();

  private legWalkingSprite = new AnimatedSprite(8);
  private legIdleSprite = new AnimatedSprite(8);

  private constructor() {
    this.legWalkingSprite.loadFromPublicSequence(
      this.asset.WALK.PATH,
      this.asset.WALK.FRAME,
    );

    this.legIdleSprite.loadFromPublicSequence(
      this.asset.IDLE.PATH,
      this.asset.IDLE.FRAME,
    );

    this.currentState = this.idleState;
    this.currentState.onEnter(this);
  }

  static getInstance(): PlayerStateManager {
    if (this.instance == null) {
      this.instance = new PlayerStateManager();
    }
    return this.instance;
  }

  setGameObject(obj: GameObject) {
    this.playerObject = obj;
  }
  switchState(state: PlayerBaseState) {
    this.currentState.onExit(this);
    this.currentState = state;
    this.currentState.onEnter(this);
  }

  update(dt: number) {
    this.currentState.onUpdate(this, dt);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.currentState.onDraw(this, ctx);
  }

  public getIdleState(): PlayerIdleState {
    return this.idleState;
  }

  public getWalkingState(): PlayerWalkingState {
    return this.walkingState;
  }

  public getLegWalkingSprite(): AnimatedSprite {
    return this.legWalkingSprite;
  }

  public getLegIdleSprite(): AnimatedSprite {
    return this.legIdleSprite;
  }

  public getOffset() {
    return this.offset;
  }

  public getPlayerObject(): GameObject {
    if (this.playerObject == null) {
      throw new Error("Player Object Not Assigned!");
    }
    return this.playerObject;
  }
}
