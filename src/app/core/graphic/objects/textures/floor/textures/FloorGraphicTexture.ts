import * as PIXI from 'pixi.js';
import { Material } from '../../../../managers/texture-manager/Material';

export abstract class FloorGraphicTexture extends PIXI.Container {
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
        matrix: PIXI.Matrix,
        tintMultiplier: number = 1,
    ): PIXI.Container {
        const container = new PIXI.Container();

        const tile = new PIXI.TilingSprite(material.texture, width, height);
        tile.tint = PIXI.utils.premultiplyTint(material.color, tintMultiplier);
        tile.transform.setFromMatrix(matrix);

        container.addChild(tile);
        container.position.set(x, y);
        return container;
    }

    abstract drawParts(): void;
}
