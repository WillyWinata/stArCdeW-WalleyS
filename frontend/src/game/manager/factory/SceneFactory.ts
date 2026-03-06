import type { Scene } from "../model/Scene";
import { Rotation } from "../model/transform/Rotation";
import { Scale } from "../model/transform/Scale";

export class SceneFactory {

  static getScene <T extends Scene> (SceneClass: new (name: string) => T,
    name?: string,
    ): T {

    const defaultName = name ?? SceneClass.name;

    return new SceneClass(defaultName);
  }

}