import { Ball } from "ball";
import { Actor, Canvas, CollisionType, Engine, Scene, vec } from "excalibur";

export class BoardScene extends Scene {
    onInitialize(engine: Engine): void {
        const ball = new Ball({ pos: vec(200, 200) })
        this.add(ball);
    }
}