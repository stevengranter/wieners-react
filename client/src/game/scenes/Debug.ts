// import { EventBus } from "../EventBus.ts";

export class Debug extends Phaser.Scene {
    constructor() {
        super("Debug");
        console.log("This is Debug (Phaser.Scene class)");
    }
    create() {
        // this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        // EventBus.emit("debug-mode", true);
    }
}
