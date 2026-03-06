import { AnimatedSprite } from "../manager/model/AnimatedSprite";

type TileCoord = { x: number; y: number };

export class MapParser {
  static async parseFileToMap(
    mapPath: string,
    tilesetPath: string,
    tilesetSize: number,
  ): Promise<AnimatedSprite[][]> {
    const res = await fetch(mapPath);
    if (!res.ok) {
      throw new Error(`Failed to load map file: ${mapPath} (${res.status})`);
    }

    const text = await res.text();

    const rows = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const map: AnimatedSprite[][] = [];

    for (let y = 0; y < rows.length; y++) {
      const parts = rows[y]
        .split("#")
        .map((p) => p.trim())
        .filter(Boolean);

      const spriteRow: AnimatedSprite[] = [];

      for (let x = 0; x < parts.length; x++) {
        const coord = MapParser.parseCoord(parts[x], { row: y, col: x });

        const spr = new AnimatedSprite(1, true);
        await spr.loadFromTileset(tilesetPath, tilesetSize, coord);

        spriteRow.push(spr);
      }

      map.push(spriteRow);
    }

    return map;
  }

  private static parseCoord(
    token: string,
    pos: { row: number; col: number },
  ): TileCoord {
    const m = token.match(/^\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/);
    if (!m) {
      throw new Error(
        `Invalid tile token at row=${pos.row} col=${pos.col}: "${token}" (expected "(x,y)")`,
      );
    }
    return { x: Number(m[1]), y: Number(m[2]) };
  }
}
