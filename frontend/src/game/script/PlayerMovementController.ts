import { GameConfiguration } from "../constants";
import { InputSystem } from "../manager/InputSystem";
import { PlayerStateManager } from "../models/player/state/PlayerStateManager";
import { MonoBehavior } from "../manager/model/mono-behavior";
import type { GameObject } from "../manager/model/game-object";
export class PlayerMovementController extends MonoBehavior {
  private inputSystem!: InputSystem;
  private movementConfig = GameConfiguration.GAME.CONTROLS.MOVEMENT;
  private speed: number = 220;

  private playerStateManager!: PlayerStateManager;

  constructor() {
    super(0);
  }

  handleCollision(gameObject: GameObject) {}
  start() {
    this.inputSystem = InputSystem.getInstance();
    this.playerStateManager = PlayerStateManager.getInstance();
    this.playerStateManager.setGameObject(this.gameObject);

    this.gameObject.getColliders().forEach((col) => {
      col.onCollisionEnter = (other) => {
        console.log("Collided with ", other.gameObject?.name);
        // this.gameObject.transform.position.x -= this.speed * 0.016;
        // this.gameObject.transform.position.y -= this.speed * 0.016;
      };
    });
  }

  clone(): MonoBehavior {
    return new PlayerMovementController();
  }

  update(dt: number): void {
    console.log(
      `speedx: ${this.gameObject.physic.speed.x}, speedy: ${this.gameObject.physic.speed.y}`,
    );
    const stateManager = this.playerStateManager;
    const walkUp = this.inputSystem.getKey(this.movementConfig.UP);
    const walkDown = this.inputSystem.getKey(this.movementConfig.DOWN);
    const walkLeft = this.inputSystem.getKey(this.movementConfig.LEFT);
    const walkRight = this.inputSystem.getKey(this.movementConfig.RIGHT);

    const pressedUp = this.inputSystem.getKeyDown(this.movementConfig.UP);
    const pressedDown = this.inputSystem.getKeyDown(this.movementConfig.DOWN);
    const pressedLeft = this.inputSystem.getKeyDown(this.movementConfig.LEFT);
    const pressedRight = this.inputSystem.getKeyDown(this.movementConfig.RIGHT);

    if (!(walkUp || walkDown || walkLeft || walkRight)) {
      stateManager.switchState(stateManager.getIdleState());
    }

    if (pressedUp || pressedDown || pressedLeft || pressedRight) {
      stateManager.switchState(stateManager.getWalkingState());
    }
    if (walkUp) {
      this.gameObject.transform.position.y -= this.speed * dt;
    }

    if (walkDown) {
      this.gameObject.transform.position.y += this.speed * dt;
    }

    if (walkRight) {
      this.gameObject.transform.position.x += this.speed * dt;
    }

    if (walkLeft) {
      this.gameObject.transform.position.x -= this.speed * dt;
    }
  }
}
