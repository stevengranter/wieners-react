// ReactCanvasOverlay.tsx

import styles from "./ReactCanvasOverlay.module.css";

import { PropsWithChildren, useEffect } from "react";
import { useGame } from "../context/GameContext.ts";

let didInit = false;
function ReactCanvasOverlay({ children }: PropsWithChildren) {
  const game = useGame();
  // const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  // const handleGameOver = () => {
  //   console.log("Game Over!");
  // };

  useEffect(() => {
    if (!didInit) {
      if (game) {
        const { ctx, renderCanvas } = game;
        setContext(ctx);
        console.log("Canvas context initialized");
        renderCanvas(ctx);
        didInit = true;
      } else {
        console.log("Waiting on canvas context2D...");
      }
    }
  }, [game]);

  return (
    <div id={styles["canvas-overlay"]}>
      {children ? <>{children}</> : <p>#canvas-overlay is empty</p>}
    </div>
  );
}

export default ReactCanvasOverlay;
