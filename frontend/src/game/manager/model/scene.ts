import type { GameObject } from "./game-object";

export class Scene {
  id: string = crypto.randomUUID();
  name: string;

  private gameObjects: GameObject[] = [];
  constructor(name: string) {
    this.name = name;
  }

  addGameObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }

  removeGameObject(gameObject: GameObject) {
    const idx = this.gameObjects.indexOf(gameObject);
    if (idx !== -1) {
      this.gameObjects.splice(idx, 1);
    }
  }

  getGameObjects(): GameObject[] {
    return this.gameObjects;
  }
}
