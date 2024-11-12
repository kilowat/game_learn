import { Actor, CollisionType, Color, Engine, ExcaliburGraphicsContext, Graphic, GraphicsGroup, ImageSource, Rectangle, Sprite, SpriteSheet, vec, Animation, range, } from "excalibur";
import { Resources } from "resources";

export type CellType = 'empty' | 'flower' | 'chicken' | 'cow';

export interface CellOptions {
    x: number,
    y: number,
    type?: CellType,
}

export class FarmGridCell extends Actor {
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
            width: 10,
            height: 10,
            collisionType: CollisionType.Fixed,
            pos: vec(x, y),
        })
        this._type = type;
    }

    onInitialize(engine: Engine): void {
        this.setAnimations();
        const group = this.getAnimation();
        this.graphics.use(group)
    }
    private onTypeChanged(value: CellType, oldValue: CellType) {
        if (this.type != 'empty') return;

        this.graphics.use(value);
    }

    private getAnimation(value: CellType = 'empty') {
        const chickenSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.chickenSpirtSheet,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 32,
                spriteHeight: 32,
            }
        });

        const chickenAnimation = Animation.fromSpriteSheet(chickenSpriteSheet, range(1, 4), 100);

        const grass = Resources.staticSpriteSheet.getSprite('grass.png');

        return new GraphicsGroup({
            useAnchor: true, // position group from the top left
            members: [
                {
                    graphic: grass,
                    offset: vec(0, 0)
                },
                {
                    graphic: chickenAnimation,
                    offset: vec(4, 4)
                },
            ]
        })
    }

    private setAnimations() {
        const empty = this.getAnimation('empty');
        const chicken = this.getAnimation('chicken');

        this.graphics.add('empty', empty)
        this.graphics.add('chicken', chicken)

        this.graphics.onPostDraw = (ctx: ExcaliburGraphicsContext) => {
            ctx.save();
            ctx.opacity = this.isSelected ? 0.4 : 0;
            ctx.drawRectangle(vec(-25, -25), 50, 50, Color.Blue)
            ctx.restore();
        }
    }
}

