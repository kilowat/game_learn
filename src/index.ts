import { LdtkResource } from "@excaliburjs/plugin-ldtk";
import { Engine, Loader, vec } from "excalibur";

const game = new Engine(
    {
        width: 800,
        height: 600
    }
);
const ldtkMap = new LdtkResource('/assets/map.ldtk', { useMapBackgroundColor: true });


const loader = new Loader([ldtkMap]);
game.start(loader).then(() => {
    ldtkMap.addToScene(game.currentScene);
});