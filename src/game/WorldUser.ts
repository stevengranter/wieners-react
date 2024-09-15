type WorldUser = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

function User(position = [0, 0], width = 64, height = 64): WorldUser {
  console.log("Creating a user in World");
  return {
    x: position[0],
    y: position[1],
    id: crypto.randomUUID(),
    width,
    height,
  };
}

const createUser = User;
export default createUser;
