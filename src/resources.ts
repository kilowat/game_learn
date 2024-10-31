import { LdtkResource } from "@excaliburjs/plugin-ldtk";
import Map from '../assets/map.ldtk';
import terrain from '../assets/terrain.png';
import { Loader } from "excalibur";


export const Resources = {
    LdtkResource: new LdtkResource(Map, {
        useMapBackgroundColor: true,
        pathMap: [
            { path: 'terrain.png', output: terrain },
        ]
    })
} as const

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}