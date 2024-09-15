import { createContext, useContext } from "react";
import type { Game } from "../game/GameEngine.ts";

export const GameContext = createContext<Game | null>(null);
const useGame = () => useContext(GameContext);
export { useGame };
