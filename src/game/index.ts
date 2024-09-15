import createWorld from "./World";

// Create a World instance
const World = createWorld();

// console.log({ user });

const scene01Config = {
  layers: [{ src: "./images/backgrounds/bg_garden-layer-0.webp" }],
  name: "firstLevel",
};

World.createScene(scene01Config);
World.createActor();
