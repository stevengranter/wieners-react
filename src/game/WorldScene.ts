type WorldScene = {
  id: string;
  layers: Layers[];
};

type WorldSceneConfig = {
  layers?: Layers[];
};

type Layers = {
  src: string;
};

function WorldScene(sceneCfg: WorldSceneConfig | null = null): WorldScene {
  const layers: [] = [];
  const scene = { id: crypto.randomUUID(), layers, ...sceneCfg };
  console.log("%c🎬 Created a Scene in World: ", "color:green");
  console.log(`   Scene: %o`, scene);
  return scene;
}

export default WorldScene;
