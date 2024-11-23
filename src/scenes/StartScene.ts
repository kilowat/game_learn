import { Engine, Actor, EventEmitter, GameEvent, Scene, ScreenElement, Text, vec, Color, Entity } from "excalibur";
import { Game } from "Game";
import { GameModel } from "models/GameModel";



export class StartScene extends Scene {
    static route = 'start';

    onInitialize(engine: Engine): void {
        const uiText = new UIGameInfo();
        this.add(uiText);
        this.add(uiText)
    }
}


class UIGameInfo extends ScreenElement {

    private _gameModel!: GameModel;

    onInitialize(game: Game): void {
        this._gameModel = game.model;
        const textRow = new TextRow(this._gameModel.score.toString());
        this.addChild(textRow)
    }

    update(engine: Engine, delta: number): void {
        this._gameModel.score++;
    }
}

class TextRow extends ScreenElement {
    private _textElem!: Text;
    private _content: string

    constructor(private content: string) {
        super()
        this._content = content;
    }

    set text(value: string) {
        this._textElem.text = this.text;
    }
    onInitialize(game: Game): void {
        this._textElem = new Text({ text: this._content });
        this.graphics.use(this._textElem);
    }
}

