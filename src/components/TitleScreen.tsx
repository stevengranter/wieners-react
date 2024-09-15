// TitleScreen.tsx
import logo from "../assets/images/ui/wfh-logo.webp";

import styles from "./TitleScreen.module.css";
function TitleScreen() {
  return (
    <div className="canvas-overlay-container" id={styles["title-screen"]}>
      <img src={logo} alt="Wieners from Heaven Logo" />
      <StartButton />
    </div>
  );
}

function StartButton() {
  function handleStart() {
    console.log("Starting game...");
  }
  return (
    <button id={styles["start-button"]} onClick={handleStart}>
      <h2>Start</h2>
    </button>
  );
}

export default TitleScreen;
