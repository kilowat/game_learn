
import { WorldMap } from "scenes/worldMap";
import { Resources, loader } from "./resources";
import { Actor, CollisionType, Color, Engine, FadeInOut } from "excalibur";

const game = new Engine(
    {
        width: 512,
        height: 512,
        suppressPlayButton: true,
        scenes: {
            worldMap: {
                scene: WorldMap,
                transitions: {
                    out: new FadeInOut({ direction: 'out', duration: 1000, color: Color.Black }),
                    in: new FadeInOut({ direction: 'in', duration: 1000, color: Color.Black })
                }
            }
        }
    }
);


const inTransition = new FadeInOut({
    duration: 1000,
    direction: 'in',
    color: Color.ExcaliburBlue
});

game.start('worldMap', {
    loader,
    inTransition
})

