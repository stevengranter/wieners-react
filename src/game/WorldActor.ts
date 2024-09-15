type WorldActor = {
  id: string;
};

type WorldActorConfig = {
  src: "string";
};

function WorldActor(actorCfg: null | WorldActorConfig = null): WorldActor {
  const actor = { id: crypto.randomUUID(), ...actorCfg };
  console.log("%c🎭 Created an Actor in World: ", "color:green");
  console.log(`   Actor: %o`, actor);
  return actor;
}

export default WorldActor;
