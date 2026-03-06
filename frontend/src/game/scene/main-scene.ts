import { GameObjectFactory } from "../manager/factory/game-object-factory";
import { Scene } from "../manager/model/scene";
import { Position } from "../manager/model/transform/position";
import { Rotation } from "../manager/model/transform/rotation";
import { Scale } from "../manager/model/transform/scale";
import { MapPrefab } from "../prefab/map-prefab";
import { PrefabFactory } from "../manager/factory/PrefabFactory";
import { MapInit } from "../script/map_init";

export class MainScene extends Scene {

  constructor(name: string) {
    super(name);
    this.initializeScene();
  }

  initializeScene(): void {
    const map = GameObjectFactory.Instantiate(
      PrefabFactory.getPrefab(MapPrefab),
      new Position(0, 0),
    ); 

    const mi = map.getScript(MapInit);
    mi!.mapPath = "/assets/game/journey-of-pk/map/level_0.txt";
    this.addGameObjects(map);
  }
}
