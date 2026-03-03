import type { Collider } from "../../physics/collider/Collider";
import { MonoBehavior } from "./mono-behavior";
import { Prefab } from "./prefab";
import type { Transform } from "./transform/transform";

type Ctor<T> = new (...args: any[]) => T;

interface GameObjectContext {
  name: string;
  transform: Transform;
}

export class GameObject {
  id: string;
  name: string;
  transform: Transform;
  isLoaded: boolean;

  private colliders: Collider[] = [];

  private scripts: MonoBehavior[] = [];

  constructor(context: GameObjectContext) {
    this.id = crypto.randomUUID();
    this.name = context.name;
    this.transform = context.transform;
    this.isLoaded = false;
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
}
