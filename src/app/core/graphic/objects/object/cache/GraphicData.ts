import { Texture, Rectangle } from 'pixi.js';

export class GraphicData {
    readonly texture: Texture;
    readonly hitArea: Rectangle;

    constructor(texture: Texture, hitArea: Rectangle) {
        this.texture = texture;
        this.hitArea = hitArea;
    }

    static createEmpty() {
        return new GraphicData(Texture.EMPTY, new Rectangle(0, 0, 0, 0));
    }
}
