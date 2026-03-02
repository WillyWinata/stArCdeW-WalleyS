import { GameConfiguration } from "../constants";
import { InputSystem } from "../manager/input-system";
import { AnimatedSprite } from "../manager/model/animated-sprite";
import { MonoBehavior } from "../manager/model/mono-behavior";

export class PlayerRenderer extends MonoBehavior {
  clone(): MonoBehavior {
    return new PlayerRenderer();
  }

  private playerAssetConfig = GameConfiguration.GAME.ASSETS.PLAYER;
  private movementConfig = GameConfiguration.GAME.CONTROLS.MOVEMENT;

  private legWalkingSprite = new AnimatedSprite(8);
  private legIdleSprite = new AnimatedSprite(8);

  private bodyUpSprite = new AnimatedSprite(8);
  private bodyDownSprite = new AnimatedSprite(8);
  private bodyLeftSprite = new AnimatedSprite(8);
  private bodyRightSprite = new AnimatedSprite(8);

  private lastDir: string = this.movementConfig.DOWN;
  private dirOwner: string = this.movementConfig.DOWN;

  private state: "idle" | "walk" = "idle";

  constructor() {
    super(1);
  }

  async start() {
    await this.legWalkingSprite.loadFromPublicSequence(
      this.playerAssetConfig.LEGS.WALK,
      2,
    );

    await this.legIdleSprite.loadFromPublicSequence(
      this.playerAssetConfig.LEGS.IDLE,
      1,
    );

    await this.bodyUpSprite.loadFromPublicSequence(
      this.playerAssetConfig.BODY.UP,
      1,
    );

    await this.bodyDownSprite.loadFromPublicSequence(
      this.playerAssetConfig.BODY.DOWN,
      1,
    );

    await this.bodyLeftSprite.loadFromPublicSequence(
      this.playerAssetConfig.BODY.LEFT,
      1,
    );

    await this.bodyRightSprite.loadFromPublicSequence(
      this.playerAssetConfig.BODY.RIGHT,
      1,
    );
  }
  update(dt: number): void {
    const input = InputSystem.getInstance();

    const pressW = input.getKey(this.movementConfig.UP);
    const pressS = input.getKey(this.movementConfig.DOWN);
    const pressA = input.getKey(this.movementConfig.LEFT);
    const pressD = input.getKey(this.movementConfig.RIGHT);

    // if (this.dirOwner === null || !input.getKey(this.dirOwner)) {
    //   if (pressD) this.dirOwner = "d";
    //   else if (pressA) this.dirOwner = "a";
    //   else if (pressW) this.dirOwner = "w";
    //   else if (pressS) this.dirOwner = "s";
    //   else this.dirOwner = null;
    // }

    const moving = pressW || pressA || pressS || pressD;
    const nextState: "idle" | "walk" = moving ? "walk" : "idle";

    if (nextState !== this.state) {
      this.state = nextState;
      (this.state === "walk"
        ? this.legWalkingSprite
        : this.legIdleSprite
      ).reset();
    }

    (this.state === "walk" ? this.legWalkingSprite : this.legIdleSprite).update(
      dt,
    );

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
      else if (pressA) this.dirOwner = this.movementConfig.DOWN;
      else if (pressW) this.dirOwner = this.movementConfig.UP;
      else if (pressS) this.dirOwner = this.movementConfig.LEFT;
      else this.dirOwner = this.movementConfig.DOWN;
    }

    if (this.dirOwner) this.lastDir = this.dirOwner;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.gameObject.transform.position;
    const sx = this.gameObject.transform.scale.x;
    const sy = this.gameObject.transform.scale.y;

    const baseX = x;
    const baseY = y;

    const legsOffset = { x: 0, y: 0 };
    const bodyOffset = { x: -3, y: -13 };

    const legOffsetX = this.gameObject.transform.scale.x * legsOffset.x;
    const legOffsetY = this.gameObject.transform.scale.y * legsOffset.y;
    const bodyOffsetX = this.gameObject.transform.scale.x * bodyOffset.x;
    const bodyOffsetY = this.gameObject.transform.scale.y * bodyOffset.y;
    if (this.state === "walk") {
      this.legWalkingSprite.draw(
        ctx,
        baseX + legOffsetX,
        baseY + legOffsetY,
        sx,
        sy,
      );
    } else {
      this.legIdleSprite.draw(
        ctx,
        baseX + legOffsetX,
        baseY + legOffsetY,
        sx,
        sy,
      );
    }

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
  }
}
