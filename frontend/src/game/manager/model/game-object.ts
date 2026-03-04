import type { Collider } from "../../physics/collider/Collider";
import type { BoundingBox } from "../../types";
import { MonoBehavior } from "./mono-behavior";
import { Prefab } from "./prefab";
import type { Transform } from "./transform/transform";

type Ctor<T> = new (...args: any[]) => T;

interface GameObjectContext {
  name: string;
  transform: Transform;
  prefab: Prefab;
  colliders: Collider[];
}

export class GameObject {
  id: string;
  name: string;
  transform: Transform;
  isLoaded: boolean;

  private colliderBounds : BoundingBox;

  private colliders: Collider[] = [];

  private scripts: MonoBehavior[] = [];

  constructor(context: GameObjectContext) {
    this.id = crypto.randomUUID();
    this.name = context.name;
    this.transform = context.transform;
    this.isLoaded = false;

    const { prefab, colliders } = context;
    this.initializeGameObject(prefab, colliders);
    
    this.colliderBounds = this.calculateColliderBounds();
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

  calculateColliderBounds(): BoundingBox {
    if (this.colliders.length === 0) return { x: 0, y: 0, w: 0, h: 0 };

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const collider of this.colliders) {
        const box =  collider.getWorldBox();

        const boxList = Array.isArray(box) ? box : [box];
        
        for(const b of boxList){
          if (b.x < minX) minX = b.x;
          if (b.y < minY) minY = b.y;
          if (b.x + b.w > maxX) maxX = b.x + b.w;
          if (b.y + b.h > maxY) maxY = b.y + b.h;
        }
    }

    return {
        x: minX,
        y: minY,
        w: maxX - minX,
        h: maxY - minY
    };
  }

}
