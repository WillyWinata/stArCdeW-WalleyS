import { Prefab } from "../manager/model/prefab";
import { Rotation } from "../manager/model/transform/rotation";
import { Scale } from "../manager/model/transform/scale";
import { Spawner } from "../script/spawner";

export class SpawnerPrefab {
  static getPrefab(): Prefab {
    const prefab = new Prefab("Spawner", new Rotation(0), new Scale(1, 1));
    prefab.addScript(Spawner);
    return prefab;
  }
}
