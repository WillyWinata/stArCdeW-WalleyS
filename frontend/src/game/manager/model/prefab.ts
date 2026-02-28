import type { MonoBehaviour } from "./mono-behaviour";
import type { Rotation } from "./transform/rotation";
import type { Scale } from "./transform/scale";

export class Prefab {
  id: string;
  name: string;

  rotation: Rotation;
  scale: Scale;

  private scriptTypes: Array<new () => MonoBehaviour> = [];

  constructor(name: string, rotation: Rotation, scale: Scale) {
    this.rotation = rotation;
    this.scale = scale;
    this.id = crypto.randomUUID();
    this.name = name;
  }

  addScript(type: new () => MonoBehaviour) {
    this.scriptTypes.push(type);
  }

  removeScript(type: new () => MonoBehaviour) {
    const i = this.scriptTypes.indexOf(type);
    if (i !== -1) this.scriptTypes.splice(i, 1);
  }

  getScripts(): Array<new () => MonoBehaviour> {
    return this.scriptTypes;
  }
}
