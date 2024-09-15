import "./App.css";
import { GameProvider } from "./context/Game.tsx";
import ReactCanvasOverlay from "./components/ReactCanvasOverlay.tsx";

function App() {
  return (
    <>
      <GameProvider>
        <ReactCanvasOverlay />
      </GameProvider>
    </>
  );
}

export default App;
