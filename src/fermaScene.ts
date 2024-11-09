
import { Actor, Animation, Engine, ImageSource, Random, Resource, Scene, SourceView, Sprite, SpriteSheet, Timer, vec } from "excalibur";
import { Resources } from "resources";
import { TexturePackerSpriteSheet } from "texturePacker";
import SpriteSheetData from './assets/spritesheet.json'

export class FermaScene extends Scene {
    onInitialize(engine: Engine): void {
        const image = Resources.staticSpriteSheet;
        const spritesheet = new TexturePackerSpriteSheet(SpriteSheetData, image);
        const actor = new Actor({ pos: vec(50, 50) });
        const sprite = spritesheet.getSprite('chicken-000.png');
        actor.graphics.use(sprite)
        this.add(actor);
    }
}