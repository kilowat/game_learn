import { Sprite } from "excalibur";
import { chickenSpriteSheet, icons, Resources } from "resources";

export class ResourceModel {
    constructor(
        public readonly icon: Sprite,
        public readonly code: string,
        public price: number,
        public profit: number,
    ) { }
}

export const ResourceData = {
    chicken: new ResourceModel(icons.chicken, 'chicken', 1, 1)
} as const