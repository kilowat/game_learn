import { Actor, Canvas, CollisionType, Engine, GraphicsComponent, PointerComponent, vec, Vector } from "excalibur";

export class Ball extends Actor {
    constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
            radius: 50,
            collisionType: CollisionType.Active,
        });

        this.drawGraphic();

        this.on('pointerup', () => {
            this.kill()
        });

    }
    onInitialize(engine: Engine): void {

    }

    public removeWithEffect(): void {

    }

    private drawGraphic() {
        const canvas = new Canvas({
            width: 200,
            height: 200,
            draw: (ctx) => {
                ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360)
                ctx.fillStyle = 'blue';
                ctx.fill();
            }
        })

        this.graphics.use(canvas);
    }
}
