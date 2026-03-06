import { GameObject } from "../manager/model/GamaObject";
import type { Scene } from "../manager/model/Scene";
import { SceneManager } from "../manager/SceneManager";
import type { BoundingBox } from "../Types";
import type { Collider } from "./collider/Collider";

type CollisionInfo = {
  self: GameObject;
  other: GameObject;
  selfBox: BoundingBox;
  otherBox: BoundingBox;
  selfCollider: Collider;
  otherCollider: Collider;
};

export class PhysicsEngine {
  private colliderList: Collider[] = [];

  constructor(private sceneManager: SceneManager) {}
  registerAllCollidersInScene(scene: Scene) {
    this.colliderList = scene
      .getGameObjects()
      .flatMap((go) => go.getColliders());
    console.log(`Collider num: ${this.colliderList.length}`);
  }

  registerCollider(collider: Collider) {
    this.colliderList.push(collider);
  }

  registerColliders(colliders: Collider[]) {
    this.colliderList.push(...colliders);
  }

  unregisterColliders(colliders: Collider[]) {
    colliders.forEach((collider) => {
      const idx = this.colliderList.indexOf(collider);
      if (idx !== -1) {
        this.colliderList.splice(idx, 1);
      }
    });
  }

  private getFuturePosition(gameObject: GameObject, dt: number) {
    return {
      x: gameObject.transform.position.x + gameObject.physic.speed.x * dt,
      y: gameObject.transform.position.y + gameObject.physic.speed.y * dt,
    };
  }

  physicsUpdate(dt: number) {
    const maxStep = 1 / 120;
    let remaining = dt;

    while (remaining > 0) {
      const step = Math.min(remaining, maxStep);
      this.checkCollision(step);
      remaining -= step;
    }

    this.sceneManager
      .getActiveScene()
      .getGameObjects()
      .forEach((go) => {
        go.calculateSpeed(dt);
        go.updatePastTransformPosition();
      });
  }

  private getSeparationVector(
    a: BoundingBox,
    b: BoundingBox,
  ): { x: number; y: number } {
    const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);

    if (overlapX <= 0 || overlapY <= 0) {
      return { x: 0, y: 0 };
    }

    const selfCenterX = a.x + a.w / 2;
    const otherCenterX = b.x + b.w / 2;
    const selfCenterY = a.y + a.h / 2;
    const otherCenterY = b.y + b.h / 2;

    if (overlapX < overlapY) {
      return {
        x: selfCenterX < otherCenterX ? -overlapX : overlapX,
        y: 0,
      };
    }

    return {
      x: 0,
      y: selfCenterY < otherCenterY ? -overlapY : overlapY,
    };
  }

  normalizeGameObject(collisions: CollisionInfo[]) {
    if (collisions.length === 0) return;

    const self = collisions[0].self;

    let totalPushX = 0;
    let totalPushY = 0;

    for (const collision of collisions) {
      const selfSpeed = collision.self.physic.calculateSpeedMagnitude();
      const otherSpeed = collision.other.physic.calculateSpeedMagnitude();

      if (selfSpeed <= otherSpeed) {
        continue;
      }

      const push = this.getSeparationVector(
        collision.selfBox,
        collision.otherBox,
      );

      totalPushX += push.x;
      totalPushY += push.y;
    }

    self.transform.position.x += totalPushX;
    self.transform.position.y += totalPushY;
  }

  private getCollisionInfo(
    colA: Collider,
    colB: Collider,
    futurePosA: { x: number; y: number },
    futurePosB: { x: number; y: number },
  ): {
    gameObjectA: GameObject;
    gameObjectB: GameObject;
    boxA: BoundingBox;
    boxB: BoundingBox;
  } | null {
    if (!colA.gameObject || !colB.gameObject) return null;

    const broadA = colA.gameObject.getColliderBoundsAt(futurePosA);
    const broadB = colB.gameObject.getColliderBoundsAt(futurePosB);

    if (!this.checkAABBCollision(broadA, broadB)) {
      return null;
    }

    const rawBoxA = colA.getWorldBoxAt(futurePosA);
    const rawBoxB = colB.getWorldBoxAt(futurePosB);

    const boxAList = Array.isArray(rawBoxA) ? rawBoxA : [rawBoxA];
    const boxBList = Array.isArray(rawBoxB) ? rawBoxB : [rawBoxB];

    for (const a of boxAList) {
      for (const b of boxBList) {
        if (this.checkAABBCollision(a, b)) {
          return {
            gameObjectA: colA.gameObject,
            gameObjectB: colB.gameObject,
            boxA: a,
            boxB: b,
          };
        }
      }
    }

    return null;
  }

  checkCollision(dt: number) {
    const collisionsByObject = new Map<string, CollisionInfo[]>();

    for (let i = 0; i < this.colliderList.length; i++) {
      const colA = this.colliderList[i];

      for (let j = i + 1; j < this.colliderList.length; j++) {
        const colB = this.colliderList[j];

        if (colA.gameObject?.id === colB.gameObject?.id) continue;
        if (!colA.gameObject || !colB.gameObject) continue;

        const futurePosA = {
          x:
            colA.gameObject.transform.position.x +
            colA.gameObject.physic.speed.x * dt,
          y:
            colA.gameObject.transform.position.y +
            colA.gameObject.physic.speed.y * dt,
        };

        const futurePosB = {
          x:
            colB.gameObject.transform.position.x +
            colB.gameObject.physic.speed.x * dt,
          y:
            colB.gameObject.transform.position.y +
            colB.gameObject.physic.speed.y * dt,
        };

        const collision = this.getCollisionInfo(
          colA,
          colB,
          futurePosA,
          futurePosB,
        );
        if (!collision) continue;

        const { gameObjectA, gameObjectB, boxA, boxB } = collision;

        if (!collisionsByObject.has(gameObjectA.id)) {
          collisionsByObject.set(gameObjectA.id, []);
        }
        if (!collisionsByObject.has(gameObjectB.id)) {
          collisionsByObject.set(gameObjectB.id, []);
        }

        collisionsByObject.get(gameObjectA.id)!.push({
          self: gameObjectA,
          other: gameObjectB,
          selfBox: boxA,
          otherBox: boxB,
          selfCollider: colA,
          otherCollider: colB,
        });

        collisionsByObject.get(gameObjectB.id)!.push({
          self: gameObjectB,
          other: gameObjectA,
          selfBox: boxB,
          otherBox: boxA,
          selfCollider: colB,
          otherCollider: colA,
        });

        colA.onCollisionEnter(colB);
        colB.onCollisionEnter(colA);
      }
    }

    for (const [, collisions] of collisionsByObject) {
      this.normalizeGameObject(collisions);
    }
  }

  private checkAABBCollision(
    a: BoundingBox | undefined,
    b: BoundingBox | undefined,
  ): boolean {
    if (!a || !b) return false;
    return (
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
    );
  }

  drawAllCollidersDebugLines(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 1;
    this.colliderList.forEach((collider) => {
      if (collider.gameObject?.isLoaded) {
        collider.drawDebugLines(ctx);
      }
    });
  }

  drawAllCollidersBoundsDebugLines(
    ctx: CanvasRenderingContext2D,
    gameObjects: GameObject[],
  ) {
    ctx.lineWidth = 3;
    gameObjects.forEach((go) => {
      if (go.isLoaded) {
        go.getColliders().forEach((col) => {
          col.debugColliderBoundsLines(ctx);
        });
      }
    });
  }
}
