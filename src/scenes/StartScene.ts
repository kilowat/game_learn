import { Engine, Actor, EventEmitter, GameEvent, Scene, ScreenElement, Text, vec, Color, Entity, SceneActivationContext } from "excalibur";
import { Game } from "Game";
import bg from '../assets/bg.svg'
import { FermaScene } from "./FermaScene";

const ui = document.getElementById('ui')!;

export class StartScene extends Scene {
    static route = 'start';

    onActivate(context: SceneActivationContext<unknown>): void {
        const bgEl = document.createElement('div');
        bgEl.className = 'bg';
        bgEl.innerHTML = bg;
        ui.appendChild(bgEl)
        const mainMenu = document.createElement('div');
        mainMenu.className = 'main-menu';

        const btnStart = document.createElement('button');
        btnStart.onclick = (e) => {
            e.preventDefault()
            this.engine.goToScene(FermaScene.route);
        }

        btnStart.className = 'button button--start';
        btnStart.innerText = "Start game";
        mainMenu.appendChild(btnStart);
        ui.appendChild(mainMenu);

    }

    onDeactivate(context: SceneActivationContext): void {
        ui.innerHTML = ''
    }

    onInitialize(engine: Engine): void {
        const uiText = new UIGameInfo();
        this.add(uiText);
    }
}


class UIGameInfo extends ScreenElement {
    onInitialize(game: Game): void {
        const textRow = new TextRow('0');
        this.addChild(textRow)

        game.model.on('scoreChanged', (event) => {
            textRow.text = event.value.toString();
        })

    }

    update(game: Game, delta: number): void {

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
        this._textElem.text = value;
    }
    onInitialize(game: Game): void {
        this._textElem = new Text({ text: this._content });
        this.graphics.use(this._textElem);
    }
}

