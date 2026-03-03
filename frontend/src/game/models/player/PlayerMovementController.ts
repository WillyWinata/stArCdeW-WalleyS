import { GameConfiguration } from "../../constants";
import { InputSystem } from "../../manager/InputSystem";
import { MonoBehavior } from "../../manager/model/mono-behavior";
import { Player } from "./Player";

export class PlayerMovementController extends MonoBehavior {
  private inputSystem: InputSystem;
  private movementConfig;
  private speed: number = 220;

  // TODO: Remove the new Player()
  private player: Player = new Player();

  constructor() {
    super(0);
    this.inputSystem = InputSystem.getInstance();
    this.movementConfig = GameConfiguration.GAME.CONTROLS.MOVEMENT;
  }

  public registerPlayer(player: Player) {
    this.player = player;
  }

  clone(): MonoBehavior {
    return new PlayerMovementController();
  }

  update(dt: number): void {
    const stateManager = this.player.getStateManager();

    const walkUp = this.inputSystem.getKey(this.movementConfig.UP);
    const walkDown = this.inputSystem.getKey(this.movementConfig.DOWN);
    const walkLeft = this.inputSystem.getKey(this.movementConfig.LEFT);
    const walkRight = this.inputSystem.getKey(this.movementConfig.RIGHT);

    if (walkUp || walkDown || walkLeft || walkRight) {
      stateManager.switchState(stateManager.getWalkingState());
    } else {
      stateManager.switchState(stateManager.getIdleState());
    }

    if (walkUp) {
      this.gameObject.transform.position.y -= this.speed * dt;
    }

    if (walkDown) {
      this.gameObject.transform.position.y += this.speed * dt;
    }

    if (walkLeft) {
      this.gameObject.transform.position.x += this.speed * dt;
    }

    if (walkRight) {
      this.gameObject.transform.position.x -= this.speed * dt;
    }
  }
}
