export default function World() {
    let instance: { createUser: () => void }
    function createInstance() {
        return {
            createUser: function() {
                if (!instance) {
                    throw new Error("World must be instantiated before creating user")
                }
                console.log("Creating a user in World")
            }
        }
    }

    return {
        createWorld: function() {
            if (instance) {
                throw new Error ("World already exists, use existing world instance")
            }
            instance = createInstance()
            return instance
        }

    }
}
