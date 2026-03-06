import { Engine } from "../manager/engine";
import { InputSystem } from "../manager/input-system";
import { MonoBehavior } from "../manager/model/mono-behavior";
import { Position } from "../manager/model/transform/position";
import { Rotation } from "../manager/model/transform/rotation";
import { Scale } from "../manager/model/transform/scale";
import { PlayerPrefab } from "../prefab/player-prefab";
import { PrefabFactory } from "../manager/factory/PrefabFactory";

export class Spawner extends MonoBehavior {
  constructor() {
    super(2);
  }

  clone(): MonoBehavior {
    return new Spawner();
  }

  start() {
    Engine.getInstance().getContext().fillStyle = "red";
  }

  update(dt: number): void {
    if (InputSystem.getInstance().getKeyDown("e")) {
      console.log("Spawn!");
      const width = Engine.getInstance().getContext().canvas.width;
      Engine.getInstance().spawn(PrefabFactory.getPrefab(PlayerPrefab), new Position(0, 0));
    }
  }
}
