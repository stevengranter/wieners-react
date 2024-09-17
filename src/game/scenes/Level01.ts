import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import Player from "../gameobjects/Player.ts";

export class Level01 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    player: Player;
    wiener: Phaser.GameObjects.Sprite;
    floor: Phaser.GameObjects.Rectangle;

    constructor() {
        super("Level01");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(0, 0, "background0");
        this.background.setOrigin(0, 0);
        this.background.displayWidth = this.scale.width;
        this.background.displayHeight = this.scale.height;

        this.player = new Player(this, 0, 0, "nanny");

        this.floor = this.add.rectangle(0, 210, this.scale.width, 20);
        this.floor.setOrigin(0, 0);

        this.physics.add.staticGroup(this.floor);
        this.physics.add.collider(this.player, this.floor);

        this.wiener = this.add.sprite(this.scale.width / 2, 0, "wiener");
        this.wiener.displayHeight = 20;
        this.wiener.displayWidth = 20;

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("GameOver");
    }

    update() {
        this.player.update();
    }
}
