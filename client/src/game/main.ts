import { Boot } from "./scenes/Boot";

import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { MainMenu } from "./scenes/MainMenu";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../shared/constants";

// export enum ASSET_KEYS {
//     NANNY = "nanny",
//     WIENER = "wiener",
//     LOGO = "logo",
//     GARDEN_BG_0 = "gardenLayer0",
//     GARDEN_BG_1 = "gardenLayer1",
//     FLOOR = "floor",
//     GULL = "gull",
//     GULL_POO = "gullpoo",
// }
//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    // see main.css for scaling rules
    // scale: {
    //     mode: Phaser.Scale.FIT,
    // },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 100 },
            debug: false,
        },
    },
    scene: [Boot, Preloader, MainMenu],
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
