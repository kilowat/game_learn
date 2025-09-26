import { Color, Engine, vec, Text, ScreenElement, EventEmitter, Rectangle } from "excalibur";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { chikenIcon } from "resources";


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

type TileState = 'idle' | 'hovered' | 'clicked';

export class FarmCell extends ScreenElement {
    private rect: Rectangle;
    public events = new EventEmitter<TileEvents & ActorEvents>();
    private _state: TileState = 'idle';
    private _suppressLeaveUntil = 0;

    constructor(opts: { x: number; y: number; w: number; h: number }) {
        super({ ...opts, color: Color.Red });

        this.rect = new Rectangle({
            width: opts.w,
            height: opts.h,
            color: Color.Red
        });

        this.graphics.use(this.rect);
    }

    setColor(color: Color) {
        this.rect.color = color;
    }

    onInitialize(): void {
        this.on('pointerenter', () => {
            if (this._state === 'idle') {
                this._state = 'hovered';
                this.setHover();
                this.events.emit('hover', this);
            }
        });

        this.on('pointerup', () => {
            if (this._state === 'hovered') {
                this.events.emit('click', this);
                // Подавляем leave на пару кадров
                this._suppressLeaveUntil = performance.now() + 1;
            }
        });

        this.on('pointerleave', () => {
            if (performance.now() < this._suppressLeaveUntil) {
                // это фантомный leave → игнорим
                return;
            }
            if (this._state !== 'idle') {
                this._state = 'idle';
                this.removeHover()
                this.events.emit('leave', this);
            }
        });
    }

    setHover() {
        const color = Color.fromRGB(0, 0, 255, 0.1);
        this.setColor(color);
    }

    removeHover() {
        const color = Color.Red;
        this.setColor(color);
    }
}
