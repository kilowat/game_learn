import { Game } from "Game";
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
    enter(game: Game): void {
        game.goToScene(StartScene.route);
        console.log('started')
    }
    update(delta: number): void {

    }
    exit(): void {

    }
}

export class PlayingGameState implements GameState {
    enter(game: Game): void {

    }
    update(delta: number): void {

    }
    exit(): void {

    }
}
