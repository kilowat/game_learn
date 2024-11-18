import { DisplayMode, Engine, Loadable, Loader, SolverStrategy, vec } from "excalibur";
import { FermaScene } from "scenes/FermaScene";


export class Game extends Engine {
    constructor() {
        super({
            width: 400,
            height: 400,
            suppressPlayButton: true,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: vec(0, 50),
            },
        })
    }

    async start() {
        const fermaScene = new FermaScene();
        this.addScene('ferma', fermaScene);
        const loader = new Loader();

        await super.start(loader);
        this.goToScene('ferma');
    }

    onInitialize(engine: Engine): void {
        console.log('game started')
    }
}

async function wait(stallTime = 3000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}

export class GameModel { }