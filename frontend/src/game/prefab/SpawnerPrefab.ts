import { Prefab } from "../manager/model/Prefab";
import type { Position } from "../manager/model/transform/Position";
import { Rotation } from "../manager/model/transform/Rotation";
import { Scale } from "../manager/model/transform/Scale";
import { Spawner } from "../script/Spawner";
import { PrefabFactory } from "../manager/factory/PrefabFactory";

export class SpawnerPrefab extends Prefab {
  
  constructor(name: string, rotation: Rotation, scale: Scale) {
    super(name, rotation, scale);
  }

  initializeColliders(): void {
    // No colliders
  }
  initializeScripts(): void {
    this.addScript(Spawner);
  }

}
