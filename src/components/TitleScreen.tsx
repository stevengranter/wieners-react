// TitleScreen.tsx
import logo from "../assets/images/ui/wfh-logo.webp";
import { ReactElement, useState } from "react";

import styles from "./TitleScreen.module.css";
import CharacterPopup from "./CharacterPopup.tsx";
function TitleScreen() {
  const [gotoNext, setGotoNext] = useState<ReactElement | null>(null);
  function handleStart() {
    console.log("Starting game...");
    setGotoNext(<CharacterPopup />);
  }
  return (
    <div className="canvas-overlay-container" id={styles["title-screen"]}>
      <img src={logo} alt="Wieners from Heaven Logo" />
      <StartButton handleStart={handleStart} />
      {gotoNext}
    </div>
  );
}

function StartButton({ handleStart }: { handleStart: () => void }) {
  return (
    <button id={styles["start-button"]} onClick={handleStart}>
      <h2>Start</h2>
    </button>
  );
}

export default TitleScreen;
