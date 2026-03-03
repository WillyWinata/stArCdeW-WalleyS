import { Collider } from "../../physics/collider/Collider";
import { GameObject } from "../model/game-object";
import type { Prefab } from "../model/prefab";
import type { Position } from "../model/transform/position";
import type { Rotation } from "../model/transform/rotation";
import type { Scale } from "../model/transform/scale";
import { Transform } from "../model/transform/transform";

export class GameObjectFactory {
  static Instantiate(
    prefab: Prefab,
    position: Position,
    options?: {
      name?: string;
      rotation?: Rotation;
      scale?: Scale;
      colliders?: Collider[];
    },
  ): GameObject {
    const finalName = options?.name ?? prefab.name;
    const finalScale = options?.scale ?? prefab.scale;
    const finalRotation = options?.rotation ?? prefab.rotation;
    const finalColliders = options?.colliders ?? prefab.getColliders();

    const transform = new Transform(position, finalScale, finalRotation);
    const gameObject = new GameObject({
      name: finalName,
      transform: transform,
    });

    gameObject.addScriptsFromPrefab(prefab);
    gameObject.addColliders(finalColliders);

    gameObject.getColliders().forEach((collider) => {
      collider.attach(gameObject);
    });

    return gameObject;
  }
}
