type GameRender = boolean;

function GameRender(ctx: CanvasRenderingContext2D): GameRender {
  if (!ctx) return false;
  ctx.fillStyle = "rgba(255, 0, 255, 1)"; // default colour is bright magenta to indicate nothing being rendererd
  ctx.fillRect(0, 0, 640, 480);
  return true;
  // setTimeout(onGameOver, 5000); // Call the callback after 5 seconds
}

const renderCanvas = GameRender;
export { renderCanvas };
