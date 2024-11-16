import { DisplayMode, Engine, EngineOptions, Loader, SolverStrategy, vec } from "excalibur";
import { GameState } from "states/GameState";
import { loader } from "utils/resources";

export class Game extends Engine {
    public readonly gamseState: GameState;

    constructor(gameOptions: EngineOptions, gameState: GameState) {
        super(gameOptions);
        this.gamseState = gameState;
    }

    async start() {

        await loader.load()
        super.start();
    }
}