import { Cell } from "cell";
import { Actor, Color, Engine, vec, Text, ScreenElement } from "excalibur";

export class Board extends Actor {
    private hovered?: Cell | null;
    private clicked?: Cell;
    private text!: Text;

    constructor() {
        super({
            color: Color.Gray
        })
    }

    onInitialize(engine: Engine): void {
        this.text = new Text(
            {
                text: `Hovered: ${this.hovered?.id ?? 'empty'}`,
            }
        );
        const element = new ScreenElement({ pos: vec(10, 10), z: 1 });
        element.graphics.use(this.text)
        engine.add(element);

        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                const x = i * 44;
                const y = j * 44;
                const actor = new Cell({ x, y });
                actor.on('pointerenter', () => {
                    this.onHover(actor)
                })
                actor.on('pointerleave', () => {
                    this.onLeave(actor)
                })
                actor.on('pointerdown', () => {
                    this.onClicked(actor)
                })
                this.addChild(actor);
            }
        }
    }

    update(engine: Engine, delta: number): void {
        console.log(this.hovered)
        this.text.text = this.hovered?.id.toString() ?? 'empty';

    }

    onHover(actor: Cell) {
        this.hovered = actor;
    }
    onLeave(actor: Cell) {
        this.hovered = null;

    }
    onClicked(actor: Cell) {
        this.clicked = actor;
    }
}