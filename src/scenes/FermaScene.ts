
import { Engine, Scene } from "excalibur";
import { GameState } from "states/GameState";


export class FermaScene extends Scene {
    constructor(private gameState: GameState) {
        super()
    }

    onInitialize(engine: Engine): void {
        console.log(this.gameState)
    }
}