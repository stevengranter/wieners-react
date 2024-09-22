import { type Scene } from "phaser";
import { ASSET_KEYS } from "../main.ts";

export default class Gull extends Phaser.GameObjects.Sprite {
    private projectile: Phaser.Physics.Arcade.Sprite;
    constructor(scene: Scene, x: integer, y: integer, name: string = "gull") {
        super(scene, x, y, name);
        this.name = name;
        this.scene = scene;
        this.init();
    }

    init() {
        this.scene.add.existing(this);
        this.setDisplaySize(300, 300);
        this.createAnimations();
        // this.launchProjectile();
    }

    createAnimations() {
        this.anims.create({
            key: "flyLeft",
            frames: this.anims.generateFrameNumbers(ASSET_KEYS.GULL, {
                start: 0,
                end: 7,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }
    public launchProjectile() {
        this.projectile = this.scene.physics.add.sprite(
            this.x,
            this.y,
            ASSET_KEYS.GULL_POO,
        );
        this.projectile.setScale(2.5);
    }

    update() {
        this.anims.play("flyLeft", true);
        this.x += -1;
        // this.setVelocityX(-100);
        // this.setVelocityY(200);
    }
}
