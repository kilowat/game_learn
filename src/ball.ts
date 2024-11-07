import { Actor, Canvas, CircleCollider, CollisionType, Color, EmitterType, Engine, GraphicsComponent, ParticleEmitter, PointerComponent, vec, Vector } from "excalibur";

export class Ball extends Actor {
    particle!: ParticleEmitter;
    x = 100;
    y = 100;
    size = 50;

    constructor(size = 50) {
        super({
            radius: size,
            color: Color.Red,
            collisionType: CollisionType.Active,
        });

        this.on('pointerup', () => {
            this.removeWithEffect();
        });
        this.size = size;
    }
    update(engine: Engine, delta: number): void {
        // const scale = (this.width / this.size) / 100;
        //this.scale = vec(scale, scale);
    }
    onInitialize(engine: Engine): void {
        this.pos = vec(this.x, this.y);
        this.particle = this.buildParticle();
        this.addChild(this.particle);
    }

    public removeWithEffect(): void {
        this.body.useGravity = false;
        this.particle.isEmitting = true;

        this.actions
            .moveBy(vec(1, 1), 100)
            .callMethod(() => {
                this.kill()
            });
    }

    private buildParticle() {
        return new ParticleEmitter({
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
    }
}

