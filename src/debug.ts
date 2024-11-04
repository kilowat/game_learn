
/**
 * game.start(loader).then(() => {
    const intGrid = Resources.LdtkResource.getIntGridLayers()[0];
    const layer = intGrid.ldtkLayer;
    intGrid.ldtkLayer.intGridCsv.forEach((tile, index) => {
        if (tile == 2) {
            const x = (index % layer.__cWid) * layer.__gridSize;
            const y = Math.floor(index / layer.__cWid) * layer.__gridSize;
            const w = layer.__gridSize;
            const h = layer.__gridSize;

            const collider = new Actor({
                x: x,
                y: y,
                width: w,
                height: h,
                collisionType: CollisionType.Fixed
            });
            game.currentScene.add(collider)
        }
    })

    Resources.LdtkResource.addToScene(game.currentScene);
});
 */