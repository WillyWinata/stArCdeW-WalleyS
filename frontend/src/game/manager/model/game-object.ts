import type { Collider } from "../../physics/collider/Collider";
import type { BoundingBox } from "../../types";
import { MonoBehavior } from "./mono-behavior";
import { Physic } from "./physic/Physic";
import { Speed } from "./physic/Speed";
import { Prefab } from "./prefab";
import type { Position } from "./transform/position";
import type { Transform } from "./transform/transform";

type Ctor<T> = new (...args: any[]) => T;

interface GameObjectContext {
  name: string;
  transform: Transform;
  prefab: Prefab;
  colliders: Collider[];
  collisionBoundsOffset: Position;
}

export class GameObject {
  id: string;
  name: string;
  transform: Transform;
  physic: Physic;
  isLoaded: boolean;

  private pastTransform: Transform;
  private colliderBoundsSize: { w: number; h: number };
  private collisionBoundsOffset: Position;

  private colliders: Collider[] = [];

  private scripts: MonoBehavior[] = [];

  constructor(context: GameObjectContext) {
    this.id = crypto.randomUUID();
    this.name = context.name;
    this.transform = context.transform;
    this.pastTransform = {
      position: {
        x: context.transform.position.x,
        y: context.transform.position.y,
      },
      scale: {
        x: context.transform.scale.x,
        y: context.transform.scale.y,
      },
      rotation: context.transform.rotation,
    };
    this.physic = new Physic(new Speed(0, 0));

    this.isLoaded = false;
    this.collisionBoundsOffset = context.collisionBoundsOffset;

    const { prefab, colliders } = context;
    this.initializeGameObject(prefab, colliders);

    this.colliderBoundsSize = this.calculateColliderBoundsSize();
  }

  initializeGameObject(prefab: Prefab, colliders: Collider[]) {
    this.addScriptsFromPrefab(prefab);
    this.addColliders(colliders);

    this.getColliders().forEach((collider) => {
      collider.attach(this);
    });
  }

  addScriptsFromPrefab(prefab: Prefab) {
    prefab.getScripts().forEach((Type) => {
      const script = new Type();
      script.gameObject = this;
      this.scripts.push(script);
    });
  }

  getScripts(): MonoBehavior[] {
    return this.scripts;
  }

  getScript<T extends MonoBehavior>(Type: Ctor<T>): T | null {
    return (
      (this.scripts.find((s) => s instanceof Type) as T | undefined) ?? null
    );
  }

  addColliders(collders: Collider[]): void {
    this.colliders = collders;
  }

  drawAllColliders(ctx: CanvasRenderingContext2D) {
    this.colliders.forEach((collider) => {
      collider.drawDebugLines(ctx);
    });
  }

  getColliders(): Collider[] {
    return this.colliders;
  }

  getColliderBounds(): BoundingBox {
    return {
      x:
        this.transform.position.x +
        this.collisionBoundsOffset.x * this.transform.scale.x,
      y:
        this.transform.position.y +
        this.collisionBoundsOffset.y * this.transform.scale.y,
      w: this.colliderBoundsSize.w,
      h: this.colliderBoundsSize.h,
    };
  }

  public calculateSpeed(dt: number) {
    this.physic.speed.x =
      (this.transform.position.x - this.pastTransform.position.x) / dt;
    this.physic.speed.y =
      (this.transform.position.y - this.pastTransform.position.y) / dt;
  }

  private calculateColliderBoundsSize(): { w: number; h: number } {
    if (this.colliders.length === 0) return { w: 0, h: 0 };

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const collider of this.colliders) {
      const box = collider.getWorldBox();
      const boxList = Array.isArray(box) ? box : [box];

      for (const b of boxList) {
        if (b.x < minX) minX = b.x;
        if (b.y < minY) minY = b.y;
        if (b.x + b.w > maxX) maxX = b.x + b.w;
        if (b.y + b.h > maxY) maxY = b.y + b.h;
      }
    }

    return {
      w: maxX - minX,
      h: maxY - minY,
    };
  }
  public updatePastTransformPosition() {
    this.pastTransform.position.x = this.transform.position.x;
    this.pastTransform.position.y = this.transform.position.y;
  }
}
