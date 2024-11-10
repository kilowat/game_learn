
import { Cell } from "cell";
import { Actor, Animation, Collider, CollisionType, Color, Engine, ImageSource, Random, Resource, Scene, SourceView, Sprite, SpriteSheet, Timer, vec } from "excalibur";
import { Resources } from "resources";
import { TexturePackerSpriteSheet } from "texturePacker";


export class FermaScene extends Scene {
    onInitialize(engine: Engine): void {
        const spritesheet = Resources.staticSpriteSheet;
        //const spritesheet = new TexturePackerSpriteSheet(SpriteSheetData, image);

        const sprite = spritesheet.getSprite('grass.png');

        const margin = 8;
        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                const x = i * 44;
                const y = j * 44;
                const actor = new Cell({ x, y });
                this.add(actor);
            }
        }
    }
}