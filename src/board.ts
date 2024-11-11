import { Cell } from "cell";
import { Actor, Color, Engine, vec, Text, ScreenElement } from "excalibur";

export class Board extends Actor {
    private _selected: Cell | null = null;
    private clicked: Cell | null = null;
    private text!: Text;

    get selected(): Cell | null {
        return this._selected;
    }

    set selected(value: Cell | null) {
        if (this._selected) {
            this.onUnSelected(this._selected);
        }
        this._selected = value;
        if (value) {
            this.onSelected(value);
        }
    }

    constructor() {
        super()
    }
    onInitialize(engine: Engine): void {
        this.text = new Text(
            {
                text: '',
            }
        );
        const element = new ScreenElement({ pos: vec(10, 10), z: 1 });
        element.graphics.use(this.text)
        engine.add(element);

        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                const x = i * 44;
                const y = j * 44;
                const actor = new Cell({ x, y });
                actor.on('pointerenter', () => {
                    this.onHover(actor)
                })
                actor.on('pointerleave', () => {
                    this.onLeave(actor)
                })
                actor.on('pointerdown', () => {
                    this.onClicked(actor)
                })
                actor.on('pointerup', () => {
                    this.clicked = actor;
                })
                actor.on('pointermove', () => {
                    this.onMove(actor)
                })
                this.addChild(actor);
            }
        }
    }

    private onHover(actor: Cell) {
        this.selected = actor;
    }

    private onLeave(actor: Cell) {
        if (this.clicked && this.clicked === actor) {
            this.clicked = null;
            return;
        }
        this.selected = null;
    }

    private onMove(actor: Cell) {
        if (!this._selected) {
            this.selected = actor;
        }
    }

    private onClicked(value: Cell) {
        this.clicked = value;
        value.type = 'chicken'
    }

    private onSelected(value: Cell) {
        this.text.text = value.id.toString();
        console.log(value)
        value.isSelected = true;
    }

    private onUnSelected(value: Cell) {
        this.text.text = 'empty'
        value.isSelected = false;
    }
}