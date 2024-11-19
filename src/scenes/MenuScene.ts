import { Engine, Scene, ScreenElement, Text } from "excalibur";
import { BaseScene } from "./BaseScene";

export class MenuScene extends BaseScene {
    onInitialize(engine: Engine): void {
        const text = new Text({ text: 'Menu Scene' });
        const uiElement = new ScreenElement();
        uiElement.graphics.add(text);
        this.add(uiElement);
    }
}