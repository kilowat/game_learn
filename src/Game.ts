import { DisplayMode, Engine, EngineOptions, Loader, SolverStrategy, vec } from "excalibur";
import { GameState } from "states/GameState";
import { loader, Resources } from "utils/resources";

const gameOptions: EngineOptions = {
    width: 400,
    height: 400,
    suppressPlayButton: true,
    displayMode: DisplayMode.FitScreen,
    physics: {
        solver: SolverStrategy.Arcade,
        gravity: vec(0, 50),
    },
};

class Game extends Engine {
    public readonly gamseState: GameState;
    public readonly reasources = Resources;

    constructor(gameState: GameState) {
        super(gameOptions);
        this.gamseState = gameState;
    }

    async start() {

        await loader.load()
        super.start();
    }
}