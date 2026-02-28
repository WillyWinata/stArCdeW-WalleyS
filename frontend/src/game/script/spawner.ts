import { Engine } from "../manager/engine";
import { InputSystem } from "../manager/input-system";
import { MonoBehaviour } from "../manager/model/mono-behaviour";
import { Positon } from "../manager/model/transform/position";
import { PlayerPrefab } from "../prefab/player-prefab";

export class Spawner extends MonoBehaviour {
  constructor() {
    super(1);
  }

  clone(): MonoBehaviour {
    return new Spawner();
  }

  start() {
    Engine.getInstance().getContext().fillStyle = "red";
  }

  update(dt: number): void {
    if (InputSystem.getInstance().getKeyDown("e")) {
      console.log("Spawn!");
      const width = Engine.getInstance().getContext().canvas.width;
      Engine.getInstance().spawn(PlayerPrefab.getPrefab(), new Positon(0, 0));
    }
  }
}
