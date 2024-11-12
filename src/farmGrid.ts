import { FarmGridCell } from "farmGridCell";
import { Actor, Color, Engine, vec, Text, ScreenElement } from "excalibur";

export class FarmGrid extends Actor {
    private _selected: FarmGridCell | null = null;
    private clicked: FarmGridCell | null = null;
    private text!: Text;

    get selected(): FarmGridCell | null {
        return this._selected;
    }

    set selected(value: FarmGridCell | null) {
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
        this.text = new Text({ text: '', });
        const element = new ScreenElement({ pos: vec(10, 10), z: 1 });
        element.graphics.use(this.text)
        engine.add(element);

        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                const x = i * 44;
                const y = j * 44;
                const cell = this.createCell(x, y);
                this.addChild(cell);
            }
        }
    }

    private createCell(x: number, y: number) {
        const actor = new FarmGridCell({ x, y });
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
        return actor;
    }

    private onHover(actor: FarmGridCell) {
        this.selected = actor;
    }

    private onLeave(actor: FarmGridCell) {
        if (this.clicked && this.clicked === actor) {
            this.clicked = null;
            return;
        }
        this.selected = null;
    }

    private onMove(actor: FarmGridCell) {
        if (!this._selected) {
            this.selected = actor;
        }
    }

    private onClicked(value: FarmGridCell) {
        this.clicked = value;
        value.type = 'chicken'
    }

    private onSelected(value: FarmGridCell) {
        this.text.text = value.id.toString();
        value.isSelected = true;
    }

    private onUnSelected(value: FarmGridCell) {
        this.text.text = 'empty'
        value.isSelected = false;
    }
}