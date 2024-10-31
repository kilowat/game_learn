
import { Resources, loader } from "./resources";
import { Engine } from "excalibur";


const game = new Engine(
    {
        width: 512,
        height: 512,
        suppressPlayButton: true  // Убирает кнопку Play
    }
);


game.start(loader).then(() => {
    Resources.LdtkResource.addToScene(game.currentScene);
    console.log(game.currentScene)
});