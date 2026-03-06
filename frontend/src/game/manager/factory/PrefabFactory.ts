import type { Prefab } from "../model/Prefab";
import { Rotation } from "../model/transform/Rotation";
import { Scale } from "../model/transform/Scale";

export class PrefabFactory {

  static getPrefab <T extends Prefab> (PrefabClass: new (name: string, rotation: Rotation, scale: Scale) => T,
    name?: string,
    rotation?: Rotation,
    scale?: Scale
    ): T {

    const defaultName = name ?? PrefabClass.name;
    const defaultRotation = rotation ?? new Rotation(0);
    const defaultScale = scale ?? new Scale(3, 3);

    return new PrefabClass(defaultName, defaultRotation, defaultScale);
  }

}