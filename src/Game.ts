
import { DisplayMode, Engine, EngineOptions, EventEmitter, GameEvent, Input, Loadable, Loader, PointerScope, SolverStrategy, vec } from "excalibur";
import { GameModel } from "models/GameModel";
import { FermaScene } from "scenes/FermaScene";
import { StartScene } from "scenes/StartScene";
import { GameState, InitGameState, StartState } from "states/GameState";

const gameOptions: EngineOptions = {

    suppressPlayButton: true,
    displayMode: DisplayMode.FillScreen,
    canvasElementId: 'game',
    pointerScope: PointerScope.Canvas,
    physics: {
        solver: SolverStrategy.Arcade,
        gravity: vec(0, 50),
    },
    scenes: {
        [FermaScene.route]: FermaScene,
        [StartScene.route]: StartScene,
    }
};


export class Game extends Engine {
    private _currentState: GameState = new InitGameState();
    private _model: GameModel = new GameModel();

    constructor() {
        super(gameOptions)
    }

    public scoreUp(value: number) {
        this._model.score += value;
    }

    public get model() {
        return this._model;
    }

    public get state() {
        return this._currentState;
    }

    public set state(state: GameState) {
        this._currentState.exit();
        this._currentState = state;
        this._currentState.enter(this);
    }


    async start() {
        await super.start();
        this.state = new StartState();
    }

    onPreUpdate(engine: Engine, delta: number): void {
        this.state.update(delta);
    }
}

export const game = new Game();

game.start();