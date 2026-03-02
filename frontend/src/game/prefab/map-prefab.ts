import { Prefab } from "../manager/model/prefab";
import { Rotation } from "../manager/model/transform/rotation";
import { Scale } from "../manager/model/transform/scale";
import { MapInit } from "../script/map_init";

export class MapPrefab {
  static getPrefab(): Prefab {
    const prefab = new Prefab("Map", new Rotation(0), new Scale(3, 3));
    prefab.addScript(MapInit);
    return prefab;
  }
}
