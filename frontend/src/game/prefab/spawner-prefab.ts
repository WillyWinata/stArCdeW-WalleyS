import { Prefab } from "../manager/model/prefab";
import { Rotation } from "../manager/model/transform/rotation";
import { Scale } from "../manager/model/transform/scale";
import { Spawner } from "../script/spawner";
import { PrefabFactory } from "./PrefabFactory";

export class SpawnerPrefab extends Prefab {

  constructor(name: string, rotation: Rotation, scale: Scale) {
    super(name, rotation, scale);
    this.initializePrefab();
  }

  initializePrefab(): void {
    this.addScript(Spawner);
  }

}
