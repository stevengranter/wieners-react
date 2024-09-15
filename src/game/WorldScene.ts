type WorldScene = {
  id: string;
  layers: Layers[];
};

type Layers = {
  src: string;
};

function Scene(): WorldScene {
  const layers: [] = [];
  console.log("Creating a WorldScene in World");
  return {
    id: crypto.randomUUID(),
    layers,
  };
}

const createScene = Scene;
export default createScene;
