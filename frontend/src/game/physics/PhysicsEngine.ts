import { Engine } from "../manager/engine";
import type { Scene } from "../manager/model/scene";
import type { Collider } from "./collider/Collider";

export class PhysicsEngine{
    private colliderList: Collider[] = [];

    registerAllCollidersInScene(scene : Scene){
        this.colliderList = scene
        .getGameObjects()
        .flatMap((go) => go.getColliders());
        console.log(`Collider num: ${this.colliderList.length}`);
    }

    registerCollider(collider: Collider){
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

    drawAllCollidersDebugLines(ctx : CanvasRenderingContext2D){
        this.colliderList.forEach((collider) => {
            if (collider.gameObject?.isLoaded) {
                collider.drawDebugLines(ctx);
            }
        });
    }
}