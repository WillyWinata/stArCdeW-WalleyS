import { MonoBehavior } from "./mono-behavior";
import type { Prefab } from "./prefab";
import type { Transform } from "./transform/transform";

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
}
