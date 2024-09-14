
function User(position=[0,0], width=64, height=64): {x:number, y:number, id: string, width: number, height: number} {
        console.log("Creating a user in World");
        return {
            x: position[0],
            y: position[1],
            id: crypto.randomUUID(),
            width,
            height
        }

    }

    const createUser = User
    export default createUser
