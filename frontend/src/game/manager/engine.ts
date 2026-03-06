import { PhysicsEngine } from "../physics/PhysicsEngine";
import { GameObjectFactory } from "./factory/game-object-factory";
import { InputSystem } from "./input-system";
import type { GameObject } from "./model/game-object";
import type { Prefab } from "./model/prefab";
import type { Position } from "./model/transform/position";
import type { Rotation } from "./model/transform/rotation";
import type { Scale } from "./model/transform/scale";
import { SceneManager } from "./SceneManager";
import { ScriptManager } from "./ScriptManager";

export class Engine {
  private static instance: Engine;
  private physicsEngine: PhysicsEngine;
  private scriptManager: ScriptManager;
  private sceneManager: SceneManager;

  private ctx!: CanvasRenderingContext2D;
  private lastTime = 0;
  private running = false;

  private constructor() {
    this.sceneManager = new SceneManager();
    this.physicsEngine = new PhysicsEngine(this.sceneManager);
    this.scriptManager = new ScriptManager();
    this.scriptManager.registerScripts(this.sceneManager.getActiveScene());
  }

  static getInstance(): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine();
    }
    return Engine.instance;
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
    this.scriptManager.startScripts();

    this.physicsEngine.registerAllCollidersInScene(
      this.sceneManager.getActiveScene(),
    );

    this.lastTime = performance.now();
    requestAnimationFrame(this.loop);
  }

  update(dt: number) {
    this.scriptManager.updateScripts(dt);

    this.physicsEngine.physicsUpdate(dt);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.imageSmoothingEnabled = false;
    this.scriptManager.drawScripts(ctx);
    this.physicsEngine.drawAllCollidersDebugLines(ctx);
    this.physicsEngine.drawAllCollidersBoundsDebugLines(
      ctx,
      this.sceneManager.getActiveScene().getGameObjects(),
    );
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

    this.sceneManager.getActiveScene().addGameObject(go);

    this.scriptManager.registerScriptsAtRuntime(go.getScripts());
    this.physicsEngine.registerColliders(go.getColliders());
    go.getScripts().forEach((script) => {
      script.start?.();
    });

    return go;
  }

  despawn(go: GameObject) {
    this.scriptManager.unregisterScriptAtRuntime(go.getScripts());
    this.physicsEngine.unregisterColliders(go.getColliders());
    this.sceneManager.getActiveScene().removeGameObject(go);
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }
}
