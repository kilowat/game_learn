
import { Actor, Color, Engine, vec, Text, ScreenElement } from "excalibur";

export class FarmGrid extends Actor {

    constructor() {
        super()
    }

    onInitialize(engine: Engine): void {

        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                const x = i * 44;
                const y = j * 44;
            }
        }
    }
}