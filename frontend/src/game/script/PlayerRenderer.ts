import { GameConfiguration } from "../constants";
import { InputSystem } from "../manager/input-system";
import { AnimatedSprite } from "../manager/model/animated-sprite";
import { MonoBehavior } from "../manager/model/mono-behavior";
import { PlayerStateManager } from "../models/player/state/PlayerStateManager";

export class PlayerRenderer extends MonoBehavior {
  private playerAssetConfig = GameConfiguration.GAME.ASSETS.PLAYER;
  private movementConfig = GameConfiguration.GAME.CONTROLS.MOVEMENT;

  private bodyUpSprite = new AnimatedSprite(8);
  private bodyDownSprite = new AnimatedSprite(8);
  private bodyLeftSprite = new AnimatedSprite(8);
  private bodyRightSprite = new AnimatedSprite(8);

  private lastDir: string = this.movementConfig.DOWN;
  private dirOwner: string | null = null;

  private stateManager!: PlayerStateManager;

  constructor() {
    super(1);
  }

  async start() {
    this.stateManager = PlayerStateManager.getInstance();

    this.bodyUpSprite.loadFromPublicSequence(
      this.playerAssetConfig.BODY.UP.PATH,
      this.playerAssetConfig.BODY.UP.FRAME,
    );
    this.bodyDownSprite.loadFromPublicSequence(
      this.playerAssetConfig.BODY.DOWN.PATH,
      this.playerAssetConfig.BODY.DOWN.FRAME,
    );
    this.bodyLeftSprite.loadFromPublicSequence(
      this.playerAssetConfig.BODY.LEFT.PATH,
      this.playerAssetConfig.BODY.LEFT.FRAME,
    );
    this.bodyRightSprite.loadFromPublicSequence(
      this.playerAssetConfig.BODY.RIGHT.PATH,
      this.playerAssetConfig.BODY.RIGHT.FRAME,
    );
    this.gameObject.isLoaded = true;
  }

  clone(): MonoBehavior {
    return new PlayerRenderer();
  }

  update(dt: number): void {
    const input = InputSystem.getInstance();

    const pressW = input.getKey(this.movementConfig.UP);
    const pressS = input.getKey(this.movementConfig.DOWN);
    const pressA = input.getKey(this.movementConfig.LEFT);
    const pressD = input.getKey(this.movementConfig.RIGHT);

    this.stateManager.update(dt);

    if (input.getKeyDown(this.movementConfig.UP))
      this.dirOwner = this.movementConfig.UP;
    if (input.getKeyDown(this.movementConfig.DOWN))
      this.dirOwner = this.movementConfig.DOWN;
    if (input.getKeyDown(this.movementConfig.LEFT))
      this.dirOwner = this.movementConfig.LEFT;
    if (input.getKeyDown(this.movementConfig.RIGHT))
      this.dirOwner = this.movementConfig.RIGHT;

    if (this.dirOwner && input.getKeyUp(this.dirOwner)) {
      if (pressD) this.dirOwner = this.movementConfig.RIGHT;
      else if (pressA) this.dirOwner = this.movementConfig.LEFT;
      else if (pressW) this.dirOwner = this.movementConfig.UP;
      else if (pressS) this.dirOwner = this.movementConfig.DOWN;
      else this.dirOwner = null;
    }

    if (this.dirOwner) this.lastDir = this.dirOwner;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.gameObject.transform.position;
    const sx = this.gameObject.transform.scale.x;
    const sy = this.gameObject.transform.scale.y;

    const baseX = x;
    const baseY = y;

    const playerOffset = GameConfiguration.GAME.PLAYER.OFFSET;
    const bodyOffset = { x: playerOffset.BODY.x, y: playerOffset.BODY.y };

    const bodyOffsetX = this.gameObject.transform.scale.x * bodyOffset.x;
    const bodyOffsetY = this.gameObject.transform.scale.y * bodyOffset.y;

    if (this.lastDir === this.movementConfig.UP) {
      this.bodyUpSprite.draw(
        ctx,
        baseX + bodyOffsetX,
        baseY + bodyOffsetY,
        sx,
        sy,
      );
    } else if (this.lastDir === this.movementConfig.LEFT) {
      this.bodyLeftSprite.draw(
        ctx,
        baseX + bodyOffsetX,
        baseY + bodyOffsetY,
        sx,
        sy,
      );
    } else if (this.lastDir === this.movementConfig.RIGHT) {
      this.bodyRightSprite.draw(
        ctx,
        baseX + bodyOffsetX,
        baseY + bodyOffsetY,
        sx,
        sy,
      );
    } else if (this.lastDir === this.movementConfig.DOWN) {
      this.bodyDownSprite.draw(
        ctx,
        baseX + bodyOffsetX,
        baseY + bodyOffsetY,
        sx,
        sy,
      );
    }
    this.stateManager.draw(ctx);
  }
}
