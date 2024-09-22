import { Scene } from "phaser";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
// import { ASSET_KEYS } from "../main.ts";
import { EventBus } from "../EventBus.ts";

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
    #health = 0;
    #maxHealth = 100;
    #score = 0;

    constructor(scene: Scene, x: integer, y: integer, name: string = "nanny") {
        super(scene, x, y, name);
        this.name = name;
        this.scene = scene;
        this.init();
        this.scale = 2.5;
    }

    set health(amount: integer) {
        const updatedHealth = this.#health + amount;
        if (updatedHealth >= 100) {
            this.#health = this.#maxHealth;
        } else {
            this.#health = updatedHealth;
        }
        EventBus.emit("player-health-update", this.#health);
        console.log("this.playerHealth = " + this.#health);
    }

    get health() {
        return this.#health;
    }

    set score(amount: integer) {
        const updatedScore = this.#score + amount;
        if (updatedScore <= 0) {
            this.#score = 0;
        } else {
            this.#score = updatedScore;
        }
        EventBus.emit("player-score-update", this.#score);
    }

    get score() {
        return this.#score;
    }
    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.health = 50;

        this.setCollideWorldBounds(true);

        this._wasdKeys = this.setWASDKeys();
        this._cursorKeys = this.setCursorKeys();

        this.createAnimations();
    }

    createAnimations() {
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
            frames: this.anims.generateFrameNumbers("nanny", {
                start: 0,
                end: 0,
            }),
            frameRate: 10,
            repeat: -1,
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

    jump() {
        if (!this.body?.touching.down) return;
        this.anims.stop();
        this.setVelocityY(-500);
        this.setAccelerationY(1000);
    }

    update() {
        if (!this._cursorKeys && !this._wasdKeys)
            throw new Error("Oh no, no input keys defined");
        if (this._cursorKeys?.left.isDown || this._wasdKeys?.A.isDown) {
            this.anims.play("left", true);
            this.setVelocityX(-350);
        } else if (this._cursorKeys?.right.isDown || this._wasdKeys?.D.isDown) {
            this.anims.play("right", true);
            this.setVelocityX(350);
        } else {
            this.anims.play("turn", true);
            this.setVelocityX(0);
        }
        if (
            this._cursorKeys?.space.isDown ||
            this._cursorKeys?.up.isDown ||
            this._wasdKeys?.W.isDown
        ) {
            this.jump();
        }
    }
}
