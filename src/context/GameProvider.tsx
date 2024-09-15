import React, { ReactNode, useEffect, useRef, useState } from "react";

import styles from "./GameProvider.module.css";
import { createGame, type Game } from "../game/GameEngine.ts";
import { GameContext } from "./GameContext.ts";

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameEngine, setGameEngine] = useState<Game | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");
      console.log(`Canvas context initialized`);
      if (!canvasContext) {
        throw new Error("Could not get context from canvas element");
      }
      const gameEngineInstance = createGame(canvasContext);
      setGameEngine(gameEngineInstance);
    } else {
      console.log("Canvas element not found!");
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
};

export { GameProvider };
