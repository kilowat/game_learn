
import { Engine, Scene } from "excalibur";
import { GameManager } from "gameManager";



export class FermaScene extends Scene {
    onInitialize(engine: Engine): void {

        const gameManager = new GameManager();

        this.add(gameManager);
    }
}