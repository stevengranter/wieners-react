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
    debugKeyCommand;
    isDebugMode = false;
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
        // 🎥 Set camera to cameras.main
        this.camera = this.cameras.main;

        this.camera.roundPixels = false;
        this.player = new Player(this, 125, 190, ASSET_KEYS.NANNY);
        //
        // this.player2 = this.physics.add.sprite(600, 500, "nannyHD");
        // this.player2.setScale(0.2);

        this.floor = this.physics.add.staticImage(0, 635, ASSET_KEYS.FLOOR);
        this.floor.setVisible(false);
        this.floor.setOrigin(0, 0);
        this.floor.setSize(2600, 100);
        this.floor.setImmovable(true);
        this.floor.setMass(100);

        this.physics.add.collider(this.player, this.floor);

        // Create a physics group for wieners
        this.wieners = this.physics.add.group();

        this.gull = new Gull(this, 400, 10, ASSET_KEYS.GULL);
        this.gull.scale = 2.5;

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
            delay: 750, // Spawn every 2 seconds
            callback: this.spawnWieners,
            callbackScope: this,
            args: [10], // Number of wieners to spawn each interval
            loop: true,
        });

        this.time.addEvent({
            delay: 10000, // Spawn every 2 seconds
            callback: () => {
                this.jumbo = this.physics.add.sprite(
                    Phaser.Math.Between(0, 475),
                    -100,
                    ASSET_KEYS.WIENER,
                    3,
                );
                this.jumbo.setDisplaySize(300, 300);
                this.jumbo.setVelocityY(200);
            },
            callbackScope: this,
            args: [10], // Number of wieners to spawn each interval
            loop: true,
        });
        // Create a collider for the wieners with the floor
        // this.physics.add.collider(this.wieners, this.floor);
        this.physics.add.overlap(
            this.player,
            this.wieners,
            this.handleOverlap,
            null,
            this,
        );

        // 🐞 Set key for debug mode
        this.physics.world.drawDebug = false;
        this.debugKeyCommand = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.P,
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

        // Set player health and score
        player.health = 10;
        player.score = 100;

        // Schedule actual destruction for the next physics step
        this.time.delayedCall(0, () => {
            wiener.destroy();
        });
    }

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
        // console.log("spawning wieners");
        const currentCount = this.wieners.getChildren().length | 1;
        // console.log({ currentCount });
        // const spawnCount = Math.min(count, this.maxWieners - currentCount);
        const spawnCount = 5;
        // console.log({ spawnCount });
        for (let i = 0; i < spawnCount; i++) {
            // const x = i * 10;
            const y = Phaser.Math.Between(-200, 0);
            const x = Phaser.Math.Between(0, this.scale.width);
            const velocityY = Phaser.Math.Between(0, 50);
            const velocityX = Phaser.Math.Between(-25, 25);
            const size = Phaser.Math.Between(50, 70);
            const rotation = Phaser.Math.Between(5, 20);
            const acceleration = Phaser.Math.Between(-200, -100);
            // const y = 100;
            const wiener = this.wieners.create(
                x,
                y,
                ASSET_KEYS.WIENER,
            ) as Phaser.Physics.Arcade.Sprite;
            wiener.setDisplaySize(size, size);
            wiener.setGravity(4);
            // wiener.preFX.addGlow();
            // wiener.setMass(0);
            // wiener.setVelocityY(velocityY);
            // wiener.setVelocityX(velocityX);
            // wiener.setRotation(rotation);
            // wiener.setAccelerationY(acceleration);
            // // wiener.setDrag(800);
        }
    }

    update() {
        this.player.update();
        this.gull.update();

        this.wieners.children.each((child: Phaser.Physics.Arcade.Sprite) => {
            child.rotation += 0.05;
        });
        if (this.jumbo) {
            this.jumbo.rotation -= 0.05;
        }

        if (Phaser.Input.Keyboard.JustDown(this.debugKeyCommand)) {
            if (this.physics.world.drawDebug) {
                this.physics.world.drawDebug = false;
                this.isDebugMode = false;
                this.physics.world.debugGraphic.clear();
            } else {
                this.isDebugMode = true;
                this.physics.world.drawDebug = true;
            }
        }

        if (this.isDebugMode) {
            console.log(`player.x = ${this.player.x}`);
            console.log(`player.y = ${this.player.y}`);
        }
    }
}
