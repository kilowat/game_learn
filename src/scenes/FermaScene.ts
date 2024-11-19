
import { Actor, Color, Engine, Scene, vec } from "excalibur";
import { BaseScene } from "./BaseScene";


export class FermaScene extends BaseScene {
    onInitialize(engine: Engine): void {

        this.add(new Actor({ pos: vec(0, 0), color: Color.Red, width: 20, height: 20 }))
        console.log('inited')
    }
}