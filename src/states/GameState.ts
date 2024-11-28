import { Game } from "Game";
import { FermaScene } from "scenes/FermaScene";
import { StartScene } from "scenes/StartScene";

export interface GameState {
    enter(game: Game): void;
    update(delta: number): void;
    exit(): void;
}

export class InitGameState implements GameState {
    enter(game: Game): void {

    }
    update(delta: number): void {

    }
    exit(): void {

    }
}

export class StartState implements GameState {
    private _game!: Game;
    enter(game: Game): void {
        this._game = game;
        game.goToScene(FermaScene.route);
        console.log('started state')
    }
    update(delta: number): void {

        if (this._game.currentSceneName !== StartScene.route) {
            this._game.state = new PlayingGameState();
        }
    }
    exit(): void {

    }
}

export class PlayingGameState implements GameState {
    enter(game: Game): void {
        console.log('play state')
    }
    update(delta: number): void {

    }
    exit(): void {

    }
}
