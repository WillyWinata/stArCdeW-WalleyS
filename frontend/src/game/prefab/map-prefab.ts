import { Prefab } from "../manager/model/prefab";
import { Position } from "../manager/model/transform/position";
import { Rotation } from "../manager/model/transform/rotation";
import { Scale } from "../manager/model/transform/scale";
import { MapCollider } from "../physics/collider/MapCollider";
import { MapInit } from "../script/map_init";

type Dimension = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};
export class MapPrefab extends Prefab {

  constructor(name: string, rotation: Rotation, scale: Scale) {
    super(name, rotation, scale);
  }

  initializeColliders(): void {
    this.addCollider(
      new MapCollider(
        new Position(0, 0),
        16,
        this.addColliderBlob(
          { minX: 0, maxX: 6, minY: 0, maxY: 0 },
          { minX: 10, maxX: 15, minY: 0, maxY: 0 },
          { minX: 0, maxX: 0, minY: 1, maxY: 6 },
          { minX: 0, maxX: 0, minY: 10, maxY: 15 },
          { minX: 15, maxX: 15, minY: 1, maxY: 6 },
          { minX: 15, maxX: 15, minY: 10, maxY: 15 },
          { minX: 1, maxX: 6, minY: 15, maxY: 15 },
          { minX: 10, maxX: 14, minY: 15, maxY: 15 },
        ),
        {
          debugColor: "blue",
        },
      ),
    );
  }

  initializeScripts(): void {
    this.addScript(MapInit);
  }

  private addColliderBlob(...dimensions: Dimension[]): Position[] {
    let positions: Position[] = [];
    dimensions.forEach((dimension) => {
      for (let i = dimension.minX; i <= dimension.maxX; i++) {
        for (let j = dimension.minY; j <= dimension.maxY; j++) {
          positions.push(new Position(i, j));
        }
      }
    });
    return positions;
  }

}
