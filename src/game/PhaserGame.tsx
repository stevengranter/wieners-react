import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import UiOverlay from "../ui/UiOverlay.tsx";
import DebugPanel from "../ui/DebugPanel.tsx";

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
    function PhaserGame({ currentActiveScene }, ref) {
        const game = useRef<Phaser.Game | null>(null!);

        useLayoutEffect(() => {
            if (game.current === null) {
                game.current = StartGame("game-container");

                if (typeof ref === "function") {
                    ref({ game: game.current, scene: null });
                } else if (ref) {
                    ref.current = { game: game.current, scene: null };
                }
            }

            return () => {
                if (game.current) {
                    game.current.destroy(true);
                    if (game.current !== null) {
                        game.current = null;
                    }
                }
            };
        }, [ref]);

        useEffect(() => {
            EventBus.on(
                "current-scene-ready",
                (scene_instance: Phaser.Scene) => {
                    if (
                        currentActiveScene &&
                        typeof currentActiveScene === "function"
                    ) {
                        currentActiveScene(scene_instance);
                    }

                    if (typeof ref === "function") {
                        ref({ game: game.current, scene: scene_instance });
                    } else if (ref) {
                        ref.current = {
                            game: game.current,
                            scene: scene_instance,
                        };
                    }
                },
            );
            return () => {
                EventBus.removeListener("current-scene-ready");
            };
        }, [currentActiveScene, ref]);

        useEffect(() => {
            EventBus.on("player-health-update", (value: integer) => {
                console.log(`Event: player-health-update: ${value}`);
            });
            return () => {
                EventBus.removeListener("player-health-update");
            };
        }, [currentActiveScene, ref]);

        useEffect(() => {
            EventBus.on("player-score-update", (value: integer) => {
                console.log(`Event: player-score-update: ${value}`);
            });
            return () => {
                EventBus.removeListener("player-score-update");
            };
        }, [currentActiveScene, ref]);

        return (
            <>
                <div id="game-container">
                    <UiOverlay />
                </div>
                <DebugPanel game={game} />
            </>
        );
    },
);
