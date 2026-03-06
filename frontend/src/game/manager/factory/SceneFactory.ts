import type { Scene } from "../model/scene";
import { Rotation } from "../model/transform/rotation";
import { Scale } from "../model/transform/scale";

export class SceneFactory {

  static getScene <T extends Scene> (SceneClass: new (name: string) => T,
    name?: string,
    ): T {

    const defaultName = name ?? SceneClass.name;

    return new SceneClass(defaultName);
  }

}