import * as PIXI from 'pixi.js';
import { DrawableTile } from '@holo5/roombuilder';
import { Engine } from '../../../../engine/Engine';
import { Material } from '../../../../managers/texture-manager/Material';
import { WallGraphicTexture } from './WallGraphicTexture';

export class LeftWallTexture extends WallGraphicTexture {
    constructor(wallMaterial: Material, drawableTile: DrawableTile, wallHeight: number, wallThickness: number) {
        super(wallMaterial, drawableTile, wallHeight, wallThickness);

        this._points = [
            { x: 0, y: 0 },
            { x: 32, y: 0 },
            { x: 32, y: 123 + (this._drawableTile.wallHeight + wallHeight) * 32 },
            { x: 0, y: 123 + (this._drawableTile.wallHeight + wallHeight) * 32 },
        ];

        this.drawParts();
    }

    public drawParts(): void {
        const texturedPart = new PIXI.TilingSprite(this._wallMaterial.texture, this._points[2].x, this._points[2].y);
        texturedPart.transform.setFromMatrix(Engine.RIGHT_ISO_MATRIX);
        texturedPart.tint = PIXI.utils.premultiplyTint(this._wallMaterial.color, 0.85);
        this.addChild(texturedPart);

        const borderedParts = new PIXI.Container();
        const top = new PIXI.Graphics()
            .beginFill(0xFFFFFF)
            .moveTo(this._points[0].x - this._wallThickness * 2, this._points[0].y - this._wallThickness * 2)
            .lineTo(this._points[1].x - this._wallThickness * 2, this._points[1].y - this._wallThickness * 2)
            .lineTo(this._points[1].x, this._points[1].y)
            .lineTo(this._points[0].x, this._points[0].y);
        top.tint = PIXI.utils.premultiplyTint(this._wallMaterial.color, 0.6);
        const left = new PIXI.Graphics()
            .beginFill(0xFFFFFF)
            .moveTo(this._points[0].x - this._wallThickness * 2, this._points[0].y - this._wallThickness * 2)
            .lineTo(this._points[0].x, this._points[0].y)
            .lineTo(this._points[3].x, this._points[3].y)
            .lineTo(this._points[3].x - this._wallThickness * 2, this._points[3].y - this._wallThickness * 2);
        left.tint = PIXI.utils.premultiplyTint(this._wallMaterial.color, 1);

        borderedParts.addChild(top);
        borderedParts.addChild(left);
        borderedParts.transform.setFromMatrix(Engine.RIGHT_ISO_MATRIX);

        this.addChild(borderedParts);
    }
}
