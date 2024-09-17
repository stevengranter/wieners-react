import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Level01 extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    nanny: Phaser.GameObjects.Image;
    wiener: Phaser.GameObjects.Image;
   

    constructor ()
    {
        super('Level01');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(0,0, 'background');
        this.background.setOrigin(0,0)
        this.background.displayWidth = this.scale.width
        this.background.displayHeight = this.scale.height
        
        this.nanny = this.add.image(this.scale.width/2,190,"nanny")
        
        this.wiener = this.add.image(this.scale.width/2,0,"wiener")
        this.wiener.displayHeight = 20
        this.wiener.displayWidth = 20
        
        
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
