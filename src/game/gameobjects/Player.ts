import { Scene } from "phaser";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;

export default class Player extends Phaser.Physics.Arcade.Sprite {
    // private _id: `${string}-${string}-${string}-${string}-${string}`;
    private _cursorKeys?: CursorKeys;
    private _wasdKeys?:
        | {
              W: Phaser.Input.Keyboard.Key;
              A: Phaser.Input.Keyboard.Key;
              S: Phaser.Input.Keyboard.Key;
              D: Phaser.Input.Keyboard.Key;
          }
        | undefined;

    constructor(scene: Scene, x: integer, y: integer, name: string = "nanny") {
        super(scene, x, y, name);
        this.name = name;
        this._wasdKeys = this.setWASDKeys();
        this._cursorKeys = this.setCursorKeys();

        // Ensure scene is properly initialized
        if (scene) {
            scene.add.existing(this);
            scene.physics.add.existing(this);
            scene.physics.world.enable(this);
            this.setCollideWorldBounds(true);
            this.init();
            this.setMass(10);
            this.scene.events.on("create", this.setCursorKeys, this);
        } else {
            console.error("Scene is not initialized properly.");
        }
    }

    init() {
        const columnsPerRow = 5; // Example value based on sprite sheet configuration

        const walkRightFrames = [];
        for (let i = 0; i < columnsPerRow; i++) {
            walkRightFrames.push({ key: "nanny", frame: i }); // Adjust the frame index based on your sprite sheet
        }

        const walkLeftFrames = [];
        for (let i = 0; i < columnsPerRow; i++) {
            walkLeftFrames.push({ key: "nanny", frame: i + columnsPerRow }); // Offset by the number of columns in a row
        }

        console.log(walkRightFrames);

        // Create animations
        this.anims.create({
            key: "walkRight",
            frames: walkRightFrames,
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "walkLeft", // Animation key for walking left
            frames: walkLeftFrames, // Frames from the second row (walkleft)
            frameRate: 10, // Frame rate in this example
            repeat: -1, // Infinite loop
        });
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

    setCursorKeys() {
        if (!this.scene || !this.scene.input || !this.scene.input.keyboard) {
            console.error("Scene or input system is not initialized properly.");
            return;
        }
        return this.scene.input.keyboard.createCursorKeys();
    }

    walkRight() {
        this.anims.play("walkRight");
        this.x += 1;
    }

    walkLeft() {
        this.anims.play("walkLeft");
        this.x += -1;
    }

    jump() {
        this.anims.stop();
        this.setVelocityY(-100);
    }

    update() {
        if (!this._cursorKeys && !this._wasdKeys)
            throw new Error("Oh no, no input keys defined");
        if (this._cursorKeys?.left.isDown || this._wasdKeys?.A.isDown) {
            this.walkLeft();
        } else if (this._cursorKeys?.right.isDown || this._wasdKeys?.D.isDown) {
            this.walkRight();
        } else if (
            this._cursorKeys?.space.isDown ||
            this._cursorKeys?.up.isDown ||
            this._wasdKeys?.W.isDown
        ) {
            this.jump();
        } else {
            // idle animation
            this.anims.stop();
        }
    }
}
