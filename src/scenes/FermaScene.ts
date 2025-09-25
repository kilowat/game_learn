
import { Actor, Color, Engine, Scene, vec } from "excalibur";
import { FarmGrid, FarmCell } from "views/FarmGrid";


export class FermaScene extends Scene {
    static route = 'ferma';

    onInitialize(engine: Engine): void {
        const grid = new FarmGrid();
        grid.onTileEvent = (event, cell: FarmCell) => {
            if (event === "hover") {
                console.log("hover:", cell);
                cell.color = Color.Blue;
            }
            if (event === "leave") {
                console.log("leave:", cell);
                cell.color = Color.Red;
            }
            if (event === "click") {
                cell.color = Color.Green;
                console.log("click:", cell);
            }

            if (event === "pointerup") {
                cell.color = Color.Yellow;
                console.log("pointerup:", cell);
            }
        };
        this.add(grid)
    }
}