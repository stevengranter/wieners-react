import "./HUD.css";

export default function HUD({
    health,
    score,
}: {
    health: integer;
    score: integer;
}) {
    return (
        <div id="game-screen__ingame-overlay__hud" data-ui="true">
            <div className="hud-left">
                <div id="hud-player-stats">
                    <div id="hud-lives">
                        <img
                            src="/assets/images/ui/nan-portrait-pixel-01.png"
                            alt=""
                            className="pixelated"
                        />
                        <div id="lives"></div>
                    </div>
                    <div id="hud-health-meter">
                        <span id="health" style={{ width: health }}></span>
                    </div>
                </div>

                <div id="hud-score-stats">
                    <div id="score">{score}</div>
                    <div id="current-ranking"></div>
                    <div id="score-remaining" data-ui="true"></div>
                </div>

                <div id="hud-combo" data-ui="true">
                    <span>C</span>
                    <span>O</span>
                    <span>M</span>
                    <span>B</span>
                    <span>O</span>
                </div>

                <div id="wieners-collected" data-ui="true"></div>
            </div>

            <div id="hud-scene-stats" className="hud-right">
                <div id="time-remaining" data-ui="true"></div>
            </div>
        </div>
    );
}
