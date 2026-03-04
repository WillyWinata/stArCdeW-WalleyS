import { GameConfiguration } from "../constants";
import { Prefab } from "../manager/model/prefab";
import { Position } from "../manager/model/transform/position";
import { Rotation } from "../manager/model/transform/rotation";
import { Scale } from "../manager/model/transform/scale";
import { BoxCollider } from "../physics/collider/BoxCollider";
import { PlayerMovementController } from "../script/PlayerMovementController";
import { PlayerRenderer } from "../script/PlayerRenderer";

export class PlayerPrefab extends Prefab {

  constructor(name: string, rotation: Rotation, scale: Scale) {
    super(name, rotation, scale);
  }

  initializeColliders(): void {
    const playerCollider = GameConfiguration.GAME.COLLIDER.PLAYER;

    const playerCollisionBoxOffset = new Position(
      playerCollider.COLLISION_BOX.OFFSET.X,
      playerCollider.COLLISION_BOX.OFFSET.Y,
    );

    this.setCollisionBoundsOffset(playerCollisionBoxOffset);

    this.addCollider(
      new BoxCollider(
        playerCollider.HURT_BOX.SIZE.WIDTH,
        playerCollider.HURT_BOX.SIZE.HEIGHT,
        new Position(
          playerCollider.HURT_BOX.OFFSET.X,
          playerCollider.HURT_BOX.OFFSET.Y,
        ),
        { debugColor: "red", isTrigger: true },
      ),
    );

    this.addCollider(
      new BoxCollider(
        playerCollider.COLLISION_BOX.SIZE.WIDTH,
        playerCollider.COLLISION_BOX.SIZE.HEIGHT,
        playerCollisionBoxOffset,
        { debugColor: "purple", isTrigger: true },
      ),
    );
  }

  initializeScripts(): void {
    this.addScript(PlayerMovementController);
    this.addScript(PlayerRenderer);
  }

}
