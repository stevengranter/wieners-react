// TitleScreen.tsx
import logo from "../assets/images/ui/wfh-logo.webp";

import styles from "./TitleScreen.module.css";
function TitleScreen() {
  function handleStart() {
    console.log("Starting game...");
  }
  return (
    <div className="canvas-overlay-container" id={styles["title-screen"]}>
      <img src={logo} alt="Wieners from Heaven Logo" />
      <StartButton handleStart={handleStart} />
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
