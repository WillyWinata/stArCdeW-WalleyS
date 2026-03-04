import type { Collider } from "../physics/collider/Collider";
import { PhysicsEngine } from "../physics/PhysicsEngine";
import { MainScene } from "../scene/main-scene";
import { GameObjectFactory } from "./factory/game-object-factory";
import { InputSystem } from "./InputSystem";
import type { GameObject } from "./model/game-object";
import type { MonoBehavior } from "./model/mono-behavior";
import type { Prefab } from "./model/prefab";
import type { Scene } from "./model/scene";
import type { Position } from "./model/transform/position";
import type { Rotation } from "./model/transform/rotation";
import type { Scale } from "./model/transform/scale";

export class Engine {
  private static instance: Engine;
  private physicsEngine: PhysicsEngine;
  private activeScene: Scene;
  private scriptList: MonoBehavior[] = [];
  

  private ctx!: CanvasRenderingContext2D;
  private lastTime = 0;
  private running = false;

  private constructor() {
    this.physicsEngine = new PhysicsEngine();
    this.activeScene = MainScene.getScene();
    this.scriptList = this.activeScene
      .getGameObjects()
      .flatMap((go) => go.getScripts())
      .sort((a, b) => a.order - b.order);
  }

  static getInstance(): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine();
    }
    return Engine.instance;
  }

  getActiveScene(): Scene {
    return this.activeScene;
  }

  private loop = (now: number) => {
    if (!this.running) {
      return;
    }

    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    this.update(dt);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.draw(this.ctx);

    InputSystem.getInstance().endFrame();
    requestAnimationFrame(this.loop);
  };

  start(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.running = true;

    //Run the Start Method before the first Frame of the Scene
    this.scriptList.forEach((script) => {
      script.start?.();
    });

    this.physicsEngine.registerAllCollidersInScene(this.getActiveScene());
    
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop);
  }

  update(dt: number) {
    this.scriptList.forEach((script) => {
      script.update(dt);
    });
    this.physicsEngine.physicsUpdate(dt);
    
    // debug
    const gos : GameObject = this.activeScene
      .getGameObjects().filter((go) => go.name === "Map")[0];
      console.log(`Number of collision: ${gos.getColliders().length}`)
    // console.log(`Number of game object named Map: ${gos.length}`)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.imageSmoothingEnabled = false;
    this.scriptList.forEach((script) => {
      if (script.draw) {
        script.draw(ctx);
      }
    });
    this.physicsEngine.drawAllCollidersDebugLines(ctx);
  }

  registerScripts(scripts: MonoBehavior[]) {
    scripts.forEach((script) => {
      let l = 0;
      let r = this.scriptList.length;

      while (l < r) {
        const m = (l + r) >> 1;
        if (this.scriptList[m].order <= script.order) l = m + 1;
        else r = m;
      }

      this.scriptList.splice(l, 0, script);
    });
  }

  unregisterScript(scripts: MonoBehavior[]) {
    scripts.forEach((script) => {
      const idx = this.scriptList.indexOf(script);
      if (idx !== -1) {
        this.scriptList.splice(idx, 1);
      }
    });
  }

  spawn(
    prefab: Prefab,
    position: Position,
    opts?: { name?: string; rotation?: Rotation; scale?: Scale },
  ): GameObject {
    const go = GameObjectFactory.Instantiate(prefab, position, {
      name: opts?.name,
      rotation: opts?.rotation,
      scale: opts?.scale,
    });

    this.activeScene.addGameObject(go);

    this.registerScripts(go.getScripts());
    this.physicsEngine.registerColliders(go.getColliders());
    go.getScripts().forEach((script) => {
      script.start?.();
    });

    return go;
  }

  despawn(go: GameObject) {
    this.unregisterScript(go.getScripts());
    this.physicsEngine.unregisterColliders(go.getColliders());
    this.activeScene.removeGameObject(go);
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }
}
