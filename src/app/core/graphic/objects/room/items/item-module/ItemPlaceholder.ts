import * as PIXI from 'pixi.js';
import { GraphicObject } from '../../../object/GraphicObject';

export class ItemPlaceholder extends GraphicObject {
    constructor(texture: PIXI.Texture) {
        super();

        this.graphic.texture = texture;
        this.graphic.name = 'item_placeholder';
    }

    public getOffsetX(): number {
        return -32;
    }

    public getOffsetY(): number {
        return -50;
    }

    public getZIndex(): number {
        return 0;
    }

    updateDirection(direction: number) {

    }
}
