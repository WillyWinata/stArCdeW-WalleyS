import { MainScene } from "../scene/main-scene";
import { SceneFactory } from "./factory/SceneFactory";
import { Scene } from "./model/scene";

export class SceneManager{
    private activeScene: Scene;

    constructor() {
        this.activeScene = SceneFactory.getScene(MainScene);
    }

    getActiveScene(): Scene {
        return this.activeScene;
    }

    changeScene(newScene: Scene) {
        this.activeScene = newScene;
    }
}