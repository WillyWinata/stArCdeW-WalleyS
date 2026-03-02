import { InputSystem } from "../manager/input-system";
import { MonoBehavior } from "../manager/model/mono-behavior";

export class PlayerController extends MonoBehavior {
  clone(): MonoBehavior {
    return new PlayerController();
  }
  private speed: number = 220;

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
}
