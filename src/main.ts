import { DisplayMode, Engine, EngineOptions, SolverStrategy, vec } from "excalibur";
import { FermaScene } from "scenes/FermaScene";
import { GameState } from "states/GameState";
import { loader } from "utils/resources";

const gameState = new GameState();
const gameOptions: EngineOptions = {
    width: 400,
    height: 400,
    suppressPlayButton: true,
    displayMode: DisplayMode.FitScreen,
    physics: {
        solver: SolverStrategy.Arcade,
        gravity: vec(0, 50),
    },
    scenes: {
        ferma: new FermaScene(gameState)
    }
};


const game = new Engine(gameOptions);
game.start(loader).then(() => {
    game.goToScene('ferma');
});