import { useRef } from 'react'
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame'
import { MainMenu } from './game/scenes/MainMenu'
import Button from './ui/Button'

function App() {
    // The sprite can only be moved in the MainMenu Scene
    // const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null)
    // const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const changeScene = () => {
        if (phaserRef.current) {
            const scene = phaserRef.current.scene as MainMenu

            if (scene) {
                scene.changeScene()
            }
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        console.log(scene)
        // setCanMoveSprite(scene.scene.key !== 'MainMenu');
    }

    return (
        <div id='app'>
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <footer>
                <div id='nav-buttons'>
                    <Button className='Button' onClick={changeScene}>
                        Previous Scene
                    </Button>
                    <Button className='Button' onClick={changeScene}>
                        Next Scene
                    </Button>
                </div>
            </footer>
        </div>
    )
}

export default App
