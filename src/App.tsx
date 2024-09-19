import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { MainMenu } from "./game/scenes/MainMenu";

function App() {
    // The sprite can only be moved in the MainMenu Scene
    // const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    // const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const changeScene = () => {
        if (phaserRef.current) {
            const scene = phaserRef.current.scene as MainMenu;

            if (scene) {
                scene.changeScene();
            }
        }
    };

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        console.log(scene);
        // setCanMoveSprite(scene.scene.key !== 'MainMenu');
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <footer>
                <div id="nav-buttons">
                    <button className="button" onClick={changeScene}>
                        Previous Scene
                    </button>
                    <button className="button" onClick={changeScene}>
                        Next Scene
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default App;
