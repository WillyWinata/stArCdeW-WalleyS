import type { Position } from "./transform/position";

export class AnimatedSprite {
  private frames: HTMLImageElement[] = [];

  private currentFrame = 0;
  private time = 0;

  private fps: number;
  private loop: boolean;

  private ready = false;

  constructor(fps: number = 10, loop: boolean = true) {
    this.fps = fps;
    this.loop = loop;
  }

  private loadOne(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load: ${src}`));
      img.src = src;
    });
  }

  async loadFromPublicSequence(
    basePath: string,
    frameCount: number,
    opts?: { pad?: number; ext?: string; startIndex?: number },
  ) {
    const pad = opts?.pad ?? 0;
    const ext = opts?.ext ?? "png";
    const startIndex = opts?.startIndex ?? 0;

    const paths: string[] = [];
    for (let i = 0; i < frameCount; i++) {
      const n = startIndex + i;
      const num = pad > 0 ? String(n).padStart(pad, "0") : String(n);
      paths.push(`${basePath}${num}.${ext}`);
    }

    this.frames = await Promise.all(paths.map((src) => this.loadOne(src)));
    this.currentFrame = 0;
    this.time = 0;
    this.ready = true;
  }
  async loadFromTileset(
    tilesetPath: string,
    tileSize: number,
    ...coords: Position[]
  ) {
    const tileset = await this.loadOne(tilesetPath);

    if (coords.length === 0) {
      this.frames = [];
      this.ready = true;
      this.currentFrame = 0;
      this.time = 0;
      return;
    }

    const frames: HTMLImageElement[] = [];

    for (const { x, y } of coords) {
      const sx = x * tileSize;
      const sy = y * tileSize;

      if (
        sx < 0 ||
        sy < 0 ||
        sx + tileSize > tileset.width ||
        sy + tileSize > tileset.height
      ) {
        throw new Error(
          `Tile out of bounds: (${x},${y}) for tileset ${tilesetPath} (${tileset.width}x${tileset.height}), tileSize=${tileSize}`,
        );
      }

      const c = document.createElement("canvas");
      c.width = tileSize;
      c.height = tileSize;

      const cctx = c.getContext("2d");
      if (!cctx) throw new Error("Failed to get canvas 2D context");

      cctx.drawImage(
        tileset,
        sx,
        sy,
        tileSize,
        tileSize,
        0,
        0,
        tileSize,
        tileSize,
      );

      const img = new Image();
      img.src = c.toDataURL("image/png");
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("Failed to create tile frame image"));
      });

      frames.push(img);
    }

    this.frames = frames;
    this.currentFrame = 0;
    this.time = 0;
    this.ready = true;
  }

  update(dt: number) {
    if (!this.ready || this.frames.length === 0) return;

    this.time += dt;
    const frameTime = 1 / this.fps;

    while (this.time >= frameTime) {
      this.time -= frameTime;

      if (this.loop) {
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
      } else {
        this.currentFrame = Math.min(
          this.currentFrame + 1,
          this.frames.length - 1,
        );
      }
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scaleX: number = 1,
    scaleY: number = 1,
  ) {
    if (!this.ready || this.frames.length === 0) return;

    const img = this.frames[this.currentFrame];
    ctx.drawImage(img, x, y, img.width * scaleX, img.height * scaleY);
  }

  reset() {
    this.currentFrame = 0;
    this.time = 0;
  }

  isReady() {
    return this.ready;
  }
}
