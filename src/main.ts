
import { Resources, loader } from "./resources";
import { Actor, CollisionType, Color, DisplayMode, Engine, FadeInOut, SolverStrategy, vec } from "excalibur";
import { FermaScene } from "fermaScene";

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

const inTransition = new FadeInOut({
    duration: 500,
    direction: 'in',
    color: Color.ExcaliburBlue
});

game.start('ferma', {
    loader,
    inTransition,
})

