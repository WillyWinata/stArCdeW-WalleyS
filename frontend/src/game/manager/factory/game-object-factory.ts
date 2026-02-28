import { Engine } from "../engine";
import { GameObject } from "../model/game-object";
import type { Prefab } from "../model/prefab";
import type { Positon } from "../model/transform/position";
import type { Rotation } from "../model/transform/rotation";
import type { Scale } from "../model/transform/scale";
import { Transform } from "../model/transform/transform";

export class GameObjectFactory {
  static Instantiate(
    prefab: Prefab,
    position: Positon,
    name?: string,
    rotation?: Rotation,
    scale?: Scale,
  ): GameObject {
    const finalName = name ?? prefab.name;
    const finalScale = scale ?? prefab.scale;
    const finalRotation = rotation ?? prefab.rotation;

    const transform = new Transform(position, finalScale, finalRotation);
    const gameObject = new GameObject(finalName, transform);
    gameObject.addScripts(prefab);
    return gameObject;
  }
}
