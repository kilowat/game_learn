import { Actor, Canvas, CollisionType, Engine, GraphicsComponent, PointerComponent, vec, Vector } from "excalibur";

export class Ball extends Actor {

    private _mouseOn = false;

    constructor(config: { pos: Vector }) {
        super({
            pos: config.pos,
            radius: 50,
            collisionType: CollisionType.Active,
        });
        const canvas = new Canvas({
            width: 200,
            height: 200,

            cache: true,  // If true draw once until flagged dirty again, otherwise draw to Canvas every frame
            draw: (ctx) => {
                console.log('With cache=true I draw once');

                ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360)
                ctx.fill();
            }
        })
        this.graphics.use(canvas);

        this.on('pointerup', () => {
            this.kill()
        });

    }
    onInitialize(engine: Engine): void {

    }
}
