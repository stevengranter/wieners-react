import { GameObjects, Scene } from "phaser";

import { EventBus } from "../EventBus";
import Client from "../../client";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;

    constructor() {
        super("MainMenu");
    }

    preload() {}

    create() {
        // this.background = this.add.image(this.scale.width/2, this.scale.height/2, "background");

        const posCanvasCenter = {
            x: this.scale.width / 2,
            y: this.scale.height / 2 - 16,
        };

        this.logo = this.add.image(
            posCanvasCenter.x,
            posCanvasCenter.y,
            "logo",
        );
        // .setDepth(100);
        this.logo.setScale(0.35);
        if (Client.socket) {
            Client.socket.connect();
            EventBus.emit("socket-ready");
        }

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("Level01", {});
    }
}
