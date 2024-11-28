
import { Actor, Color, Engine, Scene, vec } from "excalibur";
import { FarmGrid } from "views/FarmGrid";


export class FermaScene extends Scene {
    static route = 'ferma';

    onInitialize(engine: Engine): void {
        this.add(new FarmGrid())

    }
}