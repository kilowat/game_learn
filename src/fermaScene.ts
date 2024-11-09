
import { Actor, Animation, Engine, ImageSource, Random, Resource, Scene, SourceView, Sprite, SpriteSheet, Timer, vec } from "excalibur";
import { Resources } from "resources";
import SpriteSheetData from './assets/spritesheet.json'
interface PackerFrame {
    filename: string,
    frame: {
        x: number,
        y: number,
        w: number,
        h: number
    },
}
interface PackerData {
    frames: [
        PackerFrame
    ]
}

interface sheetMap {
    [index: string]: number
}
class TexturePackerSpriteSheet {
    private spriteSheet!: SpriteSheet;
    private sheetMap: sheetMap = {};

    constructor(public readonly data: PackerData, public readonly image: ImageSource) {
        const views: SourceView[] = [];
        for (let i = 0; i < data.frames.length; i++) {
            const frameData = data.frames[i];
            views.push({
                x: frameData.frame.x,
                y: frameData.frame.y,
                width: frameData.frame.w,
                height: frameData.frame.h,
            });
            this.sheetMap[frameData.filename] = i;
        }
        this.spriteSheet = SpriteSheet.fromImageSourceWithSourceViews({
            image,
            sourceViews: views,
        })
    }

    public getSprite(fileName: string): Sprite {
        return this.spriteSheet.getSprite(this.sheetMap[fileName], 0);
    }
}

export class FermaScene extends Scene {
    onInitialize(engine: Engine): void {
        const image = Resources.staticSpriteSheet;
        const spritesheet = new TexturePackerSpriteSheet(SpriteSheetData, image);
        const actor = new Actor({ pos: vec(50, 50) });
        const sprite = spritesheet.getSprite('chicken-000.png');
        console.log(sprite)
        actor.graphics.use(sprite)
        this.add(actor);
    }
}

interface User {
    id: string,
    name?: string,
    hellow?: () => void,
}
