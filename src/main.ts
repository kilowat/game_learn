
import { loader } from "./utils/resources";
import { Color, DisplayMode, Engine, FadeInOut, SolverStrategy, vec } from "excalibur";
import { FermaScene } from "./scenes/FermaScene";
import { Game } from "Game";


const inTransition = new FadeInOut({
    duration: 500,
    direction: 'in',
    color: Color.ExcaliburBlue
});


const game = new Engine(
    {
        width: 400,
        height: 400,
        suppressPlayButton: true,
        displayMode: DisplayMode.FitScreen,
        physics: {
            solver: SolverStrategy.Arcade,
            gravity: vec(0, 50),
        },
        scenes: {
            ferma: {
                scene: FermaScene,
            }
        }
    }
);





game.start('ferma', {
    loader,
    inTransition,
})
