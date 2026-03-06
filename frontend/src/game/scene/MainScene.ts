import { GameObjectFactory } from "../manager/factory/GameObjectFactory";
import { Scene } from "../manager/model/Scene";
import { Position } from "../manager/model/transform/Position";
import { Rotation } from "../manager/model/transform/Rotation";
import { Scale } from "../manager/model/transform/Scale";
import { MapPrefab } from "../prefab/MapPrefab";
import { PrefabFactory } from "../manager/factory/PrefabFactory";
import { MapInit } from "../script/MapInit";

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
