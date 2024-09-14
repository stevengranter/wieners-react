import User from "./User.ts";
import createScene from "./Scene.ts";

let instance: { createUser: () => {id:string,x:number,y:number,width:number,height:number}, createScene: () => void } | null = null;

function World() {
    if (!instance) {
        instance = {
            createUser: User,
            createScene
        };
    } else {
        throw new Error("World already exists, use existing world instance");
    }

    return instance;
}

const createWorld = World
export default createWorld
