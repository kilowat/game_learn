
import { Actor, Color, Engine, Scene, vec } from "excalibur";

export class FermaScene extends Scene {
    static route = 'ferma';

    onInitialize(engine: Engine): void {

        this.add(new Actor({ pos: vec(0, 0), color: Color.Red, width: 20, height: 20 }))
        console.log('inited')
    }
}