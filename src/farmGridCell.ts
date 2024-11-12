import { Actor, CollisionType, Color, Engine, ExcaliburGraphicsContext, vec, } from "excalibur";
import { Resources } from "resources";

export type CellType = 'empty' | 'flower' | 'chicken' | 'cow';

export interface CellOptions {
    x: number,
    y: number,
    type?: CellType,
}

export class FarmGridCell extends Actor {
    private _type!: CellType;
    private _slot!: SlotIcon;

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
            width: 10,
            height: 10,
            collisionType: CollisionType.Fixed,
            pos: vec(x, y),
        })
        this._type = type;
    }

    onInitialize(engine: Engine): void {
        const grass = Resources.staticSpriteSheet.getSprite('grass.png');
        this.graphics.use(grass);
        this.graphics.onPostDraw = (ctx: ExcaliburGraphicsContext) => {
            ctx.save();
            ctx.opacity = this.isSelected ? 0.4 : 0;
            ctx.drawRectangle(vec(-25, -25), 50, 50, Color.Blue)
            ctx.restore();
        }

        this._slot = new SlotIcon();
        this.addChild(this._slot);
    }


    private onTypeChanged(value: CellType, oldValue: CellType) {
        if (this.type != 'empty') return;
    }

}


class SlotIcon extends Actor {
    onInitialize(engine: Engine): void {
        const chicken = Resources.staticSpriteSheet.getSprite('chicken-mask.png');
        const cow = Resources.staticSpriteSheet.getSprite('cow-mask.png');
        const flower = Resources.staticSpriteSheet.getSprite('corn-mask.png');

        this.graphics.add('chicken', chicken);
        this.graphics.add('cow', cow)
        this.graphics.add('flower', flower)

        this.graphics.use('chicken');
    }
}