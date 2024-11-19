import { DisplayMode, Engine, Loadable, Loader, SolverStrategy, vec } from "excalibur";
import { FermaScene } from "scenes/FermaScene";
import { MenuScene } from "scenes/MenuScene";

const game = new Engine({
    width: 400,
    height: 400,
    suppressPlayButton: true,
    displayMode: DisplayMode.FitScreen,
    physics: {
        solver: SolverStrategy.Arcade,
        gravity: vec(0, 50),
    },
    scenes: {
        ferma: FermaScene,
        menu: MenuScene,
    }
});



game.start('menu').then(() => {
    console.log('GameStarted');
})