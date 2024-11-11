import { Actor, CollisionType, Color, Engine, ExcaliburGraphicsContext, vec } from "excalibur";
import { Resources } from "resources";

export type CellType = 'emtpy' | 'flower' | 'chicken' | 'cow';

export interface CellOptions {
    x: number,
    y: number,
    type?: CellType,
}

export class Cell extends Actor {
    public type!: CellType;
    public isSelected = false;

    constructor({ x, y, type = 'emtpy' }: CellOptions) {
        super({
            pos: vec(x, y),

        })
        this.type = type;
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
}