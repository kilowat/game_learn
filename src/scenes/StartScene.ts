import { Engine, Actor, EventEmitter, GameEvent, Scene, ScreenElement, Text, vec, Color } from "excalibur";
import { Game } from "Game";
import { GameModel } from "models/GameModel";



export class StartScene extends Scene {
    static route = 'start';

    onInitialize(engine: Engine): void {
        const uiText = new UIGameTextInfo();
        this.add(uiText)
    }
}

class UIGameTextInfo extends ScreenElement {
    private _text!: Text;
    private _gameModel!: GameModel;

    onInitialize(game: Game): void {
        this._gameModel = game.model;
        this._text = new Text({ text: 'Start scene' });
        this.graphics.use(this._text);
        this.on('pointerdown', (event) => {
            this._text.text = '1'
            console.log('taps')
        })
    }
}

