
import { ImageSource, Loader } from "excalibur";

import chickenSpriteSheetImage from './assets/chicken-000-sheet.png';
import cornSpriteSheetImage from './assets/corn-000-sheet.png';
import cowSpriteSheetImage from './assets/cow-000-sheet.png';
import staticSpriteSheetImage from './assets/spritesheet.png';
import { TexturePackerSpriteSheet } from "utils/texturePacker";
import SpriteSheetData from './assets/spritesheet.json';
import startBg from './assets/bg.svg';
import { range, SpriteSheet, Animation } from "excalibur";


const startBgUrl = URL.createObjectURL(new Blob([startBg], { type: 'image/svg+xml' }));

export const Resources = {
    chickenSpirtSheet: new ImageSource(chickenSpriteSheetImage),
    cornSpriteSheet: new ImageSource(cornSpriteSheetImage),
    cowSpriteSheet: new ImageSource(cowSpriteSheetImage),
    staticSpriteSheet: new TexturePackerSpriteSheet(SpriteSheetData, staticSpriteSheetImage),
    startBg: new ImageSource(startBgUrl)
} as const

export const loader = new Loader();

for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}

export const chickenSpriteSheet = SpriteSheet.fromImageSource({
    image: Resources.chickenSpirtSheet,
    grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 32,
        spriteHeight: 32,
    }
});

export const flowerSpriteSheet = SpriteSheet.fromImageSource({
    image: Resources.cornSpriteSheet,
    grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 32,
        spriteHeight: 32,
    }
});

export const cowSpriteSheet = SpriteSheet.fromImageSource({
    image: Resources.cowSpriteSheet,
    grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 80,
        spriteHeight: 80,
    }
});

//icons

export const chikenIcon = chickenSpriteSheet.getSprite(0, 0);
export const flowerIcon = flowerSpriteSheet.getSprite(0, 0);
export const cowIcon = cowSpriteSheet.getSprite(0, 0);
// animations

export const chickenAnimation = Animation.fromSpriteSheet(
    chickenSpriteSheet,
    range(0, 4),
    300,
);

export const flowerAnimation = Animation.fromSpriteSheet(
    flowerSpriteSheet,
    range(0, 4), 300,
);

export const cowAnimation = Animation.fromSpriteSheet(
    cowSpriteSheet,
    range(0, 4), 300,
);
