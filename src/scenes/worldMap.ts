import { Engine, Scene, vec } from "excalibur";
import { Resources } from "resources";

export class WorldMap extends Scene {
    onInitialize(engine: Engine): void {
        Resources.LdtkResource.addToScene(this,
            {
                pos: vec(0, 0),
                levelFilter: ['Level_0', 'Level_1']
            }
        );
    }
}