import { EventEmitter } from "excalibur";
import { ModelHandlerArguemnts } from "type";

type GameModelEvents = {
    'scoreChanged': ModelHandlerArguemnts<number>
}

export class GameModel extends EventEmitter<GameModelEvents> {
    private _score = 0;

    public get score() {
        return this._score;
    }

    public set score(value: number) {
        const oldValue = this._score;
        this._score = value;
        this.emit('scoreChanged', { value, oldValue });
    }
}