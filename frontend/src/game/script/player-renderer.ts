import { GameConfiguration } from "../constants";
import { InputSystem } from "../manager/input-system";
import { AnimatedSprite } from "../manager/model/animated-sprite";
import { MonoBehavior } from "../manager/model/mono-behavior";

export class PlayerRenderer extends MonoBehavior {
  clone(): MonoBehavior {
    return new PlayerRenderer()
  }

  private config = GameConfiguration;

  private legWalkingSprite = new AnimatedSprite(8);
  private legIdleSprite = new AnimatedSprite(8);

  private bodyUpSprite = new AnimatedSprite(8);
  private bodyDownSprite = new AnimatedSprite(8);
  private bodyLeftSprite = new AnimatedSprite(8);
  private bodyRightSprite = new AnimatedSprite(8);

  private lastDir: string = "s";
  private dirOwner: "w" | "a" | "s" | "d" | null = null;

  private state: "idle" | "walk" = "idle";

  constructor() {
    super(1);
  }

  async start() {
    await this.legWalkingSprite.loadFromPublicSequence(
      this.config.GAME.ASSETS.PLAYER.LEGS.WALK,
      2,
    );
    
    await this.legIdleSprite.loadFromPublicSequence(
      this.config.GAME.ASSETS.PLAYER.LEGS.IDLE,
      1,
    );

    await this.bodyUpSprite.loadFromPublicSequence(
      this.config.GAME.ASSETS.PLAYER.BODY.UP,
      1,
    );

    await this.bodyDownSprite.loadFromPublicSequence(
      this.config.GAME.ASSETS.PLAYER.BODY.DOWN,
      1,
    );

    await this.bodyLeftSprite.loadFromPublicSequence(
      this.config.GAME.ASSETS.PLAYER.BODY.LEFT,
      1,
    );

    await this.bodyRightSprite.loadFromPublicSequence(
      this.config.GAME.ASSETS.PLAYER.BODY.RIGHT,
      1,
    );
  }
  update(dt: number): void {
    const input = InputSystem.getInstance();

    const pressW = input.getKey("w");
    const pressA = input.getKey("a");
    const pressS = input.getKey("s");
    const pressD = input.getKey("d");

    if (this.dirOwner === null || !input.getKey(this.dirOwner)) {
      if (pressD) this.dirOwner = "d";
      else if (pressA) this.dirOwner = "a";
      else if (pressW) this.dirOwner = "w";
      else if (pressS) this.dirOwner = "s";
      else this.dirOwner = null;
    }

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

    if (input.getKeyDown("w")) this.dirOwner = "w";
    if (input.getKeyDown("a")) this.dirOwner = "a";
    if (input.getKeyDown("s")) this.dirOwner = "s";
    if (input.getKeyDown("d")) this.dirOwner = "d";

    if (this.dirOwner && input.getKeyUp(this.dirOwner)) {
      if (pressD) this.dirOwner = "d";
      else if (pressA) this.dirOwner = "a";
      else if (pressW) this.dirOwner = "w";
      else if (pressS) this.dirOwner = "s";
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

    console.log(`last dir: ${this.lastDir}`);
    if (this.lastDir === "w") {
      this.bodyUpSprite.draw(
        ctx,
        baseX + bodyOffsetX,
        baseY + bodyOffsetY,
        sx,
        sy,
      );
    } else if (this.lastDir === "a") {
      this.bodyLeftSprite.draw(
        ctx,
        baseX + bodyOffsetX,
        baseY + bodyOffsetY,
        sx,
        sy,
      );
    } else if (this.lastDir === "d") {
      this.bodyRightSprite.draw(
        ctx,
        baseX + bodyOffsetX,
        baseY + bodyOffsetY,
        sx,
        sy,
      );
    } else if (this.lastDir === "s") {
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
