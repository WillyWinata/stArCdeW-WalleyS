import { Prefab } from "../manager/model/prefab";
import { Rotation } from "../manager/model/transform/rotation";
import { Scale } from "../manager/model/transform/scale";
import { PlayerController } from "../script/player-controller";
import { PlayerRenderer } from "../script/player-renderer";

export class PlayerPrefab {
  static getPrefab(): Prefab {
    const prefab = new Prefab("Player", new Rotation(0), new Scale(3, 3));
    prefab.addScript(PlayerController);
    prefab.addScript(PlayerRenderer);
    return prefab;
  }
}
