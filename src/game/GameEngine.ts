import { renderCanvas } from "./GameRender.ts";
import { loopScene } from "./GameLoop.ts";

export type Game = {
  ctx: CanvasRenderingContext2D;
  // initialize: () => void;
  renderCanvas: (ctx: CanvasRenderingContext2D) => boolean;
  loopScene: { runScene: () => boolean };
};

function Game(ctx: CanvasRenderingContext2D): Game {
  return {
    ctx,
    renderCanvas: (ctx) => renderCanvas(ctx),
    loopScene: loopScene(),
  };
}

const createGame = Game;
export { createGame };
