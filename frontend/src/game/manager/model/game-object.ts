import { MonoBehavior } from "./mono-behavior";
import type { Prefab } from "./prefab";
import type { Transform } from "./transform/transform";

type Ctor<T> = new (...args: any[]) => T;

export class GameObject {
  id: string;
  name: string;
  transform: Transform;

  private scripts: MonoBehavior[] = [];

  constructor(name: string, transform: Transform) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.transform = transform;
  }

  addScripts(prefab: Prefab) {
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
}
