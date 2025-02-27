import { useEffect, useState } from "react";

export default function DebugPanel({ game }) {
    const [phaserGame, setPhaserGame] = useState(game);
    useEffect(() => {
        console.log(game);
    }, [game]);
    console.log(phaserGame);
    return <div id="debug-panel">player.x </div>;
}
