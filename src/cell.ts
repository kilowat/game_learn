import { Actor, CollisionType, Color, Engine, ExcaliburGraphicsContext, GraphicsGroup, vec } from "excalibur";
import { Resources } from "resources";

export type CellType = 'empty' | 'flower' | 'chicken' | 'cow';

export interface CellOptions {
    x: number,
    y: number,
    type?: CellType,
}

export class Cell extends Actor {

    private _type!: CellType;

    public get type(): CellType {
        return this._type;
    }
    public set type(value: CellType) {
        this.onTypeChanged(value, this._type);
        this._type = value;

    }
    public isSelected = false;

    constructor({ x, y, type = 'empty' }: CellOptions) {
        super({
            pos: vec(x, y),

        })
        this._type = type;
    }

    onInitialize(engine: Engine): void {
        this.pointer.useGraphicsBounds = true;
        const sprite = Resources.staticSpriteSheet.getSprite('grass.png');
        this.graphics.use(sprite)
        this.graphics.onPostDraw = (ctx: ExcaliburGraphicsContext) => {
            ctx.save();
            ctx.opacity = this.isSelected ? 0.4 : 0;
            ctx.drawRectangle(vec(-25, -25), 50, 50, Color.Red)
            ctx.restore();
        }

    }
    private onTypeChanged(value: CellType, oldValue: CellType) {
        if (this.type != 'empty') return;

        const grass = this.graphics.current!;

        const chicken = this.graphics.use(Resources.staticSpriteSheet.getSprite('chicken-000.png'));
        const group = new GraphicsGroup({
            useAnchor: true, // position group from the top left
            members: [
                {
                    graphic: grass,
                    offset: vec(0, 0)
                },
                {
                    graphic: chicken,
                    offset: vec(4, 4)
                }
            ],
        })
        this.graphics.use(group)
    }
    canTypeChange(value: CellType) {
        console.log(this.type, value)
        return this.type != value;
    }

}

