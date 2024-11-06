import { Actor, Canvas, CollisionType, Color, EmitterType, Engine, GraphicsComponent, ParticleEmitter, PointerComponent, vec, Vector } from "excalibur";

export class Ball extends Actor {
    constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
            radius: 50,
            collisionType: CollisionType.Active,
        });

        this.drawGraphic();

        this.on('pointerup', () => {
            this.removeWithEffect();
        });

    }
    onInitialize(engine: Engine): void {
        const emitter = new ParticleEmitter({
            x: 0,
            y: 0,
            radius: 5,
            emitterType: EmitterType.Circle, // Shape of emitter nozzle
            minVel: 100,
            maxVel: 200,
            minAngle: 0,
            maxAngle: Math.PI * 2,
            isEmitting: false, // should the emitter be emitting
            emitRate: 300, // 300 particles/second
            opacity: 0.5,
            fadeFlag: true, // fade particles overtime
            particleLife: 1000, // in milliseconds = 1 sec
            minSize: 1, // random size minimum in pixels
            maxSize: 10, // random size maximum in pixels
            startSize: 10, // starting size in pixels
            endSize: 1, // ending size in pixels
            acceleration: new Vector(4, 4),
            beginColor: Color.Red,
            endColor: Color.Blue,
            focusAccel: 800
        });
        // add the emitter as a child actor, it will draw on top of the parent actor
        // and move with the parent
        this.addChild(emitter);
    }

    public removeWithEffect(): void {
        this.body.useGravity = false;
        const emiter = this.children.find((value, index) => index == 0) as ParticleEmitter;
        emiter.isEmitting = true;
        this.actions
            .moveBy(vec(1, 1), 100)
            .callMethod(() => {
                this.kill()
            });
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
