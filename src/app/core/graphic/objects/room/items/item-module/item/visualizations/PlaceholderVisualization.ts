import { Texture } from 'pixi.js';
import { FurnitureVisualization } from './FurnitureVisualization';
import { Engine } from '../../../../../../engine/Engine';

export class PlaceholderVisualization extends FurnitureVisualization {
    constructor(engine: Engine, placeholderTexture: Texture) {
        super(engine, undefined, undefined, undefined, undefined, undefined, undefined, 0);

        this.graphic.texture = placeholderTexture;
    }

    protected attachAttributes() {
    }

    protected retrieveFrames() {
    }

    public getOffsetX(): number {
        return -32;
    }

    public getOffsetY(): number {
        return -50;
    }

    public getZIndex(): number {
        return this.screenPosition.z;
    }
}
