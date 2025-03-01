import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { Game as MainGame } from "./scenes/Game";
import { Level01 } from "./scenes/Level01";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { MainMenu } from "./scenes/MainMenu";
import { Background } from "./scenes/Background";
import { Foreground } from "./scenes/Foreground";
import { Gameplay } from "./scenes/Gameplay";
import { CharacterDialog } from "./scenes/CharacterDialog";
import { Debug } from "./scenes/Debug";

import {CANVAS} from "../../../shared/constants";

export enum ASSET_KEYS {
    NANNY = "nanny",
    WIENER = "wiener",
    LOGO = "logo",
    GARDEN_BG_0 = "gardenLayer0",
    GARDEN_BG_1 = "gardenLayer1",
    FLOOR = "floor",
    GULL = "gull",
    GULL_POO = "gullpoo",
}

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    backgroundColor: "#0ad1ea",
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-container',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: CANVAS.WIDTH,
        height: CANVAS.HEIGHT
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 100 },
            debug: true,
        },
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Debug,
        CharacterDialog,
        Level01,
        Background,
        Foreground,
        Gameplay,
        MainGame,
        GameOver,
    ],
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
