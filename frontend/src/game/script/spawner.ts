import { Engine } from "../manager/Engine";
import { InputSystem } from "../manager/InputSystem";
import { MonoBehavior } from "../manager/model/MonoBehavior";
import { Position } from "../manager/model/transform/Position";
import { Rotation } from "../manager/model/transform/Rotation";
import { Scale } from "../manager/model/transform/Scale";
import { PlayerPrefab } from "../prefab/PlayerPrefab";
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
