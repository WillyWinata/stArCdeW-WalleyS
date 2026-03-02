import { GameObjectFactory } from "../manager/factory/game-object-factory";
import { Scene } from "../manager/model/scene";
import { Position } from "../manager/model/transform/position";
import { MapPrefab } from "../prefab/map-prefab";
import { MapInit } from "../script/map_init";

export class MainScene {
  static getScene(): Scene {
    const scene = new Scene("MainScene");

    const map = GameObjectFactory.Instantiate(
      MapPrefab.getPrefab(),
      new Position(0, 0),
    );

    const mi = map.getScript(MapInit);
    mi!.mapPath = "/assets/game/journey-of-pk/map/level_0.txt";
    scene.addGameObjects(map);
    return scene;
  }
}
