import { EventBus } from "../game/EventBus.ts";
import { useEffect, useState } from "react";
import HUD from "./HUD.tsx";

export default function UiOverlay() {
    const [health, setHealth] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        EventBus.on("player-health-update", (value: integer) => {
            setHealth(() => value);
        });
        return () => {
            EventBus.removeListener("player-health-update");
        };
    }, []);

    useEffect(() => {
        EventBus.on("player-score-update", (value: integer) => {
            setScore(() => value);
            console.log();
        });
        return () => {
            EventBus.removeListener("player-score-update");
        };
    }, []);

    return (
        <div id="game-container_overlay">
            <HUD health={health} score={score} />
        </div>
    );
}
