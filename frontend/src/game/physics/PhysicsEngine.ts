import { Engine } from "../manager/engine";
import type { Scene } from "../manager/model/scene";
import type { BoundingBox } from "../types";
import { BoxCollider } from "./collider/BoxCollider";
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

    physicsUpdate(dt: number){
        this.checkCollision();
    }

    checkCollision(){
        for(let i = 0; i < this.colliderList.length; i++){
            for(let j = i + 1; j < this.colliderList.length; j++){
                const colA = this.colliderList[i];
                const colB = this.colliderList[j];
                if(this.isCollide(colA, colB)){
                    colA.onCollisionEnter(colB);
                    colB.onCollisionEnter(colA);
                }
            }
        }
    }

    isCollide(colA: Collider, colB: Collider): boolean{
        const boxA : BoundingBox | BoundingBox[] = colA.getWorldBox();
        const boxB : BoundingBox | BoundingBox[] = colB.getWorldBox();
        
        for(const a of Array.isArray(boxA) ? boxA : [boxA]){
            for(const b of Array.isArray(boxB) ? boxB : [boxB]){
                if(a.x < b.x + b.w &&
                    a.x + a.w > b.x &&
                    a.y < b.y + b.h &&
                    a.y + a.h > b.y){
                    return true;
                }
            }
        }
        return false;
    }

    private checkAABBCollision(a: BoundingBox, b: BoundingBox): boolean {
        return a.x < b.x + b.w && a.x + a.w > b.x &&
               a.y < b.y + b.h && a.y + a.h > b.y;
    }

    drawAllCollidersDebugLines(ctx : CanvasRenderingContext2D){
        this.colliderList.forEach((collider) => {
            if (collider.gameObject?.isLoaded) {
                collider.drawDebugLines(ctx);
            }
        });
    }
}