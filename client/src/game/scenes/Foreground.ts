import Phaser from "phaser";

export class Foreground extends Phaser.Scene {
    private imageFileName: string;
    constructor() {
        super({ key: "Foreground" });
    }

    init(data: { imageFileName: string }) {
        this.imageFileName = data.imageFileName;
        console.log(this.imageFileName);
    }

    preload() {
        this.load.image(
            "foreground",
            "./assets/images/backgrounds/" + this.imageFileName,
        );
    }

    create() {
        this.add
            .image(0, 0, "foreground")
            .setScrollFactor(0)
            .setOrigin(0, 0)
            .setDisplaySize(this.scale.width, this.scale.height);
    }

    update() {}
}
