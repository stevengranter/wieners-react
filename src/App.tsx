import "./App.css";
import { GameProvider } from "./context/GameProvider.tsx";
import TitleScreen from "./components/TitleScreen.tsx";
import ReactCanvasOverlay from "./components/ReactCanvasOverlay.tsx";

function App() {
  return (
    <>
      <GameProvider>
        <ReactCanvasOverlay>
          <TitleScreen />
        </ReactCanvasOverlay>
      </GameProvider>
    </>
  );
}

export default App;
