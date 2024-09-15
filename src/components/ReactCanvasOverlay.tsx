// ReactCanvasOverlay.tsx

import styles from "./ReactCanvasOverlay.module.css";

import { PropsWithChildren, useEffect } from "react";
import { useGame } from "../context/GameContext.ts";

function ReactCanvasOverlay({ children }: PropsWithChildren) {
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
      {children ? <>{children}</> : <p>#canvas-overlay is empty</p>}
    </div>
  );
}

export default ReactCanvasOverlay;
