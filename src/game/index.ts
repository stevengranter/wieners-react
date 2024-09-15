import createWorld from "./World";

// Create a World instance
const World = createWorld();

// console.log({ user });

const scene = World.createScene();
console.log({ scene });
scene.layers.push({ src: "./images/backgrounds/bg_garden-layer-0.webp" });
