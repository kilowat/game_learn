import { Engine, Events, Scene, ScreenElement, Text } from "excalibur";


export class MenuScene extends Scene {
    onInitialize(engine: Engine): void {
        const text = new Text({ text: 'Menu Scene' });
        const uiElement = new ScreenElement();
        uiElement.graphics.add(text);
        this.add(uiElement);
    }
}
