import { GameConfiguration } from "../constants";
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
    if (
      InputSystem.getInstance().getKey(
        GameConfiguration.GAME.CONTROLS.MOVEMENT.UP,
      )
    ) {
      this.gameObject.transform.position.y -= this.speed * dt;
    }
    if (
      InputSystem.getInstance().getKey(
        GameConfiguration.GAME.CONTROLS.MOVEMENT.DOWN,
      )
    ) {
      this.gameObject.transform.position.y += this.speed * dt;
    }
    if (
      InputSystem.getInstance().getKey(
        GameConfiguration.GAME.CONTROLS.MOVEMENT.RIGHT,
      )
    ) {
      this.gameObject.transform.position.x += this.speed * dt;
    }
    if (
      InputSystem.getInstance().getKey(
        GameConfiguration.GAME.CONTROLS.MOVEMENT.LEFT,
      )
    ) {
      this.gameObject.transform.position.x -= this.speed * dt;
    }
  }
}
