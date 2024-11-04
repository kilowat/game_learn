import { LdtkResource } from "@excaliburjs/plugin-ldtk";
import Map from './assets/map.ldtk';
import ldtkLevel0 from './assets/map/Level_0.ldtkl';
import ldtkLevel1 from './assets/map/Level_1.ldtkl';
import terrain from './assets/terrain.png';
import { Loader } from "excalibur";

export const Resources = {
    LdtkResource: new LdtkResource(Map, {
        useMapBackgroundColor: true,
        pathMap: [
            { path: 'terrain.png', output: terrain },
            { path: 'Level_0.ldtkl', output: ldtkLevel0 },
            { path: 'Level_1.ldtkl', output: ldtkLevel1 },
        ]
    })
} as const

export const loader = new Loader();

for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}