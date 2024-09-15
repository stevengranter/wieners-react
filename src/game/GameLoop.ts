// GameLoop.ts
//
// GameLoop should be able to run independently of rendering, it has no
// preference for rendering - it is only concerned with advancing time
//
// ✅Responsibilities:
// 1. Advancing time in the game world
//
// 🚫NOT responsible for:
// * Rendering --> Render.ts
// * WorldUser input --> Input.ts
// * WorldActor movement --> WorldActor.ts
// * Game Logic --> GameEngine.ts
//
//

import type WorldScene from "./WorldScene.ts";

type GameLoop = {
  runScene: () => boolean;
};

function GameLoop(scene: typeof WorldScene | null = null) {
  let lastTime: number = performance.now();
  let deltaTime: number | null;

  function loop() {
    const currentTime = performance.now();
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    updateScene(scene, deltaTime);
    renderScene(scene);

    requestAnimationFrame(loop);
  }

  function updateScene(
    scene: typeof WorldScene | null,
    deltaTime: number | null,
  ) {
    if (deltaTime === null || scene === null) {
      throw new Error(
        `Cannot update scene: deltaTime=${deltaTime} , scene= ${scene}`,
      );
    }
    console.log("WorldScene is updating");
    console.log(scene);
  }

  function renderScene(scene: typeof WorldScene | null) {
    if (!scene) {
      throw new Error("No scene specified to render");
    }
    console.log("WorldScene is rendering");
    console.log(scene);
  }

  function runScene(): boolean {
    try {
      requestAnimationFrame(loop);
      return true;
    } catch {
      throw new Error("Unable to run scene, scene stopped");
    }
  }

  return { runScene: runScene };
}

const loopScene = GameLoop;
export { loopScene };
