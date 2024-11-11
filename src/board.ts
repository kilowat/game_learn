import { Cell } from "cell";
import { Actor, Color, Engine } from "excalibur";

export class Board extends Actor {
    private hovered?: Cell | null;
    private clicked?: Cell;

    constructor() {
        super({
            color: Color.Gray
        })
    }

    onInitialize(engine: Engine): void {
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

    onHover(actor: Cell) {
        this.hovered = actor;
    }
    onLeave(actor: Cell) {
        if (this.clicked?.id === actor.id) {
            return;
        }
        this.hovered = null;
    }
    onClicked(actor: Cell) {
        this.clicked = actor;
    }
}