import { Actor, Canvas, CircleCollider, CollisionType, Color, EmitterType, Engine, GraphicsComponent, ParticleEmitter, PointerComponent, vec, Vector } from "excalibur";

interface BallConfig {
    x?: number,
    y?: number,
    size?: number,
}

export class Ball extends Actor {
    particle!: ParticleEmitter;

    constructor({ x = 0, y = 0, size = 50 }: BallConfig = {}) {
        super({
            pos: vec(x, y),
            radius: size,
            color: Color.Red,
            collisionType: CollisionType.Active,
        });

        this.on('pointerdown', () => {
            this.removeWithEffect();
        });
    }
    onInitialize(engine: Engine): void {
        this.particle = this.buildParticle();
        this.addChild(this.particle);
    }

    public removeWithEffect(): void {
        this.body.useGravity = false;
        this.vel = vec(0, 0);
        this.particle.isEmitting = true;

        this.actions
            .delay(100)
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

