
import { ImageSource, Loader } from "excalibur";
import chickenSpriteSheet from './assets/chicken-000-sheet.png';
import cornSpriteSheet from './assets/corn-000-sheet.png';
import cowSpriteSheet from './assets/cow-000-sheet.png';
import staticSpriteSheet from './assets/spritesheet.png';
import { TexturePackerSpriteSheet } from "texturePacker";
import SpriteSheetData from './assets/spritesheet.json'

export const Resources = {
    chickenSpirtSheet: new ImageSource(chickenSpriteSheet),
    cornSpriteSheet: new ImageSource(cornSpriteSheet),
    cowSpriteSheet: new ImageSource(cowSpriteSheet),
    staticSpriteSheet: new TexturePackerSpriteSheet(SpriteSheetData, staticSpriteSheet)
} as const

export const loader = new Loader();

for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}