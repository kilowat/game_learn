import { Board } from "board";
import { Actor, CollisionType, Color, Engine, ExcaliburGraphicsContext, Graphic, GraphicsGroup, ImageSource, Rectangle, Sprite, vec } from "excalibur";
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
            width: 10,
            height: 10,
            collisionType: CollisionType.Fixed,
            pos: vec(x, y),
        })
        this._type = type;
    }

    onInitialize(engine: Engine): void {
        //this.pointer.useGraphicsBounds = true;
        this.setAnimations();
        const group = this.getAnimation();
        this.graphics.use(group)
        this.graphics.onPostDraw = (ctx: ExcaliburGraphicsContext) => {
            ctx.save();
            ctx.opacity = this.isSelected ? 0.4 : 0;
            ctx.drawRectangle(vec(-25, -25), 50, 50, Color.Red)
            ctx.restore();
        }
    }
    private onTypeChanged(value: CellType, oldValue: CellType) {
        if (this.type != 'empty') return;

        this.graphics.use(value);
    }

    private canTypeChange(value: CellType) {
        console.log(this.type, value)
        return this.type != value;
    }

    update(engine: Engine, delta: number): void {

    }

    private getAnimation(value: CellType = 'empty') {
        const chicken = Resources.staticSpriteSheet.getSprite('chicken-000.png');
        const grass = Resources.staticSpriteSheet.getSprite('grass.png');
        const membars = [
            {
                graphic: grass,
                offset: vec(0, 0)
            },
        ]

        switch (value) {
            case 'chicken': membars.push(
                {
                    graphic: chicken,
                    offset: vec(4, 4)
                }
            )
        }

        return new GraphicsGroup({
            useAnchor: true, // position group from the top left
            members: membars,
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
            ctx.drawRectangle(vec(-25, -25), 50, 50, Color.Red)
            ctx.restore();
        }
    }
}

