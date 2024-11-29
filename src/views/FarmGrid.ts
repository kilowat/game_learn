import { Actor, Color, Engine, vec, Text, ScreenElement } from "excalibur";

export class FarmGrid extends ScreenElement {
    private w = 60;
    private h = 60;
    private gap = 4;
    private count = 8
    private _cells: FarmCell[] = [];
    private gridWidth: number = 0;
    private gridHeight: number = 0;

    constructor() {
        super({
        })
    }

    onInitialize(engine: Engine): void {
        this.on('pointerdown', (e) => { console.log(e) })
        this.gridWidth = (this.count * this.w) + ((this.count - 1) * this.gap);
        this.gridHeight = (this.count * this.h) + ((this.count - 1) * this.gap);

        this.pos = vec(
            (engine.drawWidth - this.gridWidth) / 2,
            (engine.drawHeight - this.gridHeight) / 2
        );

        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                const cell = new FarmCell({
                    x: i * (this.w + this.gap),
                    y: j * (this.h + this.gap),
                    w: this.w,
                    h: this.h
                });
                cell.on('pointerenter', (e) => {
                    cell.color = Color.Blue;
                    console.log(e)
                })
                this._cells.push(cell);
                this.addChild(cell);
            }
        }
    }
}

class FarmCell extends ScreenElement {
    constructor({ x = 0, y = 0, w = 0, h = 0 }) {
        super({
            x: x,
            y: y,
            width: w,
            height: h,
            color: Color.Red
        })
    }
}