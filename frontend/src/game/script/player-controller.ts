import { InputSystem } from "../manager/input-system";
import { MonoBehaviour } from "../manager/model/mono-behaviour";

export class PlayerController extends MonoBehaviour {
  clone(): MonoBehaviour {
    return new PlayerController();
  }
  private speed: number = 300;

  constructor() {
    super(0);
  }
  update(dt: number): void {
    if (InputSystem.getInstance().getKey("w")) {
      this.gameObject.transform.position.y -= this.speed * dt;
    }
    if (InputSystem.getInstance().getKey("s")) {
      this.gameObject.transform.position.y += this.speed * dt;
    }
    if (InputSystem.getInstance().getKey("d")) {
      this.gameObject.transform.position.x += this.speed * dt;
    }
    if (InputSystem.getInstance().getKey("a")) {
      this.gameObject.transform.position.x -= this.speed * dt;
    }
  }
  draw(ctx: CanvasRenderingContext2D): void {
    const posX = this.gameObject.transform.position.x;
    const posY = this.gameObject.transform.position.y;

    ctx.fillRect(posX, posY, 100, 100);
  }
}
