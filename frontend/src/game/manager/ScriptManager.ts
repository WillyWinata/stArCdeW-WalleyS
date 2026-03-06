import type { MonoBehavior } from "./model/mono-behavior";
import type { Scene } from "./model/scene";

export class ScriptManager {
    private scriptList: MonoBehavior[] = [];
    
    registerScripts(activeScene : Scene) {
        this.scriptList = activeScene
        .getGameObjects()
        .flatMap((go) => go.getScripts())
        .sort((a, b) => a.order - b.order);
    }

    registerScriptsAtRuntime(scripts: MonoBehavior[]) {
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

    unregisterScriptAtRuntime(scripts: MonoBehavior[]) {
        scripts.forEach((script) => {
        const idx = this.scriptList.indexOf(script);
        if (idx !== -1) {
            this.scriptList.splice(idx, 1);
        }
        });
    }

    startScripts(){
        this.scriptList.forEach((script) => {
            script.start?.();
        });
    }

    updateScripts(dt: number){
        this.scriptList.forEach((script) => {
            script.update(dt);
        });
    }

    drawScripts(ctx: CanvasRenderingContext2D){
        this.scriptList.forEach((script) => {
            if (script.draw) {
                script.draw(ctx);
            }
        });
    }
}