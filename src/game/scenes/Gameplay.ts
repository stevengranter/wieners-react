import Player from "../gameobjects/Player.ts";
import { ASSET_KEYS } from "../main.ts";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import Gull from "../gameobjects/Gull.ts";

export class Gameplay extends Phaser.Scene {
    wieners: Phaser.Physics.Arcade.Group;
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    player: Phaser.Physics.Arcade.Sprite;
    wiener: Phaser.Physics.Arcade.Sprite;
    floor: Phaser.Physics.Arcade.Image;
    initialSpawnCount: 10;
    maxWieners: 1000;
    cursors: CursorKeys;
    gull: Phaser.Physics.Arcade.Sprite;
    // private _wasdKeys?:
    //     | {
    //           W: Phaser.Input.Keyboard.Key;
    //           A: Phaser.Input.Keyboard.Key;
    //           S: Phaser.Input.Keyboard.Key;
    //           D: Phaser.Input.Keyboard.Key;
    //       }
    //     | undefined;

    constructor() {
        super({ key: "Gameplay" });
    }

    create() {
        this.camera = this.cameras.main;

        this.player = new Player(this, 0, 0, ASSET_KEYS.NANNY);

        this.floor = this.physics.add.staticImage(0, 235, ASSET_KEYS.FLOOR);
        this.floor.setVisible(false);
        this.floor.setImmovable(true);
        this.floor.setMass(100);

        this.physics.add.collider(this.player, this.floor);

        this.wiener = this.physics.add.sprite(
            this.scale.width / 2,
            0,
            ASSET_KEYS.WIENER,
        ) as Phaser.Physics.Arcade.Sprite;

        if (this.wiener.body) {
            this.wiener.body.setSize(20, 20);
        }

        this.wiener.displayWidth = 20;
        this.wiener.displayHeight = 20;

        this.wiener.setDrag(200);
        this.wiener.setGravity(0.5);
        this.wiener.setAccelerationY(-200);

        // Create a physics group for wieners
        this.wieners = this.physics.add.group();

        this.gull = new Gull(this, 400, 10, ASSET_KEYS.GULL);

        this.setWASDKeys();

        this.initialSpawnCount = 10;
        // Initial spawn of wieners
        this.spawnWieners(this.initialSpawnCount);

        this.time.addEvent({
            delay: 2000, // Spawn every 2 seconds
            callback: this.gull.launchProjectile,
            callbackScope: this.gull,
            // args: [10], // Number of wieners to spawn each interval
            loop: true,
        });

        // Set up a timed event to spawn additional wieners
        this.time.addEvent({
            delay: 2000, // Spawn every 2 seconds
            callback: this.spawnWieners,
            callbackScope: this,
            args: [10], // Number of wieners to spawn each interval
            loop: true,
        });
        // Create a collider for the wieners with the floor
        this.physics.add.collider(this.wieners, this.floor);
        this.physics.add.overlap(
            this.player,
            this.wieners,
            this.handleOverlap,
            null,
            this,
        );

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    setWASDKeys() {
        if (!this.scene || !this.scene.input || !this.scene.input.keyboard) {
            console.error("Scene or input system is not initialized properly.");
            return;
        }
        const W = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.W,
        );
        const A = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A,
        );
        const S = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S,
        );
        const D = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D,
        );
        return { W, A, S, D };
    }

    handleOverlap(player, wiener) {
        if (wiener.isDestroyed) return; // Prevent repeated processing

        // Mark as destroyed
        wiener.isDestroyed = true;
        wiener.setActive(false);
        wiener.setVisible(false);
        player.health = 10;
        console.log(player.health);

        console.log("overlap!");

        // Schedule actual destruction for the next physics step
        this.time.delayedCall(0, () => {
            wiener.destroy();
        });
    }
    // createPlayer() {
    //     // this.createPlayerAnimations();
    //     this.player = this.physics.add.sprite(0, 0, ASSET_KEYS.NANNY);
    //     // this.player.setBounce(0, 0.2);
    //     // this.player.setMass(500);
    //     // this.player.setGravity(0, 50);
    // }

    createPlayerAnimations() {
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("nanny", {
                start: 0,
                end: 4,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "nanny", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("nanny", {
                start: 5,
                end: 9,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    // Function to spawn a specified number of wieners
    spawnWieners() {
        console.log("spawning wieners");
        const currentCount = this.wieners.getChildren().length | 1;
        console.log({ currentCount });
        // const spawnCount = Math.min(count, this.maxWieners - currentCount);
        const spawnCount = 1;
        console.log({ spawnCount });
        for (let i = 0; i < spawnCount; i++) {
            const x = 50;
            const y = 50;
            // const x = Phaser.Math.Between(0, this.scale.width);
            // const y = 100;
            const wiener = this.wieners.create(
                x,
                y,
                ASSET_KEYS.WIENER,
            ) as Phaser.Physics.Arcade.Sprite;
            wiener.setDisplaySize(20, 20); // Set uniform size
            wiener.setBounce(1, 1); // Example property
            wiener.setGravity(1);
            // wiener.setVelocity(Phaser.Math.Between(-200, 200), 20); // Example velocity
        }
    }

    update() {
        this.player.update();
        this.gull.update();
        // if (!this.cursors && !this._wasdKeys)
        //     throw new Error("Oh no, no input keys defined");
        // if (this.cursors?.left.isDown || this._wasdKeys?.A.isDown) {
        //     this.player.anims.play("left", true);
        //     this.player.setVelocityX(-100);
        // } else if (this.cursors?.right.isDown || this._wasdKeys?.D.isDown) {
        //     this.player.anims.play("right", true);
        //     this.player.setVelocityX(100);
        // }

        // if (
        //     this.cursors?.space.isDown ||
        //     this.cursors?.up.isDown ||
        //     this._wasdKeys?.W.isDown
        // ) {
        //     this.jump();
        // }
    }
}
