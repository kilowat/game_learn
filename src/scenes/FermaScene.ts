
import { Actor, Color, Engine, Scene, vec } from "excalibur";
import { FarmGrid, FarmCell } from "views/FarmGrid";


export class FermaScene extends Scene {
    static route = 'ferma';

    onInitialize(engine: Engine): void {
        const grid = new FarmGrid();
        grid.onTileEvent = (event, cell: FarmCell) => {
            if (event === "hover") {
                console.log("hover:", cell);
            }
            if (event === "leave") {
                console.log("leave:", cell);
            }
            if (event === "click") {
                console.log("click:", cell);
            }

        };
        this.add(grid)
    }
}