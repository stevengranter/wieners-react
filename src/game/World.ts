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

import createScene from "./WorldScene.ts";
import createActor from "./WorldActor.ts";

import Actor from "./WorldActor.ts";
import Scene from "./WorldScene.ts";

type World = {
  createActor: typeof Actor;
  createScene: typeof Scene;
};

let instance: World | null = null;

function World(): World {
  if (!instance) {
    instance = {
      createScene,
      createActor,
    };
  } else {
    throw new Error("World already exists, use existing world instance");
  }

  return instance;
}

const createWorld = World;
export default createWorld;
