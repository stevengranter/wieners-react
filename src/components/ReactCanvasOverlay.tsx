// TitleScreen.tsx

import styles from "./ReactCanvasOverlay.module.css";

import { useEffect } from "react";
import { useGame } from "../context/Game.tsx";

function ReactCanvasOverlay() {
  const game = useGame();
  console.log(game);

  // const handleGameOver = () => {
  //   console.log("Game Over!");
  // };

  useEffect(() => {
    if (game) {
      const { ctx, renderCanvas } = game;
      console.log("This is TitleScreen");
      renderCanvas(ctx);
    } else {
      console.warn("Waiting on game context...");
    }
  }, [game]);

  return (
    <div id={styles["canvas-overlay"]}>
      <h1>React Canvas Overlay</h1>
    </div>
  );
}

export default ReactCanvasOverlay;
