// World.ts
//
// ✅Responsibilities:
//
// 1. Creating all the objects in the game world
// 2. Keeping track of where all the object exist in the game world in one time slice
//
// 🚫NOT responsible for:
// * Rendering
// * Game logic
// * Time management
// * WorldUser interaction

import WorldScene from "./WorldScene.ts";
import WorldActor from "./WorldActor.ts";

type World = {
  createActor: () => WorldActor;
  createScene: () => WorldScene;
  getScenes: () => WorldScene[];
  getActors: () => WorldActor[];
};

let instance: World | null = null;

function World(): World {
  const scenes: WorldScene[] = [];
  const actors: WorldActor[] = [];

  if (!instance) {
    instance = {
      createScene,
      getScenes,
      createActor,
      getActors,
    };
  } else {
    throw new Error("World already exists, use existing world instance");
  }

  function createScene(config = null) {
    const sceneInstance: WorldScene = WorldScene(config);
    scenes.push(sceneInstance);
    return sceneInstance;
  }

  function getScenes() {
    if (scenes) return scenes;
    else return [];
  }

  function createActor(config = null) {
    const actorInstance = WorldActor(config);
    actors.push(actorInstance);
    return actorInstance;
  }

  function getActors() {
    if (actors) return actors;
    else return [];
  }

  console.log("%c🌎 Created World: ", "color:green");
  console.log(`   World: %o`, instance);
  return instance;
}

const createWorld = World;
export default createWorld;
