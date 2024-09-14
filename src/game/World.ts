export default function createWorld() {
    let instance: { createUser: () => void } | null = null;

    function createInstance() {
        return {
            createUser: function() {
                console.log("Creating a user in World");
            }
        }
    }

    if (!instance) {
        instance = createInstance();
    } else {
        throw new Error("World already exists, use existing world instance");
    }

    return instance;
}
