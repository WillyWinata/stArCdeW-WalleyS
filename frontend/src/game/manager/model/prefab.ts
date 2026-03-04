import type { Collider } from "../../physics/collider/Collider";
import type { BoundingBox } from "../../types";
import type { MonoBehavior } from "./mono-behavior";
import type { Rotation } from "./transform/rotation";
import type { Scale } from "./transform/scale";

export abstract class Prefab {
  id: string;
  name: string;

  rotation: Rotation;
  scale: Scale;

  private scriptTypes: Array<new () => MonoBehavior> = [];
  private colliders: Collider[] = [];

  constructor(name: string, rotation: Rotation, scale: Scale) {
    this.rotation = rotation;
    this.scale = scale;
    this.id = crypto.randomUUID();
    this.name = name;

    this.initializePrefab();

    console.log(`Prefab ${this.name} initialized with ${this.colliders.length} colliders.`);
  }

  abstract initializeColliders() : void;
  abstract initializeScripts() : void;

  protected initializePrefab(): void {
    this.initializeColliders();
    this.initializeScripts();
  }

  addScript(type: new () => MonoBehavior) {
    this.scriptTypes.push(type);
  }

  removeScript(type: new () => MonoBehavior) {
    const i = this.scriptTypes.indexOf(type);
    if (i !== -1) this.scriptTypes.splice(i, 1);
  }

  getScripts(): Array<new () => MonoBehavior> {
    return this.scriptTypes;
  }

  addCollider(collider: Collider) {
    this.colliders.push(collider);
  }

  getColliders() {
    return this.colliders;
  }

}
