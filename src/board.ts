import { Ball } from "ball";
import { Actor, Canvas, CollisionType, Engine, Random, Scene, Timer, vec } from "excalibur";

export class BoardScene extends Scene {
    onInitialize(engine: Engine): void {
        const random = new Random(1337)
        const timer = new Timer({
            random,
            randomRange: [0, 500],
            interval: 500,
            repeats: true,
            fcn: () => {
                const ball = new Ball({ x: random.integer(100, 400), y: 0 })
                this.add(ball);
            }
        })
        //this.add(timer)
        //timer.start()
        const ball = new Ball()

        this.add(ball);
    }
}