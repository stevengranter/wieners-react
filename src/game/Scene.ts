function Scene() {
    console.log("Creating a Scene in World")
    return {
        id: crypto.randomUUID()
    }
}

const createScene = Scene
export default createScene
