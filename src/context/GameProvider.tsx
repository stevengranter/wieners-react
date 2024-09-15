import { ReactNode, useEffect, useRef, useState } from "react";

import styles from "./GameProvider.module.css";
import { createGame, type Game } from "../game/GameEngine.ts";
import { GameContext } from "./GameContext.ts";

// enum GameStates {
//   PAUSED = "PAUSED",
//   GAMEOVER = "GAMEOVER",
//   CUTSCENE = "CUTSCENE",
//   TITLE = "TITLE",
//   ENDSCENE = "ENDSCENE",
// }

let didInit = false;

function GameProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameEngine, setGameEngine] = useState<Game | null>(null);
  // const [gameState, setGameState] = useState<null | GameStates>(null);

  useEffect(() => {
    if (canvasRef.current) {
      if (!didInit) {
        didInit = true;
        const canvasContext = canvasRef.current.getContext("2d");

        if (!canvasContext) {
          throw new Error("Could not get context from canvas element");
        }
        const gameEngineInstance = createGame(canvasContext);
        setGameEngine(gameEngineInstance);
        // setGameState(GameStates.TITLE);
      } else {
        console.log("%c✅ GameProvider initialized", "color:green");
      }
    }
  }, []);

  return (
    <GameContext.Provider value={gameEngine}>
      <canvas
        ref={canvasRef}
        id={styles["game-canvas"]}
        width="640"
        height="480"
      ></canvas>
      {children}
    </GameContext.Provider>
  );
}

export { GameProvider };
