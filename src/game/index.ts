import createWorld from "./World";

import {$l} from "../utils/dev"

// Create a World instance
const World = createWorld();

// Call createUser from the World instance
const user = World.createUser();

$l({user})

const scene = World.createScene();
$l({scene})


