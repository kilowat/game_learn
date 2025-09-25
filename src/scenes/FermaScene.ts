
import { Actor, Color, Engine, Scene, vec } from "excalibur";
import { FarmGrid, FarmCell } from "views/FarmGrid";


export class FermaScene extends Scene {
    static route = 'ferma';

    onInitialize(engine: Engine): void {
        const grid = new FarmGrid();
        grid.onTileEvent = (event, cell: FarmCell) => {
            if (event === "hover") {
                console.log("hover:", cell);
                cell.setColor(Color.Blue);
            }
            if (event === "leave") {
                console.log("leave:", cell);
                cell.setColor(Color.Red);
            }
            if (event === "click") {
                cell.setColor(Color.Green);
                setTimeout(() => {
                    cell.setColor(Color.Red);
                }, 100)
                console.log("click:", cell);
            }

        };
        this.add(grid)
    }
}