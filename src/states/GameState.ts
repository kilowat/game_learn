export class GameState {
    private _score: number;

    constructor({ score = 0 } = {}) {
        this._score = score;
    }

    public get score() {
        return this._score
    }
}