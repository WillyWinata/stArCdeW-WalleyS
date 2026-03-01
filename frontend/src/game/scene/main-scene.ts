import { GameObjectFactory } from "../manager/factory/game-object-factory";
import { Scene } from "../manager/model/scene";
import { Positon } from "../manager/model/transform/position";
import { Scale } from "../manager/model/transform/scale";
import { PlayerPrefab } from "../prefab/player-prefab";

export class MainScene {
  static getScene(): Scene {
    const scene = new Scene("MainScene");
    const player = GameObjectFactory.Instantiate(
      PlayerPrefab.getPrefab(),
      new Positon(0, 100),
      {
        name: "Player 1",
        scale: new Scale(5, 5),
      },
    );

    scene.addGameObject(player);
    return scene;
  }
}
