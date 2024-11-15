import { range, SpriteSheet, Animation } from "excalibur";
import { Resources } from "utils/resources";

function createAnimations() {
    const chickenSpriteSheet = SpriteSheet.fromImageSource({
        image: Resources.chickenSpirtSheet,
        grid: {
            rows: 1,
            columns: 4,
            spriteWidth: 32,
            spriteHeight: 32,
        }
    });
    const chickenAnimation = Animation.fromSpriteSheet(
        chickenSpriteSheet,
        range(0, 4),
        300,
    );

    const flowerSpriteSheet = SpriteSheet.fromImageSource({
        image: Resources.cornSpriteSheet,
        grid: {
            rows: 1,
            columns: 4,
            spriteWidth: 32,
            spriteHeight: 32,
        }
    });

    const flowerAnimation = Animation.fromSpriteSheet(
        flowerSpriteSheet,
        range(0, 4), 300,
    );

    const cowSpriteSheet = SpriteSheet.fromImageSource({
        image: Resources.cowSpriteSheet,
        grid: {
            rows: 1,
            columns: 4,
            spriteWidth: 80,
            spriteHeight: 80,
        }
    });

    const cowAnimation = Animation.fromSpriteSheet(
        cowSpriteSheet,
        range(0, 4), 300,
    );

    return {
        chickenAnimation,
        cowAnimation,
        flowerAnimation,
    }
}   