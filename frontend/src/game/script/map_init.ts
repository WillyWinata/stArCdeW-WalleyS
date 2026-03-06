import { MonoBehavior } from "../manager/model/mono-behavior";
import type { AnimatedSprite } from "../manager/model/animated-sprite";
import { MapParser } from "../util/map-parser";
import { Engine } from "../manager/engine";
import { PlayerPrefab } from "../prefab/player-prefab";
import { Position } from "../manager/model/transform/position";
import { PrefabFactory } from "../manager/factory/PrefabFactory";

export class MapInit extends MonoBehavior {
  clone(): MonoBehavior {
    return new MapInit();
  }

  private map: AnimatedSprite[][] = [];
  private loaded = false;

  public mapPath = "/assets/game/journey-of-pk/map/level_0.txt";
  private readonly tilePath =
    "/assets/game/journey-of-pk/tileset/tileset_0.png";
  private readonly tileSize = 16;
  private readonly tilePx = 16;
  private readonly scale = 3;

  private originX!: number;
  private originY!: number;

  constructor() {
    super(1);
  }

  async start() {
    const engine = Engine.getInstance();
    const ctx = engine.getContext();
    const width = engine.getContext().canvas.width;
    const height = engine.getContext().canvas.height;
    this.map = await MapParser.parseFileToMap(
      this.mapPath,
      this.tilePath,
      this.tileSize,
    );

    const mapRows = this.map.length;
    const mapCols = this.map[0].length;
    this.originX =
      width / 2 -
      (mapRows / 2) * this.tileSize * this.gameObject.transform.scale.x;

    this.originY =
      height / 2 -
      (mapCols / 2) * this.tileSize * this.gameObject.transform.scale.y;

    this.gameObject.transform.position.x = this.originX;
    this.gameObject.transform.position.y = this.originY;

    engine.spawn(PrefabFactory.getPrefab(PlayerPrefab), new Position(width / 2, height / 2));
    this.loaded = true;
    this.gameObject.isLoaded = true;
  }

  update(dt: number): void {}

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.loaded) return;

    const step = this.tilePx * this.scale;

    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const px = this.originX + x * step;
        const py = this.originY + y * step;
        this.map[y][x].draw(ctx, px, py, this.scale, this.scale);
      }
    }
  }
}
