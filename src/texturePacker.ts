import { ImageSource, SourceView, Sprite, SpriteSheet } from "excalibur";
import { Resources } from "resources";

// Определим все необходимые интерфейсы для вашего JSON формата

export interface TexturePackerData {
    frames: FrameElement[];
    meta: Meta;
}

interface FrameElement {
    filename: string;
    frame: SpriteSourceSize;
    rotated: boolean;
    trimmed: boolean;
    spriteSourceSize: SpriteSourceSize;
    sourceSize: Size;
    pivot: Pivot;
}

interface SpriteSourceSize {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface Pivot {
    x: number;
    y: number;
}

interface Size {
    w: number;
    h: number;
}

interface Meta {
    app: string;
    version: string;
    image: string;
    format: string;
    size: Size;
    scale: number;
}

// Получаем тип для имён файлов из JSON

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
export class TexturePackerSpriteSheet {
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