
import { Resources, loader } from "./resources";
import { Actor, CollisionType, Color, Engine, FadeInOut, SolverStrategy, vec } from "excalibur";
import { BoardScene } from "board";

const game = new Engine(
    {
        width: 512,
        height: 512,
        suppressPlayButton: true,
        physics: {
            solver: SolverStrategy.Arcade,
            gravity: vec(0, 50),
        },
        scenes: {
            board: {
                scene: BoardScene,
            }
        }
    }
);


const inTransition = new FadeInOut({
    duration: 500,
    direction: 'in',
    color: Color.ExcaliburBlue
});

game.start('board', {
    loader,
    inTransition,
})

