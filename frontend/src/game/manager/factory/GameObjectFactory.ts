import { Collider } from "../../physics/collider/Collider";
import { GameObject } from "../model/GamaObject";
import type { Prefab } from "../model/Prefab";
import type { Position } from "../model/transform/Position";
import type { Rotation } from "../model/transform/Rotation";
import type { Scale } from "../model/transform/Scale";
import { Transform } from "../model/transform/Transform";

export class GameObjectFactory {
  static Instantiate(
    prefab: Prefab,
    position: Position,
    options?: {
      name?: string;
      rotation?: Rotation;
      scale?: Scale;
      colliders?: Collider[];
      collisionBoundsOffset?: Position;
    },
  ): GameObject {
    const finalName = options?.name ?? prefab.name;
    const finalScale = options?.scale ?? prefab.scale;
    const finalRotation = options?.rotation ?? prefab.rotation;
    const finalColliders = options?.colliders ?? prefab.getColliders();
    const finalCollisionBoundsOffset = options?.collisionBoundsOffset ?? prefab.collisionBoundsOffset;

    console.log(`Number of colliders in ${prefab.name} prefab: ${finalColliders.length}`);

    const transform = new Transform(position, finalScale, finalRotation);
    const gameObject = new GameObject({
      name: finalName,
      transform: transform,
      prefab : prefab,
      colliders: finalColliders,
      collisionBoundsOffset: finalCollisionBoundsOffset,
    });

    return gameObject;
  }
}
