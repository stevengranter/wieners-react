import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import Player from "../gameobjects/Player.ts";

export class Level01 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    player: Player;
    wiener: Phaser.Physics.Arcade.Sprite;
    floor: Phaser.Physics.Arcade.Image;

    constructor() {
        super("Level01");
    }

    create() {
        this.camera = this.cameras.main.setBackgroundColor(0x000000);
        this.scene.start("Background", {
            imageFileName: "bg_garden-layer-0.webp",
        });
        this.scene.start("Foreground", {
            imageFileName: "bg_garden-layer-1.webp",
        });

        this.scene.start("CharacterDialog");

        this.scene.start("Gameplay");

        this.scene.bringToTop("Foreground");
        this.scene.sendToBack("Background");

        // this.scene.start("Foreground", {
        //     imageFileName: "bg_garden-layer-1.webp",
        // });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("GameOver");
    }

    update() {
        this.player.update();
        // if (!this.wiener.body.touching.down) this.wiener.rotation += 0.1;
    }
}
