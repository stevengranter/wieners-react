import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { Level01 } from './scenes/Level01';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import {MainMenu} from "./scenes/MainMenu.ts";

const CANVAS = {
    width: 475,
    height: 270
}

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: CANVAS.width,
    height: CANVAS.height,
    parent: 'game-container',
    backgroundColor: '#0ad1ea',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Level01,
        MainGame,
        GameOver
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
