<script lang="ts">
  import { onMount } from "svelte";
  import { InputSystem } from "./game/manager/input-system";
  import { Engine } from "./game/manager/engine";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  

  function resizeCanvas(): void{
    if(!canvas){
      return
    }
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  onMount(() =>{
    ctx = canvas.getContext("2d")
    if(!ctx){
      return
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const onKeyDown = (e: KeyboardEvent) => (InputSystem.getInstance().addKey(e.key.toLowerCase()))
    const onKeyUp = (e: KeyboardEvent) => (InputSystem.getInstance().removeKey(e.key.toLowerCase()))

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    
    Engine.getInstance().start(ctx)

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", resizeCanvas);
    };
  })
</script>

<main>
  <canvas bind:this={canvas}></canvas>
</main>

<style>
  canvas{
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    display: block;
  }
</style>