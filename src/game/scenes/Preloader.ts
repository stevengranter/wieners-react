import { Scene } from "phaser";
import { ASSET_KEYS } from "../main.ts";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(0, 0, ASSET_KEYS.LOGO);

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath("assets");

        this.load.spritesheet(
            ASSET_KEYS.NANNY,
            "images/sprites/sprite_nan-walk.png",
            {
                frameWidth: 48,
                frameHeight: 48,
            },
        );

        this.load.spritesheet(
            ASSET_KEYS.GULL,
            "images/sprites/sprite_seagull-flying-01.png",
            {
                frameWidth: 44,
                frameHeight: 50,
            },
        );

        this.load.image(
            ASSET_KEYS.GULL_POO,
            "images/sprites/sprite_gullpoo.png",
        );

        // this.load.image('nanny','images/sprites/sprite_nan-standing-left.png')
        this.load.image(
            ASSET_KEYS.GARDEN_BG_0,
            "images/backgrounds/bg_garden-layer-0.webp",
        );
        this.load.image(
            ASSET_KEYS.GARDEN_BG_1,
            "images/backgrounds/bg_garden-layer-1.webp",
        );
        this.load.image(ASSET_KEYS.WIENER, "images/wfh_icon.svg");
        this.load.image(ASSET_KEYS.LOGO, "logo.png");
        this.load.image(ASSET_KEYS.FLOOR, "images/temp/platform.png");
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("MainMenu");
    }
}
