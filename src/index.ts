
import { Resources, loader } from "./resources";
import { Engine } from "excalibur";


const game = new Engine(
    {
        width: 512,
        height: 512,
        suppressPlayButton: true  // Убирает кнопку Play
    }
);

/*
level?.layers.forEach(layer => {
        if (layer.ldtkLayer.__type === 'IntGrid') {
          layer.ldtkLayer.intGridCsv.forEach((tile, index) => {
            if (tile !== 0) { // Если тайл является препятствием
              const x = (index % layer.__cWid) * layer.__gridSize;
              const y = Math.floor(index / layer.__cWid) * layer.__gridSize;

              const collider = new Actor({
                x: x,
                y: y,
                width: layer.__gridSize,
                height: layer.__gridSize,
                collisionType: CollisionType.Fixed
              });

              game.add(collider);
            }
          });
        }
      });
*/


game.start(loader).then(() => {
    Resources.LdtkResource.addToScene(game.currentScene);
});