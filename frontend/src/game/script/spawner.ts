import { Engine } from "../manager/engine";
import { InputSystem } from "../manager/InputSystem";
import { MonoBehavior } from "../manager/model/mono-behavior";
import { Position } from "../manager/model/transform/position";
import { PlayerPrefab } from "../prefab/player-prefab";

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
      Engine.getInstance().spawn(PlayerPrefab.getPrefab(), new Position(0, 0));
    }
  }
}
