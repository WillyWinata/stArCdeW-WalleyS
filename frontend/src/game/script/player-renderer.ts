import { AnimatedSprite } from "../manager/model/animated-sprite";
import { MonoBehaviour } from "../manager/model/mono-behaviour";

export class PlayerRenderer extends MonoBehaviour {
  clone(): MonoBehaviour {
    return new PlayerRenderer();
  }

  private legWalkingSprite = new AnimatedSprite(8);

  constructor() {
    super(1);
  }

  async start() {
    await this.legWalkingSprite.loadFromPublicSequence(
      "/assets/game/journey-of-pk/player/legs/walk/walk_",
      2,
    );
  }
  update(dt: number): void {
    this.legWalkingSprite.update(dt);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.gameObject.transform.position;
    this.legWalkingSprite.draw(
      ctx,
      x,
      y,
      this.gameObject.transform.scale.x,
      this.gameObject.transform.scale.y,
    );
  }
}
