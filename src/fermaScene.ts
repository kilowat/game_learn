
import { Actor, Animation, Engine, Random, Resource, Scene, Sprite, SpriteSheet, Timer, vec } from "excalibur";
import { Resources } from "resources";

export class FermaScene extends Scene {
    onInitialize(engine: Engine): void {
        const actor = new Actor({ pos: vec(50, 50) });
        const image = Resources.staticSpriteSheet;
        const sprite = SpriteSheet.fromImageSourceWithSourceViews({
            image,
            sourceViews: [
                { x: 1, y: 1, width: 71, height: 44 },
                { x: 20, y: 0, width: 40, height: 50 },
            ],
        })
        actor.graphics.use(sprite.getSprite(0, 0))
        this.add(actor);
    }
}
