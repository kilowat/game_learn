
import { FarmGrid } from "farmGrid";
import { FarmGridCell } from "farmGridCell";
import { Actor, Animation, Collider, CollisionType, Color, Engine, ImageSource, Random, Resource, Scene, SourceView, Sprite, SpriteSheet, Timer, vec } from "excalibur";
import { Resources } from "resources";
import { TexturePackerSpriteSheet } from "texturePacker";


export class FermaScene extends Scene {
    onInitialize(engine: Engine): void {

        const borad = new FarmGrid();

        this.add(borad);
    }
}