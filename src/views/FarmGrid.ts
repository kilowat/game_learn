import { Actor, Color, Engine, vec, Text, ScreenElement, EventEmitter } from "excalibur";
import { ActorEvents } from "excalibur/build/dist/Actor";

type TileState = 'idle' | 'hovered' | 'clicked';

type TileEvents = {
    hover: FarmCell;
    leave: FarmCell;
    click: FarmCell;
};

type TileEventCallback = <K extends keyof TileEvents>(event: K, cell: TileEvents[K]) => void;


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

    onTileEvent?: TileEventCallback;

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

                cell.on("hover", () => this.onTileEvent?.("hover", cell));
                cell.on("click", () => this.onTileEvent?.("click", cell));
                cell.on("leave", () => this.onTileEvent?.("leave", cell));

                this._cells.push(cell);
                this.addChild(cell);
            }
        }
    }
}

export class FarmCell extends ScreenElement {
    public events = new EventEmitter<TileEvents & ActorEvents>();

    constructor({ x = 0, y = 0, w = 0, h = 0 }) {
        super({
            x: x,
            y: y,
            width: w,
            height: h,
            color: Color.Red
        })
    }

    onInitialize(): void {
        this.on("pointerenter", () => {
            this.events.emit("hover", this);
        });

        this.on("pointerup", () => {
            this.events.emit("click", this);
        });

        this.on("pointerleave", () => {
            this.events.emit("leave", this);
        });
    }
}