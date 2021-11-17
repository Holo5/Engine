import { Container, Matrix, TilingSprite, utils } from 'pixi.js';
import { Material } from '../../../material/Material';

export abstract class FloorGraphicTexture extends Container {
    protected _material: Material;
    protected _thickness: number;

    constructor(material: Material, thickness: number) {
        super();
        this._material = material;
        this._thickness = thickness * 2;

        this.drawParts();

        // this.cacheAsBitmap = true;
    }

    protected drawPart(
        material: Material,
        width: number,
        height: number,
        x: number,
        y: number,
        matrix: Matrix,
        tintMultiplier: number = 1,
    ): Container {
        const container = new Container();

        const tile = new TilingSprite(material.texture, width, height);
        tile.tint = utils.premultiplyTint(material.color, tintMultiplier);
        tile.transform.setFromMatrix(matrix);

        container.addChild(tile);
        container.position.set(x, y);
        return container;
    }

    abstract drawParts(): void;
}
