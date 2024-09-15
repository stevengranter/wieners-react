type WorldActor = {
  id: string;
};

function Actor(): WorldActor {
  return { id: crypto.randomUUID() };
}

const createActor = Actor;
export default createActor;
