import { GameObjectFactory } from "../manager/factory/game-object-factory";
import { Scene } from "../manager/model/scene";
import { Positon } from "../manager/model/transform/position";
import { PlayerPrefab } from "../prefab/player-prefab";

export class MainScene {
  static getScene(): Scene {
    const scene = new Scene("MainScene");
    const player = GameObjectFactory.Instantiate(
      PlayerPrefab.getPrefab(),
      new Positon(0, 100),
      "Player",
    );

    const player2 = GameObjectFactory.Instantiate(
      PlayerPrefab.getPrefab(),
      new Positon(0, 300),
      "Player2",
    );
    scene.addGameObject(player);
    scene.addGameObject(player2);
    return scene;
  }
}
