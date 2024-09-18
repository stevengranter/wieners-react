import Phaser from "phaser";

export class Background extends Phaser.Scene {
    private imageFileName: string;
    constructor() {
        super({ key: "Background" });
    }

    init(data: { imageFileName: string }) {
        this.imageFileName = data.imageFileName;
        console.log(this.imageFileName);
    }

    preload() {
        this.load.image(
            "background",
            "./assets/images/backgrounds/" + this.imageFileName,
        );
    }

    create() {
        this.add
            .image(0, 0, "background")
            .setScrollFactor(0)
            .setOrigin(0, 0)
            .setDisplaySize(this.scale.width, this.scale.height);
    }

    update() {}
}
